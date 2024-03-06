// Routes that do not require authentication
export const publicRoutes = [
    '/',
    '/auth/new-verification'
]

// Routes used for authentication
// Will redirect authorized users to DEFAULT_LOGIN_REDIRECT
export const authRoutes = [
    '/auth/login',
    '/auth/error',
    '/auth/reset',
    '/auth/register',
    '/auth/new-password'
]

export const apiAuthPrefex = '/api/auth'

// Where should we redirect authorized users
export const DEFAULT_LOGIN_REDIRECT = '/dashboard'