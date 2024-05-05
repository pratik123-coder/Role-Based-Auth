"use server";

import { getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";

import { SettingsSchema } from "@/schemas";
import * as z from "zod";
import { db } from "@/lib/db";

export const settings = async (values: z.infer<typeof SettingsSchema>) => {
    const user = await currentUser();
  
    if (!user) {
        return { error: "Unauthorized" };
    }
  
    const dbUser = await getUserById(user.id || "");
  
    if (!dbUser) {
        return { error: "Unauthorized" };
    }
  
    // If the user is signed in from Google or another OAuth provider
  
    // Update only the role and isTwoFactorEnabled properties
    const updatedUser = await db.user.update({
        where: { id: dbUser.id },
        data: {
            role: values.role,
            isTwoFactorEnabled: values.isTwoFactorEnabled,
        },
    });
  
    // Update the session

  
    return { success: "Settings Updated!" };
};
