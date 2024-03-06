'use server'

import { z } from 'zod'
import bcrypt from 'bcryptjs'

import { prisma } from '@/utils/prisma'
import { RegisterSchema } from '@/schemas'
import { getUserByEmail } from '@/data/user'
import { sendVerificationEmail } from '@/utils/mail'
import { generateVerificationToken } from '@/utils/token'

export const register = async (values: z.infer<typeof RegisterSchema>) => {
    const validatedFields = RegisterSchema.safeParse(values)

    if(!validatedFields.success) return {
        error: 'Invalid fields.'
    }

    const { name, email, password } = validatedFields.data

    const existingUser = await getUserByEmail(email)

    if(existingUser) {
        error: 'Email already in use!'
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword
        }
    })

    const verificationToken = await generateVerificationToken(email)
    await sendVerificationEmail(verificationToken.email, verificationToken.token)

    return {
        success: 'Confirmation email sent!'
    }
}