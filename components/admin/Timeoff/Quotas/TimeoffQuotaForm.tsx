import React from 'react';
import { MOCK_CUTI_OPTIONS } from '../constants';
import { Dropdown } from '../../../common/Dropdown';
import Link from 'next/link';

const MOCK_SET_QUOTA_BY = [
  { value: 'by_employee', label: 'By Employee' },
  { value: 'by_tipe_cuti', label: 'By Tipe Cuti' },
]

const MOCK_NAMA_EMPLOYEE = [
  { value: 1, label: 'Muhammad Aryandi' },
  { value: 2, label: 'Mas Insan' },
  { value: 3, label: 'Mas Fari' },
  { value: 4, label: 'Mas Kris' },
  { value: 5, label: 'Mba Gema' },
]

const MOCK_YEAR = [
  { value: '2021', label: '2021' },
  { value: '2022', label: '2022' },
]

const TimeoffQuotaForm = () => {
  const [optionTipeCuti, setOptionTipeCuti] = React.useState('byEmployee');

  return <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
    <div className="rounded-t mb-0 px-6 py-6 border-0">
      <div className="flex flex-wrap items-center">
        <div className="relative w-full max-w-full flex-grow flex-1">
          <h3 className="font-semibold text-base text-blueGray-700">
            List Kuota Pegawai
          </h3>
        </div>
        {false ? (
          <>
            <Link
              href="/admin/timeoff/quotas"
              className="bg-red-500 active:bg-red-700 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
            >
              Cancel
            </Link>
            <Link
              href="/admin/timeoff/quotas/updates/1"
              className="bg-blueGray-700 active:bg-blueGray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
            >
              Update Kuota
            </Link>
          </>
        ) : (
          <Link
            href="/admin/timeoff/quotas"
            className="bg-blueGray-700 active:bg-blueGray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
          >
            Set Kuota
          </Link>
        )}
      </div>
    </div>
    <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
      <form>
        <div className="relative w-full lg:max-w-sm px-4 mb-3">
          <Dropdown
            options={MOCK_SET_QUOTA_BY}
            value={`by_employee`}
            className="w-full"
            handleChange={e => setOptionTipeCuti(e.target.value)}
          />

        </div>
        {optionTipeCuti === 'byEmployee' && (
          <div className="flex flex-wrap">
            <div className="w-full lg:w-12/12 px-4">
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Select Nama
                </label>
                <div className="relative w-full lg:max-w-sm">
                  <Dropdown className='w-full' options={MOCK_NAMA_EMPLOYEE} value={1} />
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="flex flex-wrap">
          <div className="w-full lg:w-12/12 px-4">
            <div className="relative w-full mb-3">
              <label
                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                Tipe cuti
              </label>
              <div className="relative w-full lg:max-w-sm">
                <Dropdown className='w-full' options={MOCK_CUTI_OPTIONS} value={`cuti_sakit`} />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap">
          <div className="w-full lg:w-12/12 px-4">
            <div className="relative w-full mb-3">
              <label
                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                Year
              </label>
              <div className="relative w-full lg:max-w-sm">
                <Dropdown className='w-full' options={MOCK_YEAR} value={2021} />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap">
          <div className="w-full lg:w-12/12 px-4">
            <div className="relative w-full mb-3">
              <label
                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                Jumlah Kuota
              </label>
              <input
                type="text"
                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                defaultValue="100"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
}

export default TimeoffQuotaForm;
