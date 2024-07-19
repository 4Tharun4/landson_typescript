
import { NextRequest,NextResponse } from "next/server"
export {default} from 'next-auth/middleware'
import { getToken } from "next-auth/jwt"


export async function middleware(request:NextRequest){
const token = await getToken({req:request})
const url = request.nextUrl
if(token&&(
 url.pathname.startsWith("/login")||
 url.password.startsWith("/registration")||
 url.password.startsWith("/")||
 url.password.startsWith("/verify")

)){
    return NextResponse.redirect(new URL('/',request.url))
}

    return NextResponse.redirect(new URL('/',request.url))
}

export const config = { matcher: [
    "/dashboard/:path*",
    '/login',
    "/register",
    "/dealer/:path*",
    "/wherehouse/:path*",
    "verify/:path*"

] }