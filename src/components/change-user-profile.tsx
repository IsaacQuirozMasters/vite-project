import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useRef } from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import axios from 'axios';

interface FileInput {
  picture: FileList;
}

const FILE_URL = '/api/files/upload';

export function ChangeUserProfile({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const cancelButtonRef = useRef<HTMLButtonElement | null>(null)
  const { register, handleSubmit } = useForm<FileInput>();

  const onSubmit: SubmitHandler<FileInput> = async (data) => {
    const formData = new FormData()
    formData.append('file', data.picture[0])
    try {
      await axios.post(FILE_URL,
        formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      );
    } catch (err) {
      console.log(err);
    }
    console.log(formData)
  }

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" static className="fixed z-10 inset-0 overflow-y-auto" initialFocus={cancelButtonRef} open={isOpen} onClose={onClose}>
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

          <Dialog.Title as='h3' className='text-lg leading-6 font-medium text-gray-900'>Search File</Dialog.Title>

          <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">File</label>
                <input {...register("picture")} type="file" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm" onClick={onClose}>
                  Accept
                </button>
                <button type="button" ref={cancelButtonRef} className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" onClick={onClose}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}