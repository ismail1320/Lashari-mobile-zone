import { NextRequest, NextResponse } from 'next/server'
import Inquiry from '@/models/Inquiry'
import { verifyAuth } from '@/lib/auth'

export async function PATCH(
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
    const { status, isRead } = body

    const inquiry = await Inquiry.findByIdAndUpdate(
      params.id,
      {
        ...(status && { status }),
        ...(isRead !== undefined && { isRead }),
        updatedAt: new Date()
      },
      { new: true }
    )

    if (!inquiry) {
      return NextResponse.json(
        { message: 'Inquiry not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      message: 'Inquiry updated successfully',
      inquiry
    })
  } catch (error) {
    console.error('Update inquiry error:', error)
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

    const inquiry = await Inquiry.findByIdAndDelete(params.id)

    if (!inquiry) {
      return NextResponse.json(
        { message: 'Inquiry not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      message: 'Inquiry deleted successfully'
    })
  } catch (error) {
    console.error('Delete inquiry error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}