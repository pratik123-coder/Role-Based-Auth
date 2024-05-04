import {Resend} from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendTwoFactorTokenEmail = async (
    email: string,
    token: string
) => {
    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Your two-factor authentication code",
        html: `<p>Your two-factor authentication code is: ${token}</p>`
    });
};

export const sendVerificationEmail = async (
    email: string,
    token: string
) => {
    const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`;

    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Please verify your email",
        html: `<p>Click this link to verify your email: <a href="${confirmLink}">Link</a></p>`
    })
}