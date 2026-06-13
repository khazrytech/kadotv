import { NextRequest, NextResponse } from 'next/server';

import User from '@/lib/models/User';
import Media from '@/lib/models/Media';
import { connectToDatabase } from '@/lib/db';
import { requireAdmin } from '@/lib/auth';
export async function GET(request: NextRequest) {
  try {
    const authResult = await requireAdmin(request);
    if (authResult instanceof NextResponse) return authResult;

    await connectToDatabase();
    const users = await User.countDocuments();
    const media = await Media.countDocuments();
    const live = await Media.countDocuments({ live: true });

    return NextResponse.json({ users, media, live });
  } catch (error) {
    console.error('Get stats error:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
