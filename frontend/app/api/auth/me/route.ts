import { NextRequest, NextResponse } from 'next/server';
import User from '@/lib/models/User';
import { connectToDatabase } from '@/lib/db';
import { requireAuth } from '@/lib/auth';
export const runtime = 'edge';
export async function GET(request: NextRequest) {
  try {
    const authResult = requireAuth(request);
    if (authResult instanceof NextResponse) return authResult;

    await connectToDatabase();
    const user = await User.findById(authResult.id).select('-password');
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error('Get me error:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
