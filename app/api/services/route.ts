import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Service from '@/models/Service';
import { verifyToken } from '@/lib/jwt';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');
    const search = searchParams.get('search');

    let query: any = {};

    if (category && category !== 'all') {
      query.category = category;
    }

    if (featured === 'true') {
      query.featured = true;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    const services = await Service.find(query).sort({ createdAt: -1 });

    return NextResponse.json(
      {
        success: true,
        data: services,
        count: services.length,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Get services error:', error);
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
    const service = await Service.create(body);

    return NextResponse.json(
      {
        success: true,
        message: 'Service created successfully',
        data: service,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Create service error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Server error' },
      { status: 500 }
    );
  }
}
