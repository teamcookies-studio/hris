import Link from 'next/link';
import React from 'react';
import { CustomTable } from '../../../common/CustomTable';
import { Dropdown } from '../../../common/Dropdown';
import { SearchInput } from '../../../common/SearchInput';


const MOCK_FILTER = [
  { value: 'year', label: 'Filter by Year' },
  { value: 'timeoff_type', label: 'Filter by Timeoff Type' },
]

const MOCK_THEAD_QUOTA_MGM = [
  {
    name: 'employee_name',
    label: 'Employee Name',
    value: '',
  },
  {
    name: 'year',
    label: 'Year',
    value: '',
  },
  {
    name: 'timeoff_type',
    label: 'Timeoff Type',
    value: '',
  },
  {
    name: 'quota',
    label: 'Quota',
    value: '',
  },
]
const MOCK_TBODY_QUOTA_MGM = [
  {
    id: 1,
    tahun: 2019,
    employee_name: 'Muhammad Aryandi',
    timeoff_type: 'Cuti Nikah',
    quota: 10,
  },
  {
    id: 2,
    tahun: 2020,
    employee_name: 'Mas Andrian',
    timeoff_type: 'Cuti Umroh',
    quota: 6,
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
