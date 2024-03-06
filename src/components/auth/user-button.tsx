'use client'

import Link from 'next/link'
import { GoGear } from 'react-icons/go'
import { FaUser } from 'react-icons/fa'
import { ExitIcon } from '@radix-ui/react-icons'

import { useCurrentUser } from '@/hooks/use-current-user'
import { LogoutButton } from '@/components/auth/logout-button'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu'

export const UserButton = () => {
    const user = useCurrentUser()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className='rounded-full'>
                <Avatar className='border bg-background'>
                    <AvatarImage src={user?.image || ''} />
                    <AvatarFallback>
                        <FaUser className='text-primary' />
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-40' align='end'>
                <DropdownMenuItem asChild>
                    <Link href='/settings'>
                        <GoGear className='h-4 w-4 mr-2' />
                        Settings
                    </Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <LogoutButton>
                    <DropdownMenuItem className='bg-destructive/15 text-destructive'>
                        <ExitIcon className='h-4 w-4 mr-2' />
                        Logout
                    </DropdownMenuItem>
                </LogoutButton>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}