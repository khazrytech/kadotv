import { NextRequest, NextResponse } from 'next/server';
import User from '@/lib/models/User'; // Hakikisha path ni sahihi (inaweza kuwa User au Model unayotumia)
import { connectToDatabase } from '@/lib/db';
import { requireAdmin } from '@/lib/auth';
export const runtime = 'edge';
export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const authResult = requireAdmin(_request);
    if (authResult instanceof NextResponse) return authResult;

    // Lazima u-await params kwanza
    const { id } = await params;

    await connectToDatabase();
    
    // Futa mtumiaji
    const user = await User.findByIdAndDelete(id);
    
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }
    
    return NextResponse.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Delete user error:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
