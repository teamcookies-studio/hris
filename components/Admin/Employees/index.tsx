import React from 'react';
import { useRouter } from 'next/router';

import { CustomTable } from '../../common/CustomTable';
// import { FormProfile } from '../../Common/FormProfile';
import InviteEmployeeModal from './InviteEmployeeModal';
import { ADD_EMPLOYEE, EMPLOYEE_LISTS, EMPLOYEE_NAME, INVITE_EMPLOYEE, TIMEOFF_QUOTA, TIMEOFF_TYPE, YEAR } from '../../../utils/constants';

const MOCK_THEAD_LIST_PEGAWAI = [
  {
    name: 'employee_name',
    label: EMPLOYEE_NAME,
    value: '',
  },
  {
    name: 'year',
    label: YEAR,
    value: '',
  },
  {
    name: 'timeoff_type',
    label: TIMEOFF_TYPE,
    value: '',
  },
  {
    name: 'timeoff_quota',
    label: TIMEOFF_QUOTA,
    value: '',
  },
]
const MOCK_TBODY_LIST_PEGAWAI = [
  {
    id: 1231,
    employee_name: 'Muhammad Aryandi',
    year: 2022,
    timeoff_type: 'Cuti Tahunan',
    timeoff_quota: 2,
  },
  {
    id: 2,
    employee_name: 'Insan',
    year: 2022,
    timeoff_type: 'Cuti Tahunan',
    timeoff_quota: 4,
  },
]


export default function ListEmployees() {
  const router = useRouter();

  const [isEditOpen, setEditOpen] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);

  return (
    <div>
      <InviteEmployeeModal showModal={showModal} setShowModal={setShowModal} />
      {!isEditOpen ? (
        <CustomTable
          tableTitle={EMPLOYEE_LISTS}
          tableAction={() => (
            <>
              <button
                className="bg-blueGray-700 active:bg-blueGray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setEditOpen(prev => !prev)}
              >
                {ADD_EMPLOYEE}
              </button>
              <button
                className="bg-blueGray-700 active:bg-blueGray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setShowModal(prev => !prev)}
              >
                {INVITE_EMPLOYEE}
              </button>
            </>
          )}
          hasOrderNumber
          // actionDropdown,
          thead={MOCK_THEAD_LIST_PEGAWAI}
          tbody={MOCK_TBODY_LIST_PEGAWAI}
          handleView={() => router.push('profile')}
          handleEdit={() => setEditOpen(prev => !prev)}
          handleDelete={() => {}}
        />
      ) : null
      // (
      // <FormProfile handleUpdate={() => setEditOpen(prev => !prev)} />
      // )
      }
    </div>
  );
}
