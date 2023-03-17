import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import Link from 'next/link';
import React, { useCallback, useEffect, useState } from 'react';
import employeeService from '../../../../services/employee/employee.service';
import timeoffService from '../../../../services/timeoff/timeoff.service';
import { CustomTable } from '../../../common/CustomTable';

const headerLabels = [
  {
    name: 'label',
    label: 'Nama Jenis Cuti',
  },
]

export default function TimeoffList() {
  const user = useUser();
  const supabase = useSupabaseClient();
  const [types, setTypes] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  const fetchTimeoffTypesByClientId = useCallback(async () => {
    if (!user) return;

    try {
      setIsFetching(true);
      const employee = await employeeService.getByUserId(supabase, user.id); 
      const response = await timeoffService.findAllTimeoffTypeByClient(supabase, { client_id: employee.client_id });

      setTypes(response);
    } catch (e) {
      console.log(e.message);
    } finally {
      setIsFetching(false);
    }
  }, [supabase, user]);

  useEffect(() => {
    fetchTimeoffTypesByClientId();
  }, [fetchTimeoffTypesByClientId]);

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
        // actionDropdown,
        thead={headerLabels}
        tbody={types || []}
      />
    </div>
  );
}
