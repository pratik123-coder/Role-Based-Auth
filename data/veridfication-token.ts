import { db } from "@/lib/db";

export const getVerificationTokenByToken = async (token: string) => {
    try {
        const verificationToken = await db.verificationToken.findUnique({
            where: {
                token
            }
        })
        return verificationToken;
    } catch (error) {
        return null;
    }
}
export const getUserVerificationByEmail = async (email: string) => {
    try {
        const alreadyVerified = await db.user.findFirst({
            where: {
                email: email,
                emailVerified: { not: null }, // Checking if emailVerified is not null (i.e., verified)
            },
        });
        return true;
    } catch (error) {
        return false;
    }
}
export const getVerificationTokenByEmail = async (email: string) => {
    try {
        const verificationToken = await db.verificationToken.findFirst({
            where: {
                email
            }
        })
        return verificationToken;
    } catch (error) {
        return null;
    }
}

