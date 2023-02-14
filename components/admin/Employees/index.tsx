import React from 'react';
import { useRouter } from 'next/router';

import { CustomTable } from '../../common/CustomTable';
import { FormProfile } from '../../common/FormProfile';

// Components
// import { MOCK_TBODY, MOCK_THEAD } from '../constants';

const MOCK_THEAD_LIST_PEGAWAI = [
  {
    name: 'employee_name',
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
    name: 'kuota_cuti',
    label: 'Kuota Cuti',
    value: '',
  },
]
const MOCK_TBODY_LIST_PEGAWAI = [
  {
    id: 1231,
    employee_name: 'Muhammad Aryandi',
    tahun: 2022,
    tipe_cuti: 'Cuti Tahunan',
    kuota_cuti: 2,
  },
  {
    id: 2,
    employee_name: 'Insan',
    tahun: 2022,
    tipe_cuti: 'Cuti Tahunan',
    kuota_cuti: 4,
  },
]


export default function ListEmployees() {
  const router = useRouter();

  const [isEditOpen, setEditOpen] = React.useState(false);
  return (
    <div>
      {!isEditOpen ? (
        <CustomTable
          tableTitle="List Pegawai"
          tableAction={() => (
            <>
              <button
                className="bg-blueGray-700 active:bg-blueGray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setEditOpen(prev => !prev)}
              >
                Tambah Pegawai
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
      ) : (
        <FormProfile handleUpdate={() => setEditOpen(prev => !prev)} />
      )}
    </div>
  );
}
