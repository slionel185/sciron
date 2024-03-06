import { Resend } from 'resend'

import { env } from '@/utils/env'

const resend = new Resend(env.RESEND_API_KEY)

export const sendVerificationEmail = async (email: string, token: string) => {
    const confirmLink = `${env.NEXT_PUBLIC_URL}/auth/new-verification?token=${token}`

    await resend.emails.send({
        from: 'sciron@titansoftware.dev',
        to: email,
        subject: 'Confirm your email!',
        html: `
            <p>
                Click <a href="${confirmLink}">here</a> to confirm your email.
            </p>
        `
    })
}

export const sendPasswordResetEmail = async (email: string, token: string) => {
    const confirmLink = `${env.NEXT_PUBLIC_URL}/auth/new-password?token=${token}`

    await resend.emails.send({
        from: 'sciron@titansoftware.dev',
        to: email,
        subject: 'Reset your password!',
        html: `
            <p>
                Click <a href="${confirmLink}">here</a> to reset your password.
            </p>
        `
    })
}

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
    await resend.emails.send({
        from: 'sciron@titansoftware.dev',
        to: email,
        subject: 'Your 2FA Code',
        html: `
            <p>
                Your 2FA Code: ${token}
            </p>
        `
    })
}