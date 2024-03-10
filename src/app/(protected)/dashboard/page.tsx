import type { TwitchCommand, DiscordCommand } from '@prisma/client'

import { TwitchChatPlayer } from '@/components/players/twitch-chat-player'
import { CommandDataTable } from '@/components/commands/command-data-table'
import { TwitchStreamPlayer } from '@/components/players/twitch-stream-player'
import { columns as TwitchColumns } from '@/components/commands/twitch-columns'
import { columns as DiscordColumnds } from '@/components/commands/discord-columns'

export default function DashboardPage() {
    const twitchData: TwitchCommand[] = []
    const discordData: DiscordCommand[] = []

    return (
        <div className='border h-full w-full grid grid-rows-5'>
            <div className='border-b row-span-3 grid grid-cols-6'>
                <div className='border-r col-span-4'>
                    <TwitchStreamPlayer />
                </div>

                <div className='border-r col-span-2'>
                    <TwitchChatPlayer />
                </div>
            </div>

            <div className='row-span-2 grid grid-cols-2'>
                <div className='border-r'>
                    <CommandDataTable data={twitchData} columns={TwitchColumns} />
                </div>

                <div>
                    <CommandDataTable data={discordData} columns={DiscordColumnds} />
                </div>
            </div>
        </div>
    )
}