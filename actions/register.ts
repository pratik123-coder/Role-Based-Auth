"use server"

import bcrypt from "bcryptjs";
import { RegisterSchema } from "@/schemas";
import * as z from "zod";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid Fields!" };
  }

  const { email, password, name } = values;

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    return { error: "User already exists!" };
  }
  const createUser = await db.user.create({
    data:{
      email,
      password: hashedPassword,
      name
    }
  });
  if (!createUser) {
    return { error: "Failed to create user!" };
  }

  const verificationToken = await generateVerificationToken(email);


  await sendVerificationEmail(verificationToken.email, verificationToken.token);

  return { success: "Confirmation Email Sent!" };
}