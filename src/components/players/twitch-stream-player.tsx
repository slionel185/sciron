'use client'

interface TwitchStreamPlayerProps {
    channel?: string | null
}

import { TwitchPlayer } from 'react-twitch-embed'

import { useCurrentUser } from '@/hooks/use-current-user'

export const TwitchStreamPlayer = ({ channel }: TwitchStreamPlayerProps) => {
    const user = useCurrentUser()
    
    return (
        <TwitchPlayer
            width={'100%'}
            height={'100%'}
            channel={user?.name ?? 'CultLeaderCatalyst'}
        />
    )
} 