'use client'

import { z } from 'zod'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { useState, useTransition } from 'react'
import { useSearchParams } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'

import { LoginSchema } from '@/schemas'
import { login } from '@/actions/auth/login'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { FormError } from '@/components/form-error'
import { FormSuccess } from '@/components/form-success'
import { CardWrapper } from '@/components/auth/card-wrapper'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

export default function LoginForm() {
    const searchParams = useSearchParams()
    const urlError = searchParams.get('error') === 'OauthAccountNotLinked'
        ? 'Email already in use with different provider!'
        : ''

    const [showTwoFactor, setShowTwoFactor] = useState(false)
    const [error, setError] = useState<string | undefined>('')
    const [success, setSuccess] = useState<string | undefined>('')
    const [isPending, startTransition] = useTransition()

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    })

    const onSubmit = (values: z.infer<typeof LoginSchema>) => {
        setError('')
        setSuccess('')

        startTransition(() => {
            login(values)
                .then((data) => {
                    if(data?.error) {
                        form.reset()
                        setError(data.error)
                    }

                    if(data?.success) {
                        form.reset()
                        setSuccess(data.success)
                    }

                    if(data?.twoFactor) {
                        setShowTwoFactor(true)
                    }
                })
                .catch(() => {
                    setError('Something went wrong!')
                })
        })
    }
    
    return (
        <CardWrapper
            headerLabel='Welcome back'
            backButtonLabel="Don't have an account?"
            backButtonHref='/auth/register'
            showSocial
        >
            <Form {...form}>
                <form
                    className='space-y-6'
                    onSubmit={form.handleSubmit(onSubmit)}
                >
                    <div className='space-y-4'>
                        {showTwoFactor && <>
                            <FormField
                                control={form.control}
                                name='code'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Two Factor Code</FormLabel>
                                        <FormControl>
                                            <Input disabled={isPending} placeholder='123456' {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </>}

                        {!showTwoFactor && <>
                            <FormField
                                control={form.control}
                                name='email'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input disabled={isPending} placeholder='john.doe@example.com' type='email' {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name='password'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input disabled={isPending} placeholder='********' type='password' {...field} />
                                        </FormControl>
                                        <Button className='px-0 font-normal' size='sm' variant='link' asChild>
                                            <Link href='/auth/reset'>
                                                Forgot password?
                                            </Link>
                                        </Button>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </>}
                    </div>

                    <FormError message={error || urlError} />
                    <FormSuccess message={success} />

                    <Button
                        disabled={true}
                        type='submit'
                        className='w-full'
                    >
                        {showTwoFactor ? 'Confirm' : 'Login'}
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    )
}