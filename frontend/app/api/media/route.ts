import { NextRequest, NextResponse } from 'next/server';
import Media from '@/lib/models/Media';
import { connectToDatabase } from '@/lib/db';
import { requireAuth } from '@/lib/auth';
export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '20', 10);
    const type = searchParams.get('type');
    const category = searchParams.get('category');

    const filter: any = {};
    if (type) filter.type = type;
    if (category) filter.category = category;

    const media = await Media.find(filter)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });
    const total = await Media.countDocuments(filter);

    return NextResponse.json({
      total,
      page,
      limit,
      data: media,
    });
  } catch (error) {
    console.error('Get media error:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const authResult = requireAuth(request);
    if (authResult instanceof NextResponse) return authResult;

    await connectToDatabase();
    const mediaData = await request.json();
    const media = new Media({ ...mediaData, featured: false, live: false });
    await media.save();

    return NextResponse.json(media, { status: 201 });
  } catch (error) {
    console.error('Create media error:', error);
    return NextResponse.json({ message: 'Invalid data' }, { status: 400 });
  }
}
