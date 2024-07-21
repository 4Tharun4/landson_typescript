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
        password: { label: "Enter Your Password", type: "password" },
      },
      async authorize(credentials: any): Promise<any> {
        try {
          // Fetch user by Email or UserId
          const user = await db.userAccounts.findFirst({
            where: {
              OR: [
                { Email: credentials.Identifier },
                { UserId: credentials.Identifier },
              ],
            },
          });

          if (!user) {
            throw new Error("No user found. Please register.");
          }

          if (!user.isVerfied) {
            throw new Error("Please verify your account first.");
          }

          // Check password
          const passwordMatch = await bcrypt.compare(credentials.password, user.Password);
          if (!passwordMatch) {
            throw new Error("Incorrect password.");
          }

          // Return user if everything is correct
          return {
            _id: user.id,
            UserId: user.UserId,
            isVerfied: user.isVerfied,
            UserName: user.UserName,
            role: user.role,
          };
        } catch (err:any) {
          throw new Error(err.message);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id?.toString() || '';
        token.UserId = user.UserId || '';
        token.isVerfied = user.isVerfied || false;
        token.UserName = user.UserName || '';
        token.role = user.role || '';
      }
      console.log("JWT Callback - Token:", token);
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user = {
          _id: token._id as string,
          UserId: token.UserId as string,
          isVerfied: token.isVerfied as boolean,
          UserName: token.UserName as string,
          role: token.role as string,
        };
      }
      console.log("Session Callback - Session:", session);
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
