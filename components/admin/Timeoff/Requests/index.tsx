import Link from 'next/link';
import React from 'react';
import { CustomTable } from '../../../common/CustomTable';

export const MOCK_THEAD_LEAVE_TYPE = [
  {
    name: 'employee_requester',
    label: 'Nama Pengaju',
    value: '',
  },
  {
    name: 'tipe_cuti',
    label: 'Timeoff Type',
    value: '',
  },
  {
    name: 'tanggal_cuti',
    label: 'Tanggal Cuti',
    value: '',
  },
  {
    name: 'delegate_tasks',
    label: 'Delegasi Kerjaan',
    value: '',
  },
  {
    name: 'notes',
    label: 'Catatan',
    value: '',
  },
  {
    name: 'status',
    label: 'Status',
    value: '',
  },
]
export const MOCK_TBODY_LEAVE_TYPE = [
  {
    id: 1231,
    employee_requester: 'Aryandi',
    tipe_cuti: 'Cuti Nikah',
    tanggal_cuti: '22 Mei 2022',
    delegate_tasks: 'Kris',
    notes: 'Cuti 10 hari',
    status: 'approve',
  },
  {
    id: 222,
    employee_requester: 'Insan',
    tipe_cuti: 'Cuti Umroh',
    tanggal_cuti: '22 Mei 2023',
    delegate_tasks: 'Fari',
    notes: 'Cuti 9 hari',
    status: 'approve',
  },
]

export default function TimeoffTypesList() {
  return (
    <div>
      <CustomTable
        tableTitle="Timeoff List"
        tableAction={() => (
          <>
            <Link
              href={"/admin/timeoff/requests/creates"}
              className="bg-blueGray-700 active:bg-blueGray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
            >
              Request A Timeoff
            </Link>
          </>
        )}
        hasOrderNumber
        // actionDropdown,
        thead={MOCK_THEAD_LEAVE_TYPE}
        tbody={MOCK_TBODY_LEAVE_TYPE}
      />
    </div>
  );
}

