import { NextRequest, NextResponse } from 'next/server';
import Media from '@/lib/models/Media';
import { connectToDatabase } from '@/lib/db';
import { requireAdmin } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const authResult = requireAdmin(request);
    if (authResult instanceof NextResponse) return authResult;

    await connectToDatabase();
    const body = await request.json();
    const item = await Media.create({
      title: body.title,
      description: body.description,
      category: body.category,
      type: body.type,
      posterUrl: body.posterUrl,
      videoUrl: body.videoUrl,
      previewUrl: body.previewUrl,
      rating: body.rating || 0,
      tags: body.tags || [],
      featured: body.featured || false,
      live: body.live || false,
    });
    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    console.error('Create media admin error:', error);
    return NextResponse.json({ message: 'Invalid data' }, { status: 400 });
  }
}
