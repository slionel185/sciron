'use client'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { useState, useTransition } from 'react'
import { useSearchParams } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'

import { Input } from '@/components/ui/input'
import { NewPasswordSchema } from '@/schemas'
import { Button } from '@/components/ui/button'
import { FormError } from '@/components/form-error'
import { FormSuccess} from '@/components/form-success'
import { newPassword } from '@/actions/auth/new-password'
import { CardWrapper } from '@/components/auth/card-wrapper'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form'

export default function NewPasswordForm() {
    const searchParams = useSearchParams()
    const token = searchParams.get('token')

    const [error, setError] = useState<string | undefined>('')
    const [success, setSuccess] = useState<string | undefined>('')
    const [isPending, startTransition] = useTransition()

    const form = useForm<z.infer<typeof NewPasswordSchema>>({
        resolver: zodResolver(NewPasswordSchema),
        defaultValues: {
            password: ''
        }
    })

    const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
        setError('')
        setSuccess('')

        startTransition(() => {
            newPassword(values, token).then((data) => {
                setError(data.error)
                setSuccess(data.success)
            })
        })
    }

    return (
        <CardWrapper
            headerLabel='Enter a new password'
            backButtonLabel='Back to login'
            backButtonHref='/auth/login'
        >
            <Form {...form}>
                <form
                    className='space-y-6'
                    onSubmit={form.handleSubmit(onSubmit)}
                >
                    <div className='space-y-4'>
                        <FormField
                            control={form.control}
                            name='password'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input disabled={isPending} placeholder='********' type='password' {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </div>

                    <FormError message={error} />
                    <FormSuccess message={success} />

                    <Button
                        disabled={isPending}
                        type='submit'
                        className='w-full'
                    >
                        Reset password
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    )
}