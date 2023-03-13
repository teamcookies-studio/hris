import Link from 'next/link';
import React from 'react';
import { CustomTable } from '../../../common/CustomTable';

export const MOCK_THEAD_LEAVE_TYPE = [
  {
    name: 'applicant_name',
    label: 'Applicant Name',
    value: '',
  },
  {
    name: 'timeoff_type',
    label: 'Timeoff Type',
    value: '',
  },
  {
    name: 'timeoff_date',
    label: 'Timeoff Date',
    value: '',
  },
  {
    name: 'delegate_tasks',
    label: 'Delegate Tasks',
    value: '',
  },
  {
    name: 'notes',
    label: 'Notes',
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
    applicant_name: 'Aryandi',
    timeoff_type: 'Cuti Nikah',
    timeoff_date: '22 Mei 2022',
    delegate_tasks: 'Kris',
    notes: 'Cuti 10 hari',
    status: 'approve',
  },
  {
    id: 222,
    applicant_name: 'Insan',
    timeoff_type: 'Cuti Umroh',
    timeoff_date: '22 Mei 2023',
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

