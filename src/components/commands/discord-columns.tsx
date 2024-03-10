'use client'

import type { DiscordCommand } from '@prisma/client'

import { ColumnDef } from '@tanstack/react-table'

export const columns: ColumnDef<DiscordCommand>[] = [
    {
        accessorKey: 'name',
        header: 'Name'
    },
    {
        accessorKey: 'favorite',
        header: 'Favorite'
    }
]