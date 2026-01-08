import { NextRequest, NextResponse } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

function base64UrlToUint8Array(input: string): Uint8Array {
  let base64 = input.replace(/-/g, '+').replace(/_/g, '/');
  const padding = base64.length % 4;
  if (padding) {
    base64 += '='.repeat(4 - padding);
  }

  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

function decodeBase64UrlJson(input: string): any {
  const bytes = base64UrlToUint8Array(input);
  const json = new TextDecoder().decode(bytes);
  return JSON.parse(json);
}

async function verifyJwtHS256(token: string): Promise<any | null> {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;

    const [encodedHeader, encodedPayload, encodedSignature] = parts;

    const header = decodeBase64UrlJson(encodedHeader);
    if (header?.alg !== 'HS256') return null;

    const payload = decodeBase64UrlJson(encodedPayload);

    if (typeof payload?.exp === 'number') {
      const nowSeconds = Math.floor(Date.now() / 1000);
      if (nowSeconds >= payload.exp) return null;
    }

    const data = new TextEncoder().encode(`${encodedHeader}.${encodedPayload}`);
    const signature = base64UrlToUint8Array(encodedSignature);

    const key = await crypto.subtle.importKey(
      'raw',
      new TextEncoder().encode(JWT_SECRET),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['verify']
    );

    const valid = await crypto.subtle.verify('HMAC', key, signature, data);
    return valid ? payload : null;
  } catch {
    return null;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith('/admin')) {
    return NextResponse.next();
  }

  const token = request.cookies.get('token')?.value;
  const payload = token ? await verifyJwtHS256(token) : null;
  const isAuthenticated = payload !== null;

  if (pathname === '/admin/login') {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    }
    return NextResponse.next();
  }

  if (pathname === '/admin') {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    }
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  if (!isAuthenticated) {
    const response = NextResponse.redirect(new URL('/admin/login', request.url));
    response.cookies.set('token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 0,
      path: '/',
    });
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
