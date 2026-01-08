import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Testimonial from '@/models/Testimonial';
import { verifyToken } from '@/lib/jwt';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const featured = searchParams.get('featured');

    let query: any = {};

    if (featured === 'true') {
      query.featured = true;
    }

    const testimonials = await Testimonial.find(query).sort({ createdAt: -1 });

    return NextResponse.json(
      {
        success: true,
        data: testimonials,
        count: testimonials.length,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Get testimonials error:', error);
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
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
    const testimonial = await Testimonial.create(body);

    return NextResponse.json(
      {
        success: true,
        message: 'Testimonial created successfully',
        data: testimonial,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Create testimonial error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Server error' },
      { status: 500 }
    );
  }
}
