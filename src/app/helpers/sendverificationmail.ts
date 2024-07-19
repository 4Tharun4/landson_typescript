import {resend} from '@/lib/resend'
import VerificationEmail from '../../../emails/VerificationEmai'
import { ApiResponse } from '@/types/ApiResponse';


export async function sendverificationmail(
    UserName:string,
    VerifyCode:string,
    Email:string
):Promise<ApiResponse>{

    try {
        const { data, error } = await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: Email,
            subject: 'Verification Code Of Your Landson Account',
            react: VerificationEmail({UserName,Otp:VerifyCode}),
          });
        return {
            success:true,message:'Verification Email Send Scussfully'
        }
    } catch (emailError) {
        console.log("failed to send message",emailError);
        return {
            success:false,message:'Failed To Send Meessage'
        }
        
        
    }
}