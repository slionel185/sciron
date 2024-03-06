import { z } from 'zod'

export const NewPasswordSchema = z.object({
    password: z.string().min(6, { message: '6 character minimum' })
})

export const ResetSchema = z.object({
    email: z.string().email()
})

export const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string(),
    code: z.optional(z.string())
})

export const RegisterSchema = z.object({
    name: z.string().min(1, { message: 'Name is required' }),
    email: z.string().email(),
    password: z.string().min(6, { message: '6 character minimum' })
})

export const SendMessageSchema = z.object({
    message: z.string().min(1, { message: 'Message data invalid' })
})