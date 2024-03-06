import '@/app/globals.css'

import type { Metadata, Viewport } from 'next'

import { GeistSans } from 'geist/font/sans'
import { SessionProvider } from 'next-auth/react'

import { auth } from '@/utils/auth'

export const metadata: Metadata = {}
export const viewport: Viewport = {}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    const session = await auth()
    
    return (
        <html lang='en'>
            <head />
            <body className={GeistSans.className}>
                <SessionProvider session={session}>
                    {children}
                </SessionProvider>
            </body>
        </html>
    )
}