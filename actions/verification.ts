"use server"

import { db } from "@/lib/db"
import { getUserByEmail } from "@/data/user"
import { getVerificationTokenByToken } from "@/data/veridfication-token"

export const newVerification = async (token: string) => {
    
    const verificationToken = await getVerificationTokenByToken(token)
    if (!verificationToken) {
        return {
            error: "Token doesn't exist"
        }
    }

    const hasExpired = new Date(verificationToken.expires) < new Date()
    if (hasExpired) {
        return {
            error: "Token has expired"
        }
    }

    const user = await getUserByEmail(verificationToken.email)
    if (!user) {
        return {
            error: "User not found"
        }
    }

    await db.user.update({
        where: {
            id: user.id
        },
        data: {
            emailVerified: new Date(),
            email: verificationToken.email
        }
    })

    await db.verificationToken.delete({
        where:{
            id: verificationToken.id
        }
    });

    return {
        success: "Email is Verified"
    }
}