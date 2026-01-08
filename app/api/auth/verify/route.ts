import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/jwt';
import dbConnect from '@/lib/mongodb';
import Admin from '@/models/Admin';

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('token')?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, message: 'Not authenticated' },
        { status: 401 }
      );
    }

    const decoded = verifyToken(token);

    if (!decoded) {
      return NextResponse.json(
        { success: false, message: 'Invalid token' },
        { status: 401 }
      );
    }

    await dbConnect();
    const admin = await Admin.findById(decoded.id);

    if (!admin) {
      return NextResponse.json(
        { success: false, message: 'Admin not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: {
          admin: {
            id: admin._id,
            email: admin.email,
            name: admin.name,
          },
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Verify error:', error);
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    );
  }
}
