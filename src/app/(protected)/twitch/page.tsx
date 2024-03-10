'use client'

import { useEffect } from 'react'

import { useCurrentUser } from '@/hooks/use-current-user'

export default function TwitchPage() {
    const user = useCurrentUser()
    
    useEffect(() => {
        console.log(user?.token)
        fetch('https://id.twitch.tv/oauth2/validate', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + user?.token
            }
        }).then(res => res.json()).then(data => {
            console.log(data)
        })
    }, [])

    return (
        <div>
            <h1>Testing</h1>
        </div>
    )
}