'use client'

import type { TwitchCommand } from '@prisma/client'

import { ColumnDef } from '@tanstack/react-table'

export const columns: ColumnDef<TwitchCommand>[] = [
    {
        accessorKey: 'name',
        header: 'Name'
    },
    {
        accessorKey: 'favorite',
        header: 'Favorite'
    }
]