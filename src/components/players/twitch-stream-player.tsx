'use client'

interface TwitchStreamPlayerProps {
    channel?: string | null
}

import { TwitchPlayer } from 'react-twitch-embed'

export const TwitchStreamPlayer = ({ channel }: TwitchStreamPlayerProps) => {
    return (
        <TwitchPlayer
            width={'100%'}
            height={'100%'}
            channel={channel ?? 'CultLeaderCatalyst'}
        />
    )
} 