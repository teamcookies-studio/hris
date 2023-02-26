import Link from 'next/link';
import React from 'react';
import { CustomTable } from '../../../common/CustomTable';
import { Dropdown } from '../../../common/Dropdown';
import { SearchInput } from '../../../common/SearchInput';


const MOCK_FILTER = [
  { value: 'tahun', label: 'Filter by Tahun' },
  { value: 'tipe_cuti', label: 'Filter by Tipe Cuti' },
]

const MOCK_THEAD_QUOTA_MGM = [
  {
    name: 'nama_employee',
    label: 'Nama Employee',
    value: '',
  },
  {
    name: 'tahun',
    label: 'Tahun',
    value: '',
  },
  {
    name: 'tipe_cuti',
    label: 'Tipe Cuti',
    value: '',
  },
  {
    name: 'kuota',
    label: 'Kuota',
    value: '',
  },
]
const MOCK_TBODY_QUOTA_MGM = [
  {
    id: 1,
    tahun: 2019,
    nama_employee: 'Muhammad Aryandi',
    tipe_cuti: 'Cuti Nikah',
    kuota: 10,
  },
  {
    id: 2,
    tahun: 2020,
    nama_employee: 'Mas Andrian',
    tipe_cuti: 'Cuti Umroh',
    kuota: 6,
  },
]

export default function TimeoffQuotaList() {
  return (
    <div>
      <CustomTable
        tableTitle="Timeoff Quota"
        tableAction={() => (
          <>
            <SearchInput />
            <div className='mr-3'>
              <Dropdown options={MOCK_FILTER} value='' />
            </div>
            <Link
              href="/admin/timeoff/quotas/creates"
              className="flex items-center bg-blueGray-700 active:bg-blueGray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
            >
              Set Quota
            </Link>
          </>
        )}
        hasOrderNumber
        // actionDropdown,
        thead={MOCK_THEAD_QUOTA_MGM}
        tbody={MOCK_TBODY_QUOTA_MGM}
      />
    </div>
  );
}
