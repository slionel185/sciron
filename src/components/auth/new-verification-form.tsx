'use client'

import { ScaleLoader } from 'react-spinners'
import { useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'

import { FormError } from '@/components/form-error'
import { FormSuccess } from '@/components/form-success'
import { CardWrapper } from '@/components/auth/card-wrapper'
import { newVerification } from '@/actions/auth/new-verification'

export const NewVerificationForm = () => {
    const [error, setError] = useState<string | undefined>('')
    const [success, setSuccess] = useState<string | undefined>('')

    const searchParams = useSearchParams()
    const token = searchParams.get('token')

    const onSubmit = useCallback(() => {
        if(!token) {
            setError('Missing token!')
            return
        }

        newVerification(token)
            .then((data) => {
                setError(data.error)
                setSuccess(data.success)
            })
            .catch(() => {
                setError('Something went wrong!')
            })
    }, [token, success, error])

    useEffect(() => {
        onSubmit()
    }, [onSubmit])

    return (
        <CardWrapper
            headerLabel='Confirming your verification'
            backButtonHref='/auth/login'
            backButtonLabel='Back to login'
        >
            <div className='flex flex-col items-center w-full justify-center'>
                {!success && !error && (
                    <ScaleLoader />
                )}

                <FormError message={error} />
                <FormSuccess message={success} />
            </div>
        </CardWrapper>
    )
}