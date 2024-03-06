'use client'

import { signIn } from 'next-auth/react'
import { FaGithub } from 'react-icons/fa'
import { FaTwitch } from 'react-icons/fa'

import { Button } from '@/components/ui/button'
import { DEFAULT_LOGIN_REDIRECT } from '@/utils/routes'

export const Social = () => {
    const onClick = (provider: 'twitch' | 'github') => {
        signIn(provider, {
            callbackUrl: DEFAULT_LOGIN_REDIRECT
        })
    }

    return (
        <div className='flex items-center w-full gap-x-2'>
            <Button className='w-full' size='lg' variant='outline' onClick={() => onClick('twitch')}>
                <FaTwitch color='#9146FF' className='g-5 w-5' />
            </Button>

            <Button disabled={true} className='w-full' size='lg' variant='outline' onClick={() => onClick('github')}>
                <FaGithub color='#000' className='h-5 w-5' />
            </Button>
        </div>
    )
}