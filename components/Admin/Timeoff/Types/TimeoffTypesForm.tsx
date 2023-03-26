import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

interface TimeoffTypesFormProps {
  id: string;
  type: any;
  handleUpdate?: any;
}

const TimeoffTypesForm: React.FC<TimeoffTypesFormProps> = ({ id = null, type = null, handleUpdate }) => {
  const router = useRouter();
  const handleCreate = () => {
    // Supabase goes here;
    router.push('/admin/timeoff/types');
  }

  return <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
    <div className="rounded-t bg-white mb-0 px-6 py-6">
      <div className="text-center flex justify-between">
        <h6 className="text-blueGray-700 font-bold">Timeoff Form</h6>
        <div>
          <Link
            href="/admin/timeoff/types"
            className="bg-red-700 active:bg-red-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
          >
            Cancel
          </Link>
          {/* <Link
            href="/admin/timeoff/types"
            className="bg-emerald-500 active:bg-emerald-300 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
          >
            {id ? 'Update' : 'Create'} Timeoff
          </Link> */}
          <button
            className="cursor-pointer bg-emerald-500 active:bg-emerald-300 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
            onClick={() => id ? handleUpdate?.(id) : handleCreate?.()}
          >
            {id ? 'Update' : 'Create'} Timeoff
          </button>
        </div>
      </div>
    </div>
    <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
      <form>
        <div className="flex flex-wrap">
          <div className="w-full lg:w-12/12 px-4">
            <div className="relative w-full mb-3">
              <label
                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                Timeoff Type
              </label>
              <input
                type="text"
                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                placeholder="E.g. cuti sakit, cuti hamil, cuti nikah, cuti apapun, etc."
                defaultValue={type?.label || ''}
              />
            </div>
          </div>
          <hr className="mt-6 border-b-1 border-blueGray-300" />
          <div className="w-full lg:w-12/12 px-4">
            <div className="relative w-full mb-3">
              <label
                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                Timeoff Description
              </label>
              <textarea
                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                rows={4}
                placeholder="Description."
                defaultValue={type?.description || ''}
              ></textarea>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
}

export default TimeoffTypesForm;
