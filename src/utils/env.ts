import { z } from 'zod'
import { createEnv } from '@t3-oss/env-nextjs'

export const env = createEnv({
    client: {
        NEXT_PUBLIC_URL: z.string().url()
    },
    server: {
        DATABASE_URL: z.string(),

        NEXTAUTH_URL: z.string(),
        NEXTAUTH_SECRET: z.string(),

        GITHUB_CLIENT_ID: z.string(),
        GITHUB_CLIENT_SECRET: z.string(),

        TWITCH_CLIENT_ID: z.string(),
        TWITCH_CLIENT_SECRET: z.string(),

        RESEND_API_KEY: z.string()
    },
    experimental__runtimeEnv: {
        NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL
    }
})