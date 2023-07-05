import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { PageProps, Supplier, SupplierDTO, SupplierProps } from '@/types';
import { BiUserPin } from 'react-icons/bi'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import { FormEvent, useEffect } from 'react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import SecondaryButton from '@/Components/SecondaryButton';
import PrimaryButton from '@/Components/PrimaryButton';
import { handleCNPJChange, handlePhoneNumberChange } from '@/utils/InputMask'

export default function Edit({ auth, supplier }: PageProps & SupplierProps) {
  const { data, setData, post, put, processing, errors, reset } = useForm<SupplierDTO>({
    cnpj: supplier.cnpj || '',
    email: supplier.email || '',
    supplierName: supplier.supplierName || '',
    phone: supplier.phone || '',
    address: supplier.address || ''
  });

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    put(route('suppliers.update', supplier.id), { onSuccess: () => reset() });
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Suppliers Edit</h2>}
    >
      <Head title="Suppliers edit" />
      <div className='w-full p-4'>
        <header className='flex w-full items-center justify-between'>
          <div className='flex items-center gap-2'>
            <span className='text-primary-500'>
              <BiUserPin size={36} />
            </span>
            <h1 className='font-semibold text-2xl text-base-600'>Supplier Edit</h1>
            <span className='text-base-300'>
              #{supplier.id}
            </span>
          </div>
        </header>

        <form onSubmit={submit} className='w-full bg-base-0 max-w-md flex flex-col gap-2 shadow-[0_0_10px_0_rgba(0,0,0,0.10)] p-4 rounded-lg'>
          <div className='w-full'>
            <InputLabel htmlFor="supplierName" value="Supplier Name" />
            <TextInput
              id="supplierName"
              name="Supplier Name"
              placeholder="Supplier Name"
              value={data?.supplierName}
              className="mt-1 block w-full"
              autoComplete="supplierName"
              isFocused={true}
              onChange={(e) => setData('supplierName', e.target.value)}
              required
            />
            <InputError message={errors.supplierName} className="mt-2" />
          </div>

          <div className='w-full'>
            <InputLabel htmlFor="cnpj" value="Cnpj" />
            <TextInput
              id="cnpj"
              name="Cnpj"
              placeholder="00.000.000/0000-00"
              value={data.cnpj}
              className="mt-1 block w-full"
              autoComplete="cnpj"
              isFocused={true}
              onChange={(e) => setData('cnpj', String(handleCNPJChange(e)))}
              required
            />
            <InputError message={errors.cnpj} className="mt-2" />
          </div>

          <div className='w-full'>
            <InputLabel htmlFor="adress" value="Adress" />
            <TextInput
              id="address"
              name="Adress"
              value={data.address}
              className="mt-1 block w-full"
              autoComplete="adress"
              isFocused={true}
              onChange={(e) => setData('address', e.target.value)}
              required
            />
            <InputError message={errors.address} className="mt-2" />
          </div>
          <div className='w-full'>
            <InputLabel htmlFor="email" value="E-mail" />
            <TextInput
              id="email"
              type='email'
              name="E-mail"
              placeholder='example@gmail.com'
              value={data.email}
              className="mt-1 block w-full"
              autoComplete="email"
              isFocused={true}
              onChange={(e) => setData('email', e.target.value)}
              required
            />
            <InputError message={errors.email} className="mt-2" />
          </div>
          <div className='w-full'>
            <InputLabel htmlFor="phone" value="Phone" />
            <TextInput
              id="phone"
              name="Phone"
              placeholder="(99) 99999-9999"
              value={data.phone}
              className="mt-1 block w-full"
              autoComplete="phone"
              isFocused={true}
              onChange={(e) => setData('phone', String(handlePhoneNumberChange(e)))}
              required
            />
            <InputError message={errors.phone} className="mt-2" />
          </div>

          <div className='w-full flex gap-4 justify-end pb-2'>
            <Link href={route('suppliers.index')} >
              <SecondaryButton className='border-none font-normal' type='button'>
                Cancel
              </SecondaryButton>
            </Link>

            <PrimaryButton className='font-medium' type='submit'>
              Save
            </PrimaryButton>

          </div>
        </form>

      </div>

    </AuthenticatedLayout>
  );
}
