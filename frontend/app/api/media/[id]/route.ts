import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

import Media from '@/lib/models/Media';
import { connectToDatabase } from '@/lib/db';
import { requireAdmin } from '@/lib/auth'; // Hakikisha path ya auth ni sahihi
export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await connectToDatabase();
    
    const media = await Media.findById(id);
    
    if (!media) {
      return NextResponse.json({ message: 'Media not found' }, { status: 404 });
    }
    
    return NextResponse.json(media);
  } catch (error) {
    console.error('Get media by id error:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const authResult = requireAdmin(request);
    if (authResult instanceof NextResponse) return authResult;

    const { id } = await params;
    await connectToDatabase();
    
    const mediaData = await request.json();
    const media = await Media.findByIdAndUpdate(id, mediaData, { new: true });
    
    if (!media) {
      return NextResponse.json({ message: 'Media not found' }, { status: 404 });
    }
    
    return NextResponse.json(media);
  } catch (error) {
    console.error('Update media error:', error);
    return NextResponse.json({ message: 'Invalid update' }, { status: 400 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const authResult = requireAdmin(request);
    if (authResult instanceof NextResponse) return authResult;

    const { id } = await params;
    await connectToDatabase();
    
    const media = await Media.findByIdAndDelete(id);
    
    if (!media) {
      return NextResponse.json({ message: 'Media not found' }, { status: 404 });
    }
    
    return NextResponse.json({ message: 'Deleted' });
  } catch (error) {
    console.error('Delete media error:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
