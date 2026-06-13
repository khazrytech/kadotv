import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

import User from '@/lib/models/User';
import { connectToDatabase } from '@/lib/db';
import { requireAdmin } from '@/lib/auth';
export async function GET(request: NextRequest) {
  try {
    const authResult = requireAdmin(request);
    if (authResult instanceof NextResponse) return authResult;

    await connectToDatabase();
    const users = await User.find().select('-password');
    return NextResponse.json({ users });
  } catch (error) {
    console.error('Get users error:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
