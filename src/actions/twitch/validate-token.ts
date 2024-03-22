'use server'

import { auth } from '@/utils/auth'

export const validateToken = async (token: string) => {
    const session = await auth()
    console.log(session)
}