import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = process.env.JWT_SECRET || 'default_secret';

export interface AuthUser {
  id: string;
  role: string;
}

export type AuthResult = AuthUser | NextResponse;

export async function verifyToken(request: NextRequest): Promise<AuthUser | null> {
  try {
    const authorization = request.headers.get('authorization');
    const token = authorization?.split(' ')[1];
    if (!token) return null;

    const { payload } = await jwtVerify(token, new TextEncoder().encode(JWT_SECRET));
    return payload as unknown as AuthUser;
  } catch {
    return null;
  }
}

export async function requireAuth(request: NextRequest): Promise<AuthResult> {
  const user = await verifyToken(request);
  if (!user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  return user;
}

export async function requireAdmin(request: NextRequest): Promise<AuthResult> {
  const user = await verifyToken(request);
  if (!user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  if (user.role !== 'admin') {
    return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
  }
  return user;
}
