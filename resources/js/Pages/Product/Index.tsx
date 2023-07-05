import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, } from '@inertiajs/react';
import { PageProps, ProductsPaginationProps } from '@/types';
import { BiUserPin } from 'react-icons/bi'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import { FiEdit, FiTrash } from 'react-icons/fi'
import { useState } from 'react';

export default function Index({ auth, products }: PageProps & ProductsPaginationProps) {
  const [trashModalIsOpen, setTranshModalIsOpen] = useState(false)
  const optionsLimit = [5, 10, 25, 50]

  function handleTrashModal(idSupplier: number) {
    router.delete(route("products.destroy", idSupplier))
    setTranshModalIsOpen(false)
  }

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Products</h2>}
    >
      <Head title="Products" />

      <div className='w-full p-4 gap-4 flex flex-col'>

        <header className='flex w-full items-center justify-between'>
          <div className='flex items-center gap-2'>
            <span className='text-primary-500'>
              <BiUserPin size={36} />
            </span>
            <h1 className='font-semibold text-2xl text-base-600'>Products Registered</h1>
            <span className='text-base-300'>
              ({products.total})
            </span>
          </div>

          <div>
            <Link href={route('products.create')} >
              <button className='text-success'>
                <AiOutlinePlusCircle size={28} />
              </button>
            </Link>

          </div>
        </header>
        <section>
          <div>
            <div className="overflow-x-auto h-[75vh] shadow-[0_0_10px_0_rgba(0,0,0,0.10)] rounded-lg">
              <table className="table table-pin-rows text-center">
                <thead className='!bg-base-100'>
                  <tr>
                    <th className='rounded-tl-lg text-base-300 font-medium'>ID</th>
                    <th className='text-base-300 font-medium'>Product</th>
                    <th className='text-base-300 font-medium'>Image</th>
                    <th className='text-base-300 font-medium'>Code</th>
                    <th className='text-base-300 font-medium'>Quantity</th>
                    <th className='text-base-300 font-medium'>Price</th>
                    <th className='text-base-300 font-medium'>Supplier</th>
                    <th className='text-base-300 font-medium rounded-tr-lg min-w-[120px]'>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.data.map(product => (
                    <tr key={product.id} className='hover'>
                      <th className='font-normal text-base-500'>{product.id}</th>
                      <th className='font-normal text-base-500'>{product.productName}</th>
                      <th className='font-normal text-base-500 flex justify-center'>
                        <img className='w-10 h-10' src={product.imageUrl ? `storage/${product.imageUrl}` : '/NoImage.png'} alt={`${product.id}-${product.imageUrl}`} />
                      </th>
                      <th className='font-normal text-base-500'>{product.externalCode}</th>
                      <th className='font-normal text-base-500'>{product.quantity}</th>
                      <th className='font-normal text-base-500'>{product.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</th>
                      <th className='font-normal text-base-500'>{`${product.supplierId}-${product.supplierName}`}</th>
                      <th className='font-normal text-base-500'>
                        <button className='mr-1' onClick={() => router.get(`products/${product.id}`)}>
                          <FiEdit size={20} />
                        </button>

                        <button onClick={() => setTranshModalIsOpen(true)}>
                          <FiTrash size={20} />
                        </button>

                        <dialog id="my_modal_2" className="modal" open={trashModalIsOpen}>
                          <form method="dialog" className="modal-box shadow-sm rounded-lg max-w-sm">
                            <h3 className="font-bold text-lg flex items-center gap-2">
                              <span className='text-error'><FiTrash size={28} /></span>
                              Product exclusion
                            </h3>
                            <p className="py-4 text-left">
                              Do you really want to delete the product? it will not be possible to recover it.
                            </p>
                            <div className="flex w-full gap-2 justify-end">
                              <button
                                className='btn btn-sm btn-outline border-none'
                                onClick={() => setTranshModalIsOpen(false)}>Cancel</button>
                              <button
                                className='btn btn-sm btn-error btn-outline'
                                onClick={() => handleTrashModal(product.id)}>Confirm</button>
                            </div>
                          </form>
                          <form method="dialog" className="modal-backdrop bg-gray-900 bg-opacity-50">
                            <button onClick={() => setTranshModalIsOpen(false)}></button>
                          </form>
                        </dialog>
                      </th>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className='p-2 flex justify-between items-center'>
              <div className='flex items-center gap-2'>

                <select defaultValue={products.per_page} className="select select-sm text-sm select-primary w-fit max-w-xs" onChange={(e) => router.get(`products?page=${products.current_page}&limit=${e.target.value}`)}>
                  {optionsLimit.map(item => (
                    <option key={item} value={item} disabled={item > products.total}>{item}</option>
                  ))}
                </select>

                <span className='text-sm'>
                  Of <span className='font-medium'>{products.total}</span> records found
                </span>
              </div>

              <div className='flex items-center gap-4'>

                <button
                  onClick={() => router.get(products.prev_page_url)}
                  disabled={!products.prev_page_url}
                  className='btn btn-sm btn-circle hover:bg-primary-400 hover:text-white text-2xl  flex justify-center items-center text-primary-400 rounded-full border-2 border-primary-100'>
                  {`<`}
                </button>

                <div className='flex gap-1 text-primary-400'>
                  <span className='font-semibold'>{products.current_page}</span>
                  <span>Of</span>
                  <span className='font-semibold'>{products.last_page}</span>
                </div>

                <button
                  onClick={() => router.get(products.next_page_url)}
                  disabled={!products.next_page_url}
                  className='btn btn-sm btn-circle hover:bg-primary-400 hover:text-white text-2xl  flex justify-center items-center text-primary-400 rounded-full border-2 border-primary-100'>
                  {`>`}
                </button>

              </div>


            </div>
          </div>

        </section>

      </div>

    </AuthenticatedLayout>
  );
}
