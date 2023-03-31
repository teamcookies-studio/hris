import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import employeeService from '../../../../services/employee/employee.service';
import timeoffService from '../../../../services/timeoff/timeoff.service';
import { CustomTable } from '../../../common/CustomTable';
import { Modals } from '../../../Modals';

const headerLabels = [
  {
    name: 'label',
    label: 'Nama Jenis Cuti',
  },
]

export default function TimeoffList() {
  const user = useUser();
  const router = useRouter();
  const supabase = useSupabaseClient();
  const [types, setTypes] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const [selectedDeleteData, setSelectedDeleteData] = useState(null)
  const fetchTimeoffTypesByClientId = useCallback(async () => {
    if (!user) return;

    try {
      setIsFetching(true);
      const employee = await employeeService.getByUserId(supabase, user.id); 
      const response: any = await timeoffService.findAllTimeoffTypeByClient(supabase, { client_id: employee.client_id });

      setTypes(response.map(data => ({ user_id: data?.id, ...data})));
    } catch (e) {
      console.log(e.message);
    } finally {
      setIsFetching(false);
    }
  }, [supabase, user]);

  useEffect(() => {
    fetchTimeoffTypesByClientId();
  }, [fetchTimeoffTypesByClientId]);

  if (!types) return null;
  const handleClose = () => {
    setSelectedDeleteData(null)
  }
  const handleDelete = () => {
    // supabase works here
    setSelectedDeleteData(null)
  }

  return (
    <div>
      <CustomTable
        tableTitle="Timeoff Types"
        tableAction={() => (
          <>
            <Link
              href={"/admin/timeoff/types/creates"}
              className="bg-blueGray-700 active:bg-blueGray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
            >
              Add Timeoff Type
            </Link>
          </>
        )}
        hasOrderNumber
        showViewOptions={false}
        // actionDropdown,
        thead={headerLabels}
        tbody={types || []}
        handleEdit={id => router.push(`/admin/timeoff/types/${id}`)}
        handleDelete={id => setSelectedDeleteData(id)}
      />
      {selectedDeleteData && (
        <Modals
          title="Delete Modals"
          description="Are You Sure To Delete This ?"
          handleClose={handleClose}
          handleDelete={handleDelete}
        />
      )}
    </div>
  );
}
