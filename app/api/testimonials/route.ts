import { NextRequest, NextResponse } from 'next/server'
import Testimonial from '@/models/Testimonial'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const isActive = searchParams.get('isActive')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const skip = (page - 1) * limit

    // Build query
    let query: any = {}
    
    if (isActive !== null) {
      query.isActive = isActive === 'true'
    }

    const testimonials = await Testimonial.find(query)
      .sort({ order: 1, date: -1 })
      .skip(skip)
      .limit(limit)

    const total = await Testimonial.countDocuments(query)

    return NextResponse.json({
      testimonials,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Get testimonials error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}