import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Admin from '@/models/Admin';
import Service from '@/models/Service';
import Testimonial from '@/models/Testimonial';
import Settings from '@/models/Settings';
import { sampleServices, sampleTestimonials } from '@/utils/sampleData';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const adminCount = await Admin.countDocuments();
    
    if (adminCount === 0) {
      const admin = await Admin.create({
        email: process.env.ADMIN_EMAIL || 'admin@lasharimobile.com',
        password: process.env.ADMIN_PASSWORD || 'admin123',
        name: 'Admin',
      });
      console.log('Admin created:', admin.email);
    }

    const serviceCount = await Service.countDocuments();
    
    if (serviceCount === 0) {
      await Service.insertMany(sampleServices);
      console.log('Sample services created');
    }

    const testimonialCount = await Testimonial.countDocuments();
    
    if (testimonialCount === 0) {
      await Testimonial.insertMany(sampleTestimonials);
      console.log('Sample testimonials created');
    }

    const settingsCount = await Settings.countDocuments();
    
    if (settingsCount === 0) {
      await Settings.create({
        storeName: process.env.BUSINESS_NAME || 'Lashari Mobile Zone',
        phone: process.env.BUSINESS_PHONE || '03445979016',
        email: process.env.BUSINESS_EMAIL || 'ik4937444@gmail.com',
        whatsappNumber: process.env.WHATSAPP_NUMBER || '03445979016',
        whatsappChannel: process.env.WHATSAPP_CHANNEL || 'https://whatsapp.com/channel/0029Vb7abWp1NCrVZvN8M00g',
        googleMapsLink: process.env.GOOGLE_MAPS_LINK || 'https://maps.app.goo.gl/oEkYqEHkykhbRshn7',
        address: process.env.BUSINESS_ADDRESS || 'Lashari Mobile Zone, Main Market',
        businessHours: process.env.BUSINESS_HOURS || '10:00 AM to 10:00 PM (Daily)',
      });
      console.log('Settings created');
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Database initialized successfully',
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Init error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Server error' },
      { status: 500 }
    );
  }
}
