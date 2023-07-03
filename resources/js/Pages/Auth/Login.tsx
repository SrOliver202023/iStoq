import { useEffect, FormEventHandler } from 'react';
import Checkbox from '@/Components/Checkbox';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import SecondaryButton from '@/Components/SecondaryButton';

export default function Login({ status, canResetPassword }: { status?: string, canResetPassword: boolean }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('login'));
    };

    return (
        <GuestLayout>
            <Head title="Sign In" />
            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

            <section className='z-0 flex  max-w-[860px] bg-transparent shadow-[0_0_125px_0_rgba(0,0,0,0.30)] rounded'>
                <article className='bg-primary-500 p-5 w-1/2 rounded-l max-md:hidden'>
                    <div className='gap-1 flex flex-col border-b pb-2 border-primary-300'>
                        <h2 className='text-primary-100 text-2xl font-medium'>💈 Manage your <br />product stock</h2>
                        <p className='text-primary-200'>
                            Intuitively and online<br />
                            for your business.
                        </p>
                    </div>

                    <div className='w-full flex justify-center'>
                        <img className='w-48 h-4w-48' src="assets/CheckingBoxesCuate.svg" alt="CheckingBoxesCuate.svg" />
                    </div>
                </article>
                <form onSubmit={submit} className='bg-base-0 p-5 w-1/2 max-md:w-full rounded-r max-md:rounded flex flex-col gap-2'>

                    <div>
                        <h2 className='text-lg text-primary-500 font-normal'>
                            <span className='text-2xl font-semibold'>Hello</span>, Welcome!
                        </h2>
                        <h3 className='text-sm'>
                            <span className='text-secondary-500 font-semibold'>Sign In</span> you account
                        </h3>
                    </div>


                    <div>
                        <InputLabel htmlFor="E-mail" value="E-mail" />
                        <TextInput
                            id="E-mail"
                            name="E-mail"
                            value={data.email}
                            className="mt-1 block w-full"
                            autoComplete="E-mail"
                            isFocused={true}
                            onChange={(e) => setData('email', e.target.value)}
                            required
                        />
                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="password" value="Password" />

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="mt-1 block w-full "
                            autoComplete="password"
                            isFocused={true}
                            onChange={(e) => setData('password', e.target.value)}
                            required
                        />
                        <InputError message={errors.password} className="mt-2" />
                    </div>

                    <div className='flex flex-col gap-2'>
                        <PrimaryButton className='w-full flex justify-center font-medium' disabled={processing}>Sign In</PrimaryButton>
                        <Link
                            href={route('register')}
                        >
                            <SecondaryButton className='w-full flex justify-center border-none font-normal'>Create account</SecondaryButton>
                        </Link>
                    </div>
                </form>
            </section>
        </GuestLayout>
    );
}
