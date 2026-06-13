import { NextRequest, NextResponse } from 'next/server';

import Media from '@/lib/models/Media';
import { connectToDatabase } from '@/lib/db';
import { requireAdmin } from '@/lib/auth';
export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const authResult = await requireAdmin(request);
    if (authResult instanceof NextResponse) return authResult;

    const { id } = await params;

    await connectToDatabase();
    
    // Inafanya media isiwe 'featured'
    const media = await Media.findByIdAndUpdate(id, { featured: false }, { new: true });
    
    if (!media) {
      return NextResponse.json({ message: 'Media not found' }, { status: 404 });
    }
    
    return NextResponse.json({ media });
  } catch (error) {
    console.error('Unfeature media error:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
