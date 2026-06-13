import { NextRequest, NextResponse } from 'next/server';
import Media from '@/lib/models/Media';
import { connectToDatabase } from '@/lib/db';
import { requireAdmin } from '@/lib/auth';
export async function PATCH(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const authResult = requireAdmin(_request);
    if (authResult instanceof NextResponse) return authResult;

    // Lazima u-await params kwanza
    const { id } = await params;

    await connectToDatabase();
    
    // Sasa inatumia id iliyo-awaited
    const media = await Media.findByIdAndUpdate(id, { live: false }, { new: true });
    
    if (!media) {
      return NextResponse.json({ message: 'Media not found' }, { status: 404 });
    }
    
    return NextResponse.json({ media });
  } catch (error) {
    console.error('Make unlive media error:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
