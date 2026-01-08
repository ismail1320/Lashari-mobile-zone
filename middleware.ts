import { NextRequest, NextResponse } from 'next/server'
import { verifyAuth } from '@/lib/auth'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if this is an admin route
  if (pathname.startsWith('/admin')) {
    // Skip login page and public admin routes
    if (pathname === '/admin/login' || pathname.startsWith('/admin/api')) {
      return NextResponse.next()
    }

    // Check for authentication
    const token = request.cookies.get('admin-token')?.value
    
    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }

    // Verify token
    const authResult = verifyAuth(request)
    
    if (!authResult) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/((?!_next/static|_next/image|favicon.ico|api/auth/login).*)',
  ],
}