import { NextRequest, NextResponse } from 'next/server'
import Inquiry from '@/models/Inquiry'
import { verifyAuth } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    // Verify authentication for admin access
    const authResult = verifyAuth(request)
    if (!authResult) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const skip = (page - 1) * limit

    // Build query
    let query: any = {}
    
    if (status) {
      query.status = status
    }

    const inquiries = await Inquiry.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)

    const total = await Inquiry.countDocuments(query)

    return NextResponse.json({
      inquiries,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Get inquiries error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, serviceType, message } = body

    if (!name || !email || !phone || !serviceType || !message) {
      return NextResponse.json(
        { message: 'All fields are required' },
        { status: 400 }
      )
    }

    const inquiry = new Inquiry({
      name,
      email,
      phone,
      serviceType,
      message
    })

    await inquiry.save()

    return NextResponse.json({
      message: 'Inquiry submitted successfully',
      inquiry: {
        id: inquiry._id,
        name: inquiry.name,
        email: inquiry.email,
        phone: inquiry.phone,
        serviceType: inquiry.serviceType,
        message: inquiry.message,
        createdAt: inquiry.createdAt
      }
    }, { status: 201 })
  } catch (error) {
    console.error('Create inquiry error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}