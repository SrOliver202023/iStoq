import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';
export default function Guest({ children }: PropsWithChildren) {
    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center">
            <div className="absolute bg-[url('/assets/Background.svg')] w-screen h-screen bg-center bg-cover z-0"></div>
            <div className='z-0 m-0'>
                <Link href="/">
                    <img className='w-60 h-w-60' src="assets/iStoq-Logo.svg" alt="iStoq-Logo.svg" />
                </Link>
            </div>
            {children}
        </div>
    );
}
