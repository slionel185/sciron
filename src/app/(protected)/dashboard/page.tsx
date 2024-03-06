'use client'

import { useCurrentUser } from '@/hooks/use-current-user'
import { TwitchChatPlayer } from '@/components/players/twitch-chat-player'
import { TwitchStreamPlayer } from '@/components/players/twitch-stream-player'

export default function DashboardPage() {
    const user = useCurrentUser()

    return (
        <div className='border h-full w-full grid grid-rows-5'>
            <div className='border-b row-span-3 grid grid-cols-6'>
                <div className='border-r col-span-4'>
                    <TwitchStreamPlayer channel={user?.name} />
                </div>

                <div className='border-r col-span-2'>
                    <TwitchChatPlayer channel={user?.name} />
                </div>
            </div>

            <div className='row-span-2 grid grid-cols-2'>
                <div className='border-r'>
                    Test
                </div>

                <div>
                    
                </div>
            </div>
        </div>
    )
}