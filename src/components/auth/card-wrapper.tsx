'use client'

interface CardWrapperProps {
    children: React.ReactNode
    headerLabel: string
    backButtonLabel: string
    backButtonHref: string
    showSocial?: boolean
}

import { Social } from '@/components/auth/socials'
import { Header } from '@/components/auth/header'
import { BackButton } from '@/components/auth/back-button'
import { Card, CardHeader, CardFooter, CardContent } from '@/components/ui/card'

export const CardWrapper = ({ children, headerLabel, backButtonLabel, backButtonHref, showSocial }: CardWrapperProps) => {
    return (
        <Card className='w-[400px] shadow-md'>
            <CardHeader>
                <Header label={headerLabel} />
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
            {showSocial && (
                <CardFooter>
                    <Social />
                </CardFooter>
            )}
            <CardFooter>
                <BackButton
                    backButtonHref={backButtonHref}
                    backButtonLabel={backButtonLabel}
                />
            </CardFooter>
        </Card>
    )
}