import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Settings from '@/models/Settings';
import { verifyToken } from '@/lib/jwt';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    let settings = await Settings.findOne();

    if (!settings) {
      settings = await Settings.create({
        storeName: process.env.BUSINESS_NAME || 'Lashari Mobile Zone',
        phone: process.env.BUSINESS_PHONE || '03445979016',
        email: process.env.BUSINESS_EMAIL || 'ik4937444@gmail.com',
        whatsappNumber: process.env.WHATSAPP_NUMBER || '03445979016',
        whatsappChannel: process.env.WHATSAPP_CHANNEL || 'https://whatsapp.com/channel/0029Vb7abWp1NCrVZvN8M00g',
        googleMapsLink: process.env.GOOGLE_MAPS_LINK || 'https://maps.app.goo.gl/oEkYqEHkykhbRshn7',
        address: process.env.BUSINESS_ADDRESS || 'Lashari Mobile Zone, Main Market',
        businessHours: process.env.BUSINESS_HOURS || '10:00 AM to 10:00 PM (Daily)',
      });
    }

    return NextResponse.json(
      {
        success: true,
        data: settings,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Get settings error:', error);
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
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
    
    let settings = await Settings.findOne();

    if (!settings) {
      settings = await Settings.create(body);
    } else {
      settings = await Settings.findByIdAndUpdate(
        settings._id,
        body,
        { new: true, runValidators: true }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Settings updated successfully',
        data: settings,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Update settings error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Server error' },
      { status: 500 }
    );
  }
}
