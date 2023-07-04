import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';

import { FaUser } from 'react-icons/fa'

export default function Edit({ auth, mustVerifyEmail, status }: PageProps<{ mustVerifyEmail: boolean, status?: string }>) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Profile</h2>}
        >
            <Head title="Profile" />

            <div className='w-full p-4 gap-4 flex flex-col'>
                <header className='flex w-full items-center justify-between'>
                    <div className='flex items-center gap-2'>
                        <span className='text-primary-500'>
                            <FaUser size={36} />
                        </span>
                        <h1 className='font-semibold text-2xl text-base-600'>Profile</h1>
                    </div>
                </header>

                <div className="max-w-md space-y-4">
                    <div className=" bg-base-0 shadow sm:rounded-lg p-4 w-fit">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                        />
                    </div>

                    <div className="p-4 max-w-md bg-base-0 shadow sm:rounded-lg w-fit">
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>
                    {/*
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <DeleteUserForm className="max-w-xl" />
                    </div> */}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
