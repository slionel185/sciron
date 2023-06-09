import { z } from 'zod'

import { procedure } from '@/server/trpc'
import { prisma } from '@/utilities/prisma'

export const create = procedure
    .input(
        z.object({
            userId: z.string(),
            active: z.boolean(),
            name: z.string(),
            description: z.string(),
            commandType: z.enum([ 'REPLY', 'UTILITY', 'MODERATION' ]),
            args: z.string().array()
        })
    )
    .mutation(async (opts) => {
        const command = await prisma.command.create({
            data: {
                userId: opts.input.userId,
                active: opts.input.active,
                name: opts.input.name,
                description: opts.input.description,
                commandType: opts.input.commandType,
                args: opts.input.args
            }
        })

        return command
    })