import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Inquiry from '@/models/Inquiry';
import { verifyToken } from '@/lib/jwt';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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

    const body = await request.json();
    const { id } = await params;
    const inquiry = await Inquiry.findByIdAndUpdate(
      id,
      { read: body.read },
      { new: true }
    );

    if (!inquiry) {
      return NextResponse.json(
        { success: false, message: 'Inquiry not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Inquiry updated successfully',
        data: inquiry,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Update inquiry error:', error);
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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

    const { id } = await params;
    const inquiry = await Inquiry.findByIdAndDelete(id);

    if (!inquiry) {
      return NextResponse.json(
        { success: false, message: 'Inquiry not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Inquiry deleted successfully',
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Delete inquiry error:', error);
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    );
  }
}
