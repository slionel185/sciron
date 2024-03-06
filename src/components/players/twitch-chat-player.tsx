'use client'

interface TwitchChatPlayerProps {
    channel?: string | null
}

import { TwitchChat } from 'react-twitch-embed'

export const TwitchChatPlayer = ({ channel }: TwitchChatPlayerProps) => {
    return (
        <TwitchChat
            darkMode={false}
            width={'100%'}
            height={'100%'}
            channel={channel ?? 'CultLeaderCatalyst'}
        />
    )
} 