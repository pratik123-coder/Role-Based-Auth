import NextAuth from "next-auth"
import authConfig from "./auth.config"
import {PrismaAdapter} from "@auth/prisma-adapter"

import { getUserById } from "./data/user"
import { db } from "./lib/db"
import { UserRole } from "@prisma/client"
import { getTwoFactorConfirmationByUserId } from "./data/two-factor-confirmation"

export const { handlers, auth, signIn, signOut } = NextAuth({
  events:{
    async linkAccount({user}){
      await db.user.update({
        where: {id: user.id},
        data: {emailVerified: new Date()}
      })
    }
  },
  callbacks:{

    async signIn({user,account}){
      //allow OAuth sign without verification
      if (account?.provider !== "credentials") return true;

      const existingUser = await getUserById(user.id ?? '');
      //Prevent signIn Without Email Verification
      if(!existingUser?.emailVerified) return false;

      if(existingUser.isTwoFactorEnabled){
        const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id); 
        console.log({twoFactorConfirmation});
        if(!twoFactorConfirmation) return false;

        await db.twoFactorContirmation.delete({
          where: {id: twoFactorConfirmation.id}
        
        })
      }

      return true;
    },
    async session({token,session}){
      console.log({
        sessionToken:token
      })
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }
      if (session.user) {
        session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;
      }
      return session;
    },
    async jwt({token}){
      if(!token.sub) return token;
      const existingUser = await getUserById(token.sub);
      if(!existingUser) return token;
      token.role = existingUser.role;
      token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;
      return token;
    }
  },
  adapter: PrismaAdapter(db),
  session:{strategy: "jwt"},
  ...authConfig
})