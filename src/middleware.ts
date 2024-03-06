import NextAuth from 'next-auth'

import authConfig from './utils/auth-config'
import { authRoutes, publicRoutes, apiAuthPrefex, DEFAULT_LOGIN_REDIRECT } from '@/utils/routes'

const { auth } = NextAuth(authConfig)

export default auth((req) => {
    const { nextUrl } = req
    const isLoggedIn = !!req.auth

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefex)
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
    const isAuthRoute = authRoutes.includes(nextUrl.pathname)

    if(isApiAuthRoute) return

    if(isAuthRoute) {
        if(isLoggedIn) {
            return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
        }
        return
    }

    if(!isLoggedIn && isPublicRoute) {
        return Response.redirect(new URL('/auth/login', nextUrl))
    }
    return
})

export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"]
}