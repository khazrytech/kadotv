import { NextRequest, NextResponse } from 'next/server';
import Media from '@/lib/models/Media';
import { connectToDatabase } from '@/lib/db';
import { requireAuth } from '@/lib/auth';

interface RouteParams {
  params: { id: string };
}

export async function GET(_request: NextRequest, { params }: RouteParams) {
  try {
    await connectToDatabase();
    const media = await Media.findById(params.id);
    if (!media) {
      return NextResponse.json({ message: 'Media not found' }, { status: 404 });
    }

    return NextResponse.json(media);
  } catch (error) {
    console.error('Get media by id error:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const authResult = requireAuth(request);
    if (authResult instanceof NextResponse) return authResult;

    await connectToDatabase();
    const mediaData = await request.json();
    const media = await Media.findByIdAndUpdate(params.id, mediaData, { new: true });
    if (!media) {
      return NextResponse.json({ message: 'Media not found' }, { status: 404 });
    }

    return NextResponse.json(media);
  } catch (error) {
    console.error('Update media error:', error);
    return NextResponse.json({ message: 'Invalid update' }, { status: 400 });
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const authResult = requireAuth(request);
    if (authResult instanceof NextResponse) return authResult;

    await connectToDatabase();
    const media = await Media.findByIdAndDelete(params.id);
    if (!media) {
      return NextResponse.json({ message: 'Media not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Deleted' });
  } catch (error) {
    console.error('Delete media error:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
