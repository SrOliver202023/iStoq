import { BsBoxSeam } from 'react-icons/bs'
import { BiUserPin } from 'react-icons/bi'
import { FiLogOut } from 'react-icons/fi'
import { Link } from '@inertiajs/react';
import { useState } from 'react';
import ApplicationLogo from './ApplicationLogo';

export default function Sidebar() {
  const [modalInterrogationIsOpen, setModalInterrogationIsOpen] = useState(false)

  return (
    <div className="h-screen bg-primary-600 p-2 w-fit flex flex-col gap-10 stick z-10">
      <img className={`w-14 h-w-14`} src={'/assets/iStoq-Logo.svg'} alt="iStoq-Logo.svg" />

      <nav className='flex flex-col items-center justify-between h-full'>

        <ul className='menu-xs text-primary-100 flex flex-col gap-2'>
          <Link href={route('products')} >
            <li>
              <button data-tip="Products" className={`tooltip tooltip-secondary tooltip-right p-2.5 rounded-md justify-center flex ${route().current()?.toString().includes('products') ? 'bg-primary-400 text-primary-100 shadow' : 'text-primary-200'}`}>
                <BsBoxSeam size={20} />
              </button>
            </li>
          </Link>
          <Link href={route('suppliers.index')}>
            <li>
              <button data-tip="Suppliers" className={`tooltip tooltip-secondary tooltip-right p-2.5 rounded-md justify-center flex ${route().current()?.toString().includes('suppliers') ? 'bg-primary-400 text-primary-100 shadow' : 'text-primary-200'}`}>
                <BiUserPin size={20} />
              </button>
            </li>
          </Link>
        </ul>


        <div className='flex flex-col items-center'>
          <ul className='menu-xs text-primary-100 flex flex-col items-center gap-3 border-b border-primary-500'>

            <Link href={route('profile.edit')}>
              <button data-tip="Profile" className={`tooltip tooltip-secondary tooltip-right p-2 w-10 h-10 rounded text-xs ${route().current('profile.edit') ? 'bg-primary-400' : 'bg-cyan-600'}`}>
                EM
              </button>
            </Link>

            <Link data-tip="Logout" method="post" href={route('logout')} as="button" className='tooltip tooltip-secondary tooltip-right p-2.5 rounded-md text-primary-200 justify-center flex'>
              <FiLogOut size={20} />
            </Link>

          </ul>

          <dialog id="my_modal_2" className="modal" open={modalInterrogationIsOpen} onBlur={() => setModalInterrogationIsOpen(false)}>
            <form method="dialog" className="modal-box">
              <h3 className="font-bold text-lg">Hello!</h3>
              <p className="py-4">Press ESC key or click outside to close</p>
            </form>
            <form method="dialog" className="modal-backdrop bg-gray-900 bg-opacity-20">
              <button onClick={() => {}}></button>
            </form>
          </dialog>

          <button data-tip="Informations" className='tooltip tooltip-secondary tooltip-right p-2.5 rounded text-primary-200 text-xl cursor-pointer' onClick={() => setModalInterrogationIsOpen(true)} disabled >
            ?
          </button>
        </div>

      </nav>
    </div>
  )
}