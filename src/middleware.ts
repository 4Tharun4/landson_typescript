import { NextResponse, NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    console.log("No token found, redirecting to login");
    return NextResponse.redirect(new URL('/login', req.url));
  }

  const { role } = token;
  const url = req.nextUrl.clone();

  console.log("Requested URL:", url.pathname);


  // Convert role to lowercase for case-insensitive comparison
  const normalizedRole = role ? role.toLowerCase() : '';

  if (url.pathname.startsWith('/dashboard') && normalizedRole !== 'admin') {
    console.log(`Unauthorized access to /dashboard with role ${normalizedRole}, redirecting`);
    return NextResponse.redirect(new URL('/unauthorized', req.url));
  }

  if (url.pathname.startsWith('/wherehouse') && normalizedRole !== 'wherehouse') {
    console.log(`Unauthorized access to /wherehouse with role ${normalizedRole}, redirecting`);
    return NextResponse.redirect(new URL('/unauthorized', req.url));
  }

  if (url.pathname.startsWith('/dealer') && normalizedRole !== 'dealer') {
    console.log(`Unauthorized access to /dealer with role ${normalizedRole}, redirecting`);
    return NextResponse.redirect(new URL('/unauthorized', req.url));
  }

  if (url.pathname === '/' && normalizedRole !== 'user') {
    console.log(`Unauthorized access to / with role ${normalizedRole}, redirecting`);
    return NextResponse.redirect(new URL('/', req.url));
  }

  console.log("Access granted");
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/wherehouse/:path*',
    '/dealer/:path*',
      ],
};
