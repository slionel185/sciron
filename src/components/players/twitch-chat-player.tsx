'use client'

interface TwitchChatPlayerProps {
    channel?: string | null
}

import { TwitchChat } from 'react-twitch-embed'

import { useCurrentUser } from '@/hooks/use-current-user'

export const TwitchChatPlayer = ({ channel }: TwitchChatPlayerProps) => {
    const user = useCurrentUser()
    
    return (
        <TwitchChat
            darkMode={false}
            width={'100%'}
            height={'100%'}
            channel={user?.name ?? 'CultLeaderCatalyst'}
        />
    )
} 