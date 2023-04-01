import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import Link from 'next/link';
import React, { useCallback, useEffect, useState } from 'react';
import { TimeoffStatus } from '../../../../modules/timeoff-request/timeoff-request.interface';
import employeeService from '../../../../services/employee/employee.service';
import timeoffService from '../../../../services/timeoff/timeoff.service';
import { CustomTable } from '../../../common/CustomTable';

const headerLabels = [
  {
    name: 'employee_name',
    label: 'Applicant Name',
    value: '',
  },
  {
    name: 'type',
    label: 'Timeoff Type',
    value: '',
  },
  {
    name: 'start_date',
    label: 'Start Date',
    value: '',
  },
  {
    name: 'end_date',
    label: 'End Date',
    value: '',
  },
  {
    name: 'delegate',
    label: 'Delegate Tasks',
    value: '',
  },
  {
    name: 'reviewer',
    label: 'Reviewer',
    value: '',
  },
  {
    name: 'status',
    label: 'Status',
    value: '',
  },
]

export default function TimeoffTypesList() {
  const user = useUser();
  const supabase = useSupabaseClient();
  const [requests, setRequests] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  const fetchTimeoffQuotasByClientId = useCallback(async () => {
    if (!user) return;

    try {
      setIsFetching(true);
      const employee = await employeeService.getByUserId(supabase, user.id); 
      const response = await timeoffService.findAllRequestsByClient(supabase, {
        client_id: employee.client_id,
        status: TimeoffStatus.PENDING,
      });

      console.log({response})

      setRequests(response);
    } catch (e) {
      console.log(e.message);
    } finally {
      setIsFetching(false);
    }
  }, [supabase, user]);

  useEffect(() => {
    fetchTimeoffQuotasByClientId();
  }, [fetchTimeoffQuotasByClientId]);

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
        thead={headerLabels}
        tbody={requests || []}
      />
    </div>
  );
}

