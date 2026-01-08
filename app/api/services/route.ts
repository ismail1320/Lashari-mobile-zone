import { NextRequest, NextResponse } from 'next/server'
import Service from '@/models/Service'
import { verifyAuth } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const search = searchParams.get('search')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const skip = (page - 1) * limit

    // Build query
    let query: any = { isActive: true }
    
    if (category) {
      query.category = category
    }
    
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ]
    }

    const services = await Service.find(query)
      .sort({ order: 1, createdAt: -1 })
      .skip(skip)
      .limit(limit)

    const total = await Service.countDocuments(query)

    return NextResponse.json({
      services,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Get services error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    // Verify authentication
    const authResult = verifyAuth(request)
    if (!authResult) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { name, description, price, category, icon, image, duration } = body

    if (!name || !description || !price || !category) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      )
    }

    const service = new Service({
      name,
      description,
      price,
      category,
      icon: icon || 'Smartphone',
      image: image || '',
      duration: duration || '1-2 hours'
    })

    await service.save()

    return NextResponse.json({
      message: 'Service created successfully',
      service
    }, { status: 201 })
  } catch (error) {
    console.error('Create service error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}