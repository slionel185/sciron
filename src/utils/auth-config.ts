import type { NextAuthConfig } from 'next-auth'

import bcrypt from 'bcryptjs'
import twitch from 'next-auth/providers/twitch'
import github from 'next-auth/providers/github'
import credentials from 'next-auth/providers/credentials'

import { env } from '@/utils/env'
import { scopes } from '@/utils/scopes'
import { LoginSchema } from '@/schemas'
import { getUserByEmail } from '@/data/user'

export default {
    providers: [
        github({
            clientId: env.GITHUB_CLIENT_ID,
            clientSecret: env.GITHUB_CLIENT_SECRET
        }),
        twitch({
            clientId: env.TWITCH_CLIENT_ID,
            clientSecret: env.TWITCH_CLIENT_SECRET,
            authorization: {
                scopes: scopes.join(' ')
            }
        }),
        credentials({
            async authorize(credentials) {
                const validatedFields = LoginSchema.safeParse(credentials)

                if(validatedFields.success) {
                    const { email, password } = validatedFields.data

                    const user = await getUserByEmail(email)
                    if(!user || !user.password) return null
                    
                    const passwordMatch = await bcrypt.compare(password, user.password)

                    if(passwordMatch) return user
                }
                
                return null
            }
        })
    ]
} satisfies NextAuthConfig