'use client'

interface BackButtonProps {
    backButtonHref: string
    backButtonLabel: string
}

import Link from 'next/link'

import { Button } from '@/components/ui/button'

export const BackButton = ({ backButtonHref, backButtonLabel }: BackButtonProps) => {
    return (
        <Button variant='link' className='font-normal w-full' size='sm' asChild>
            <Link href={backButtonHref}>
                {backButtonLabel}
            </Link>
        </Button>
    )
}