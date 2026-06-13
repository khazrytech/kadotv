import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

import Media from '@/lib/models/Media';
import { connectToDatabase } from '@/lib/db';
import { requireAdmin } from '@/lib/auth';
export async function PATCH(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const authResult = requireAdmin(_request);
    if (authResult instanceof NextResponse) return authResult;

    // Lazima u-await params kwanza ili kupata id
    const { id } = await params;

    await connectToDatabase();
    
    // Sasa tumia id uliyopata hapo juu
    const media = await Media.findByIdAndUpdate(id, { featured: true }, { new: true });
    
    if (!media) {
      return NextResponse.json({ message: 'Media not found' }, { status: 404 });
    }
    
    return NextResponse.json({ media });
  } catch (error) {
    console.error('Feature media error:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
