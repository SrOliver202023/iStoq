import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, } from '@inertiajs/react';
import { PageProps, SuppliersPaginationProps } from '@/types';
import { BiUserPin } from 'react-icons/bi'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import { FiEdit, FiTrash } from 'react-icons/fi'
import { BiSitemap } from 'react-icons/bi'
import { useState } from 'react';

export default function Index({ auth, suppliers }: PageProps & SuppliersPaginationProps) {
  const [trashModalIsOpen, setTransModalIsOpen] = useState(false)
  const optionsLimit = [5, 10, 25, 50]

  function handleTrashModal(idSupplier: number) {
    router.delete(route("suppliers.destroy", idSupplier))
    setTransModalIsOpen(false)
  }

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Suppliers</h2>}
    >
      <Head title="Suppliers" />

      <div className='w-full p-4 gap-4 flex flex-col'>

        <header className='flex w-full items-center justify-between'>
          <div className='flex items-center gap-2'>
            <span className='text-primary-500'>
              <BiUserPin size={36} />
            </span>
            <h1 className='font-semibold text-2xl text-base-600'>Suppliers Registered</h1>
            <span className='text-base-300'>
              ({suppliers.total})
            </span>
          </div>

          <div>
            <Link href={route('suppliers.create')} >
              <button className='text-success'>
                <AiOutlinePlusCircle size={28} />
              </button>
            </Link>

          </div>
        </header>

        <section>
          <div>
            <div className="overflow-x-auto h-[79vh] shadow-[0_0_10px_0_rgba(0,0,0,0.10)] rounded-lg">
              <table className="table table-pin-rows">
                <thead className='!bg-base-100'>
                  <tr>
                    <th className='rounded-tl-lg text-base-300 font-medium'>ID</th>
                    <th className='text-base-300 font-medium'>Supplier</th>
                    <th className='text-base-300 font-medium'>E-mail</th>
                    <th className='text-base-300 font-medium'>Phone</th>
                    <th className='text-base-300 font-medium'>Cnpj</th>
                    <th className='text-base-300 font-medium'>Address</th>
                    <th className='text-base-300 font-medium rounded-tr-lg min-w-[120px]'>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {suppliers.data.map(supplier => (
                    <tr key={supplier.id} className='hover'>
                      <th className='font-normal text-base-500'>{supplier.id}</th>
                      <th className='font-normal text-base-500'>{supplier.nameSupplier}</th>
                      <th className='font-normal text-base-500'>{supplier.email}</th>
                      <th className='font-normal text-base-500'>{supplier.phone}</th>
                      <th className='font-normal text-base-500'>{supplier.cnpj}</th>
                      <th className='font-normal text-base-500'>{supplier.address}</th>
                      <th className='font-normal text-base-500 flex items-center gap-2'>

                        <button>
                          <BiSitemap size={20} />
                        </button>

                        <Link href={`suppliers/${supplier.id}`}>
                          <button>
                            <FiEdit size={20} />
                          </button>
                        </Link>

                        <button onClick={() => setTransModalIsOpen(true)}>
                          <FiTrash size={20} />
                        </button>

                        <dialog id="my_modal_2" className="modal" open={trashModalIsOpen}>
                          <form method="dialog" className="modal-box shadow-sm rounded-lg max-w-sm">
                            <h3 className="font-bold text-lg flex items-center gap-2">
                              <span className='text-error'><FiTrash size={28} /></span>
                              Supplier exclusion
                            </h3>
                            <p className="py-4">
                              All data related to that supplier will be lost, do you really want to continue?
                            </p>
                            <div className="flex w-full gap-2 justify-end">
                              <button
                                className='btn btn-sm btn-outline border-none'
                                onClick={() => setTransModalIsOpen(false)}>Cancel</button>
                              <button
                                className='btn btn-sm btn-error btn-outline'
                                onClick={() => handleTrashModal(supplier.id)}>Confirm</button>
                            </div>
                          </form>
                          <form method="dialog" className="modal-backdrop bg-gray-900 bg-opacity-10">
                            <button onClick={() => setTransModalIsOpen(false)}></button>
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

                <select defaultValue={suppliers.per_page} className="select select-sm text-sm select-primary w-fit max-w-xs" onChange={(e) => router.get(`suppliers?page=${suppliers.current_page}&limit=${e.target.value}`)}>
                  {optionsLimit.map(item => (
                    <option key={item} value={item} disabled={item > suppliers.total}>{item}</option>
                  ))}
                </select>

                <span className='text-sm'>
                  Of <span className='font-medium'>{suppliers.total}</span> records found
                </span>
              </div>

              <div className='flex items-center gap-4'>

                <Link href={suppliers.prev_page_url}>
                  <button disabled={!suppliers.prev_page_url}
                    className='btn btn-sm btn-circle hover:bg-primary-400 hover:text-white text-2xl  flex justify-center items-center text-primary-400 rounded-full border-2 border-primary-100'>
                    {`<`}
                  </button>
                </Link>

                <div className='flex gap-1 text-primary-400'>
                  <span className='font-semibold'>{suppliers.current_page}</span>
                  <span>Of</span>
                  <span className='font-semibold'>{suppliers.last_page}</span>
                </div>
                <Link href={suppliers.next_page_url}>
                  <button
                    disabled={!suppliers.next_page_url}
                    className='btn btn-sm btn-circle hover:bg-primary-400 hover:text-white text-2xl  flex justify-center items-center text-primary-400 rounded-full border-2 border-primary-100'>
                    {`>`}
                  </button>
                </Link>
              </div>


            </div>
          </div>

        </section>
      </div>

    </AuthenticatedLayout>
  );
}
