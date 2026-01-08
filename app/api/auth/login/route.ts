import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Admin from '@/models/Admin';
import { signToken } from '@/lib/jwt';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Please provide email and password' },
        { status: 400 }
      );
    }

    const admin = await Admin.findOne({ email }).select('+password');

    if (!admin) {
      return NextResponse.json(
        { success: false, message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const isPasswordMatch = await admin.comparePassword(password);

    if (!isPasswordMatch) {
      return NextResponse.json(
        { success: false, message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const token = signToken({ id: admin._id, email: admin.email });

    const response = NextResponse.json(
      {
        success: true,
        message: 'Login successful',
        data: {
          admin: {
            id: admin._id,
            email: admin.email,
            name: admin.name,
          },
          token,
        },
      },
      { status: 200 }
    );

    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });

    return response;
  } catch (error: any) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    );
  }
}
