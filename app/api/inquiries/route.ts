import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Inquiry from '@/models/Inquiry';
import { verifyToken } from '@/lib/jwt';

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

    const { searchParams } = new URL(request.url);
    const read = searchParams.get('read');

    let query: any = {};

    if (read === 'true') {
      query.read = true;
    } else if (read === 'false') {
      query.read = false;
    }

    const inquiries = await Inquiry.find(query).sort({ createdAt: -1 });

    return NextResponse.json(
      {
        success: true,
        data: inquiries,
        count: inquiries.length,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Get inquiries error:', error);
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const body = await request.json();
    const inquiry = await Inquiry.create(body);

    return NextResponse.json(
      {
        success: true,
        message: 'Your inquiry has been submitted successfully. We will contact you soon!',
        data: inquiry,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Create inquiry error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Server error' },
      { status: 500 }
    );
  }
}
