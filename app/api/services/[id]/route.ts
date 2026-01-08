import { NextRequest, NextResponse } from 'next/server'
import Service from '@/models/Service'
import { verifyAuth } from '@/lib/auth'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const service = await Service.findById(params.id)
    
    if (!service) {
      return NextResponse.json(
        { message: 'Service not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ service })
  } catch (error) {
    console.error('Get service error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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
    const { name, description, price, category, icon, image, duration, isActive, order } = body

    const service = await Service.findByIdAndUpdate(
      params.id,
      {
        ...(name && { name }),
        ...(description && { description }),
        ...(price !== undefined && { price }),
        ...(category && { category }),
        ...(icon && { icon }),
        ...(image && { image }),
        ...(duration && { duration }),
        ...(isActive !== undefined && { isActive }),
        ...(order !== undefined && { order }),
        updatedAt: new Date()
      },
      { new: true }
    )

    if (!service) {
      return NextResponse.json(
        { message: 'Service not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      message: 'Service updated successfully',
      service
    })
  } catch (error) {
    console.error('Update service error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Verify authentication
    const authResult = verifyAuth(request)
    if (!authResult) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      )
    }

    const service = await Service.findByIdAndDelete(params.id)

    if (!service) {
      return NextResponse.json(
        { message: 'Service not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      message: 'Service deleted successfully'
    })
  } catch (error) {
    console.error('Delete service error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}