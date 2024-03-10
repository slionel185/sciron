import type { DefaultSession } from 'next-auth'
import type { User, UserRole } from '@prisma/client'

import NextAuth from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'

import { prisma } from '@/utils/prisma'
import { getUserById } from '@/data/user'
import authConfig from '@/utils/auth-config'
import { getTwoFactorConfirmationByUserId } from '@/data/two-factor-confirmation'

declare module 'next-auth' {
    interface Session {
        user: {
            token: string | null
        } & User & DefaultSession['user']
    }
}

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut
} = NextAuth({
    basePath: '/api/auth',
    pages: {
        signIn: '/auth/login',
        error: '/auth/error'
    },
    callbacks: {
        async signIn({ user, account }) {
            if(account?.provider !== 'credentials') return true

            const existingUser = await getUserById(user.id!)
            if(!existingUser?.emailVerified) return false

            if(!existingUser.isTwoFactorEnabled) {
                const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id)

                if(!twoFactorConfirmation) return false

                await prisma.twoFactorConfirmation.delete({ where: { id: twoFactorConfirmation.id }})
            }

            return true
        },
        async jwt({ token, account }) {
            if(!token.sub) return token

            if (account && account.access_token) {
                token.accessToken = account.access_token // <-- adding the access_token here
            }

            const existingUser = await getUserById(token.sub)
            if(!existingUser) return token

            token.role = existingUser.role
            return token
        },
        async session({ token, session }) {
            const getToken = await prisma.account.findFirst({
                where: {
                    userId: session.user.id
                }
            })


            if(getToken && session.user) {
                session.user.token = getToken.access_token
            }

            if(token.sub && session.user) {
                session.user.id = token.sub
            }

            if(token.role && session.user) {
                session.user.role = token.role as UserRole
            }

            return session
        }
    },
    adapter: PrismaAdapter(prisma),
    session: { strategy: 'jwt' },
    ...authConfig
})