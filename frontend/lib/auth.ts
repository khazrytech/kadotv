import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'default_secret';

export interface AuthUser {
  id: string;
  role: string;
}

export function verifyToken(request: NextRequest): AuthUser | null {
  try {
    const authorization = request.headers.get('authorization');
    const token = authorization?.split(' ')[1];
    if (!token) return null;

    const payload = jwt.verify(token, JWT_SECRET);
    return payload as AuthUser;
  } catch (_error) {
    return null;
  }
}

export function requireAuth(request: NextRequest) {
  const user = verifyToken(request);
  if (!user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  return user;
}

export function requireAdmin(request: NextRequest) {
  const user = verifyToken(request);
  if (!user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  if (user.role !== 'admin') {
    return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
  }
  return user;
}
