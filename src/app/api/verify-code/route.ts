// /src/app/api/verify-code/route.ts
import { NextResponse } from 'next/server';
import db from "@/lib/db";

export async function POST(request: Request) {
    try {
        const { username, Code } = await request.json();
        const decodedUsername = decodeURIComponent(username);
        const user = await db.userAccounts.findFirst({
            where: {
                UserName: decodedUsername
            }
        });

        if (!user) {
            return NextResponse.json({
                success: false,
                message: "No user found to verify"
            }, { status: 404 });
        }

        const isCodeValid = user.VerifyCode === Code;
        const isCodeNotExpired = new Date(user.VerifyCodeExpairy) > new Date();

        if (isCodeValid && isCodeNotExpired) {
            await db.userAccounts.update({
                where: {
                    id: user.id
                },
                data: {
                    isVerified: true
                }
            });

            return NextResponse.json({
                success: true,
                message: "Verified successfully"
            }, { status: 200 });
        } else if (!isCodeNotExpired) {
            return NextResponse.json({
                success: false,
                message: "Verification code expired"
            }, { status: 400 });
        } else {
            return NextResponse.json({
                success: false,
                message: "Invalid verification code"
            }, { status: 400 });
        }
    } catch (error) {
        console.error('Error verifying user', error);
        return NextResponse.json({
            success: false,
            message: "Error verifying user"
        }, { status: 500 });
    }
}
