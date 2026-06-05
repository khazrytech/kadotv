import { NextRequest, NextResponse } from 'next/server';
import User from '@/lib/models/User';
import { connectToDatabase } from '@/lib/db';
import { requireAdmin } from '@/lib/auth';

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const authResult = requireAdmin(request);
    if (authResult instanceof NextResponse) return authResult;

    await connectToDatabase();
    await User.findByIdAndDelete(params.id);
    return NextResponse.json({ message: 'User deleted' });
  } catch (error) {
    console.error('Delete user error:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
