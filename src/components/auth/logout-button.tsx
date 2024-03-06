'use client'

interface LogoutButtonProps {
    children?: React.ReactNode
}

import { logout } from '@/actions/auth/logout'

export const LogoutButton = ({ children }: LogoutButtonProps) => {
    const onClick = () => {
        logout()
    }

    return (
        <span onClick={onClick} className='cursor-pointer'>
            {children}
        </span>
    )
}