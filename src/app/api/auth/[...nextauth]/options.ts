import CredentialsProvider from "next-auth/providers/credentials";
import { AuthOptions } from "next-auth";
import bcrypt from 'bcrypt';
import db from "@/lib/db";

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
                Identifier: { label: "Enter Your Email Or UserId", type: "text" },
                password: { label: "Enter Your Password", type: "password" }
            },
            async authorize(credentials: any): Promise<any> {
                try {
                    const user = await db.userAccounts.findFirst({
                        where: {
                            OR: [
                                { Email: credentials.Identifier },
                                { UserId: credentials.Identifier }
                            ]
                        }
                    });
                       if(!user){
                        throw new Error("No user Found Please Make registres ");
                        
                       }
                       if(!user.isVerfied){
                        throw new Error("Please Verify Your Account first ");
                       }

                       const userpasswodcorrect = await bcrypt.compare(credentials.password,user.Password)
                       if(userpasswodcorrect){
                      return user
                       }else{
                        throw new Error("Incorrect Password");
                        
                       }
                } catch (err: any) {
                    throw new Error(err);
                }
            }
        })
    ],
callbacks:{
    async jwt({token,user}){
        if(user){
            token._id =user._id?.toString()
            token.Userid = user.UserId,
            token.isVerfied = user.isVerfied;
            token.UserName = user.UserName;
            token.role = user.role;
        }
        return token
    },
async session({session,token}){
    if(token){
       session.user.isVerfied = token.isVerfied;
       session.user.UserId = token.UserId;
       session.user.UserName = token.UserName
       session.user.role = token.role
       session.user._id = token._id
       
    }   
    return session
},

},
pages:{
    signIn:'/login'
},
session:{
    strategy:"jwt"
},
secret:process.env.NEXTAUTH_SECRET,

    // Additional NextAuth configuration can go here
};

export default authOptions;
