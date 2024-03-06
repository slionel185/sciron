import { Button } from '@/components/ui/button'
import { LoginButton } from '@/components/auth/login-button'

export default function HomePage() {
    return (
        <main className='flex h-full flex-col items-center justify-center'>
            <div className='space-y-6 text-center'>
                <h1 className='text-6xl font-bold drop-shadow-md'>
                    SCIRON
                </h1>

                <div>
                    <LoginButton>
                        <Button size='lg'>
                            Login
                        </Button>
                    </LoginButton>
                </div>
            </div>
        </main>
    )
}