import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { PageProps, ProductDTO, ProductProps, Supplier, SuppliersProps } from '@/types';
import { BiUserPin } from 'react-icons/bi'
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import { FormEvent } from 'react';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';

export default function Edit({ auth, product, suppliers }: PageProps & SuppliersProps & ProductProps) {
  const { data, setData, put, processing, errors, reset } = useForm<ProductDTO>({
    productName: product.productName || '',
    description: product.description || '',
    externalCode: product.externalCode || '',
    imageUrl: product.imageUrl || '',
    quantity: product.quantity || 0,
    price: product.price || 0,
    supplierId: product.supplierId || 0
  });

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    put(route('products.update', product.id), { onSuccess: () => reset() });
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Products edit</h2>}
    >
      <Head title="Product edit" />

      <div className='w-full p-4 flex flex-col gap-4'>
        <header className='flex w-full items-center justify-between'>
          <div className='flex items-center gap-2'>
            <span className='text-primary-500'>
              <BiUserPin size={36} />
            </span>
            <h1 className='font-semibold text-2xl text-base-600'>Product Edit</h1>
          </div>
        </header>

        <form onSubmit={submit} className='w-full bg-base-0 max-w-md flex flex-col gap-2 shadow-[0_0_10px_0_rgba(0,0,0,0.10)] p-4 rounded-lg'>
          <div className='w-full flex flex-col gap-2'>

            <div className='w-full'>
              <InputLabel htmlFor="productName" value="Product Name" />
              <TextInput
                id="productName"
                name="Product Name"
                placeholder="Product Name"
                value={data?.productName}
                className="mt-1 block w-full"
                autoComplete="productName"
                isFocused={true}
                onChange={(e) => setData('productName', e.target.value)}
                required
              />
              <InputError message={errors.productName} className="mt-2" />
            </div>

            <div className='w-full'>
              <InputLabel htmlFor="externalCode" value="External code" />
              <TextInput
                id="externalCode"
                name="External code"
                placeholder="External code"
                value={data?.externalCode}
                className="mt-1 block w-full"
                autoComplete="externalCode"
                isFocused={true}
                onChange={(e) => setData('externalCode', e.target.value)}
              />
              <InputError message={errors.externalCode} className="mt-2" />
            </div>

            <div className='w-full'>
              <InputLabel htmlFor="description" value="Description" className='mt-1' />
              <textarea
                id="description"
                name="description"
                placeholder="description..."
                value={data?.description}
                className='w-full resize-none rounded-md border-primary-200 placeholder:text-primary-200 text-base-500 focus:border-primary-200 !ring-primary-200 !shadow-none'
                onChange={(e) => setData('description', e.target.value)}
                required
              />
              <InputError message={errors.externalCode} className="mt-2" />
            </div>

            <div className='flex gap-2'>
              <div className='w-full'>
                <InputLabel htmlFor="price" value="Price" />
                <TextInput
                  type="number"
                  id="price"
                  name="Price"
                  placeholder="12,54"
                  value={data?.price > 0 ? data.price : ''}
                  className="mt-1 block w-full"
                  isFocused={true}
                  onChange={(e) => setData('price', Number(e.target.value))}
                  required
                />
                <InputError message={errors.price} className="mt-2" />
              </div>

              <div className='w-full'>
                <InputLabel htmlFor="quantity" value="Quantity" />
                <TextInput
                  type="number"
                  id="quantity"
                  name="Quantity"
                  placeholder="12"
                  value={data?.quantity > 0 ? data.quantity : ''}
                  className="mt-1 block w-full"
                  isFocused={true}
                  onChange={(e) => setData('quantity', Number(e.target.value))}
                  required
                />
                <InputError message={errors.quantity} className="mt-2" />
              </div>
            </div>

            <div className='w-full'>
              <InputLabel htmlFor="supplierId" value="Supplier" />
              <select
                id="supplierId"
                name="supplierId"
                className="select mt-1 font-normal w-full border-primary-200 placeholder:text-primary-200 text-base-500 focus:border-primary-200 !ring-primary-200 !shadow-none"
                onChange={(e) => setData('supplierId', Number(e.target.value))}
                value={data.supplierId}
              >
                <option key={0} value={0} disabled>Select Supplier</option>

                {suppliers.map(supplier => (
                  <option key={supplier.id} value={supplier.id}>{supplier.supplierName}</option>
                ))}

              </select>
              <InputError message={errors.supplierId} className="mt-2" />
            </div>
          </div>

          <div className='w-full flex gap-4 justify-end pb-2'>
            <Link href={route('products.index')} >
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
