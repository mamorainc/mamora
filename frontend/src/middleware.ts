import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith('/api/auth')) {
    return NextResponse.next();
  }
  const secret = process.env.AUTH_SECRET;
  const token = await getToken({ req, secret });
  const res = NextResponse.next();

  if (token) {
    res.headers.set('x-user-id', token.sub || '');
  }

  return res;
}

export const config = {
  matcher: ['/api/:path*'],
};
