'use server'

import { z } from 'zod'
import bcrypt from 'bcryptjs'

import { prisma } from '@/utils/prisma'
import { getUserByEmail } from '@/data/user'
import { NewPasswordSchema } from '@/schemas'
import { getPasswordResetTokenByToken } from '@/data/password-reset-token'

export const newPassword = async (values: z.infer<typeof NewPasswordSchema>, token?: string | null) => {
    if(!token) {
        return {
            error: 'Missing token!'
        }
    }

    const validatedFields = NewPasswordSchema.safeParse(values)
    if(!validatedFields.success) {
        return {
            error: 'Invalid fields!'
        }
    }

    const existingToken = await getPasswordResetTokenByToken(token)
    if(!existingToken) {
        return {
            error: 'Invalid token!'
        }
    }

    const hasExpired = new Date(existingToken.expires) < new Date()
    if(hasExpired) {
        return {
            error: 'Token expired!'
        }
    }

    const existingUser = await getUserByEmail(existingToken.email)
    if(!existingUser) {
        return {
            error: 'Email does not exist!'
        }
    }

    const { password } = validatedFields.data
    const hashedPassword = await bcrypt.hash(password, 10)

    await prisma.user.update({
        where: {
            id: existingUser.id
        },
        data: {
            password: hashedPassword
        }
    })

    await prisma.passwordResetToken.delete({
        where: {
            id: existingToken.id
        }
    })

    return {
        success: 'Passsword updated!'
    }
}