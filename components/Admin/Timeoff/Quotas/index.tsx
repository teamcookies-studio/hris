import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import Link from 'next/link';
import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import employeeService from '../../../../services/employee/employee.service';
import timeoffService from '../../../../services/timeoff/timeoff.service';
import { CustomTable } from '../../../common/CustomTable';
import { Dropdown } from '../../../common/Dropdown';
import { SearchInput } from '../../../common/SearchInput';
import { Modals } from '../../../Modals';
import Loading from '../../../common/Loading/Loading';


const MOCK_FILTER = [
  { value: 'year', label: 'Filter by Year' },
  { value: 'timeoff_type', label: 'Filter by Timeoff Type' },
]

const headerLabels = [
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
    name: 'type',
    label: 'Timeoff Type',
    value: '',
  },
  {
    name: 'quota',
    label: 'Quota',
    value: '',
  },
];

export default function TimeoffQuotaList() {
  const user = useUser();
  const router = useRouter();
  const supabase = useSupabaseClient();
  const [quotas, setQuotas] = useState([]);
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [selectedDeleteData, setSelectedDeleteData] = useState(null)

  const fetchTimeoffQuotasByClientId = useCallback(async () => {
    if (!user) return;

    try {
      setIsFetching(true);
      const employee = await employeeService.getByUserId(supabase, user.id); 
      const response = await timeoffService.findAllQuotaByClientWithEmployee(supabase, { client_id: employee.client_id });

      setQuotas(response.map(data => ({ user_id: data.id, ...data })));
    } catch (e) {
      console.log(e.message);
    } finally {
      setIsFetching(false);
    }
  }, [supabase, user]);

  useEffect(() => {
    fetchTimeoffQuotasByClientId();
  }, [fetchTimeoffQuotasByClientId]);

  const handleClose = () => {
    setSelectedDeleteData(null)
  }

  const handleDelete = async () => {
    try {
      await timeoffService.removeTimeoff(supabase, selectedDeleteData); 
    } catch (error) {
      console.log(error)
    } finally {
      setSelectedDeleteData(null)
    }
  }

  if (isFetching) {
    return <Loading isLoading={isFetching} />
  }

  return (
    <>
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
        showViewOptions={false}
        handleEdit={id => router.push(`/admin/timeoff/quotas/edit/${id}`)}
        handleDelete={id => setSelectedDeleteData(id)}
        thead={headerLabels}
        tbody={quotas || []}
      />
      {selectedDeleteData && (
        <Modals
          title="Delete Modals"
          description="Are You Sure To Delete This ?"
          handleClose={handleClose}
          handleDelete={handleDelete}
        />
      )}
    </>
  );
}
