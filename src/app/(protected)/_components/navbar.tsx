'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { useCurrentUser } from '@/hooks/use-current-user'
import { UserButton } from '@/components/auth/user-button'

export const Navbar = () => {
    const user = useCurrentUser()
    const pathname = usePathname()

    return (
        <nav className='bg-background/15 h-full w-full flex flex-col'>
            <div className='flex flex-col justify-center p-4 border-b'>
                <h1 className='text-primary uppercase text-3xl font-semibold'>Sciron</h1>
            </div>

            <div className='flex flex-col items-center gap-2 p-4 flex-grow'>
                <Button className='w-full' variant={pathname === '/dashboard'? 'default' : 'outline'} asChild>
                    <Link href='/dashboard'>
                        Dashboard
                    </Link>
                </Button>

                <Button disabled={true} className='w-full' variant={pathname === '/twitch'? 'default' : 'outline'} asChild>
                    <Link href='/dashboard'>
                        Twitch
                    </Link>
                </Button>

                <Button disabled={true} className='w-full' variant={pathname === '/discord'? 'default' : 'outline'} asChild>
                    <Link href='/dashboard'>
                        Discord
                    </Link>
                </Button>
            </div>

            <div className='border-t p-4 gap-4 flex justify-between items-center'>
                <UserButton />
                <span className='font-medium'>{user?.name}</span>
            </div>
        </nav>
    )
}