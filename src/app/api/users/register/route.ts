import { sendverificationmail } from "@/app/helpers/sendverificationmail";
import db from "@/lib/db";
import bcrypt from 'bcrypt';
import { ADMIN, DEALER, USERID, WHEREHOUSE } from "@/Generaters/UsetIDGenerater";

export async function POST(request: Request) {
    try {
        const { UserName, Email, Password, Address, PhoneNumber, role } = await request.json();
        const passwordToHash = Password || "Landson@123";    
        const normalizedEmail = Email.toLowerCase();
    //query passing
        
        // Correct field name: isVerified
        const existingUserEmail = await db.userAccounts.findFirst({
            where: {
                Email:normalizedEmail,
        isVerified:false // Ensure this matches the field name in your schema
            }
        });


        if (existingUserEmail) {
            return new Response(JSON.stringify({
                success: false,
                message: "You are already registered. Please log in."
            }), { status: 400 });
        } else {
            const hashedPassword = await bcrypt.hash(passwordToHash, 10);
            const expiryDate = new Date();
            expiryDate.setHours(expiryDate.getHours() + 1);

            let userId;
            if (role === 'DEALER') {
                userId = DEALER("LSD");
            } else if (role === 'WAREHOUSE') {
                userId = WHEREHOUSE("LSW");
            } else if (role === 'ADMIN') {
                userId = ADMIN("LSA");
            } else {
                userId = USERID("LSU");
            }

            const generate6DigitCode = (): string => {
                return Math.floor(100000 + Math.random() * 900000).toString();
            };

            const newUser = await db.userAccounts.create({
                data: {
                    UserName,
                    Email,
                    Password: hashedPassword,
                    Address,
                    PhoneNumber,
                    role: role || "USER", // Ensure Role is a string
                    UserId: userId,
                    VerifyCode: generate6DigitCode(),
                    VerifyCodeExpairy: expiryDate
                }
            });

            const SendEmail =    await sendverificationmail(newUser.UserName, newUser.VerifyCode, newUser.Email); 
console.log(newUser.Email);
console.log(newUser.VerifyCode);
console.log(newUser.UserName);



            if(!SendEmail.success){
                return new Response(JSON.stringify({
                    success: false,
                    message: SendEmail.message
                }), { status: 500 });
                
            }

            return new Response(JSON.stringify({
                success: true,
                message: "User registered successfully. Please check your email for verification."
            }), { status: 200 });

       
        }
    } catch (error) {
        console.error('Error registering user', error);
        return new Response(JSON.stringify({
            success: false,
            message: "Error registering user"
        }), { status: 500 });
    }
}
