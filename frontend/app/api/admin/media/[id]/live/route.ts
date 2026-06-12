import { NextRequest, NextResponse } from 'next/server';
import Media from '@/lib/models/Media';
import { connectToDatabase } from '@/lib/db';
import { requireAdmin } from '@/lib/auth';
export const runtime = 'edge';
export async function PATCH(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const authResult = requireAdmin(_request);
    if (authResult instanceof NextResponse) return authResult;

    // Lazima u-await params kwanza ili kupata id
    const { id } = await params;

    await connectToDatabase();
    
    // Sasa inafanya kazi vizuri na id uliyopata
    const media = await Media.findByIdAndUpdate(id, { live: true }, { new: true });
    
    if (!media) {
      return NextResponse.json({ message: 'Media not found' }, { status: 404 });
    }
    
    return NextResponse.json({ media });
  } catch (error) {
    console.error('Make live media error:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
