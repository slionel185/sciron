import { prisma } from '@/utils/prisma'

export const getTokenByEmail = async (email: string) => {
    try {
        const user = await prisma.user.findUnique({
            where: { email },
            include: {
                Account: {
                    select: {
                        access_token: true
                    }
                }
            }
        })

        return user!.Account[0].access_token
    } catch {
        return null
    }
}

export const getUserByEmail = async (email: string) => {
    try {
        const user = await prisma.user.findUnique({ where: { email }})
        return user
    } catch {
        return null
    }
}

export const getUserById = async (id: string) => {
    try {
        const user = await prisma.user.findUnique({ where: { id }})
        return user
    } catch {
        return null
    }
}