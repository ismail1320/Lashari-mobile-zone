import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Testimonial from '@/models/Testimonial';
import { verifyToken } from '@/lib/jwt';

export async function PUT(
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
    const testimonial = await Testimonial.findByIdAndUpdate(
      id,
      body,
      { new: true, runValidators: true }
    );

    if (!testimonial) {
      return NextResponse.json(
        { success: false, message: 'Testimonial not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Testimonial updated successfully',
        data: testimonial,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Update testimonial error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Server error' },
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
    const testimonial = await Testimonial.findByIdAndDelete(id);

    if (!testimonial) {
      return NextResponse.json(
        { success: false, message: 'Testimonial not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Testimonial deleted successfully',
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Delete testimonial error:', error);
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    );
  }
}
