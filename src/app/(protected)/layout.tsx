import { Navbar } from '@/app/(protected)/_components/navbar'

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className='h-full w-full grid grid-cols-[270px_auto]'>
            <Navbar />
            {children}
        </div>
    )
}