import React, { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';

import { MOCK_TIMEOFF_OPTIONS } from '../constants';
import { Dropdown } from '../../../common/Dropdown';
import { Employee } from '../../../../modules/employee/employee.interface';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/router';
import employeeService from '../../../../services/employee/employee.service';
import timeoffService from '../../../../services/timeoff/timeoff.service';

const MOCK_SET_QUOTA_BY = [
  { value: 'by_employee', label: 'By Employee' },
  { value: 'by_timeoff_type', label: 'By Timeoff Type' },
]

const MOCK_YEAR = [
  { value: '2021', label: '2021' },
  { value: '2022', label: '2022' },
]

const TimeoffQuotaForm = () => {
  const router = useRouter();
  const user = useUser();
  const supabase = useSupabaseClient();
  const [employeeList, setEmployeeLists] = useState([]);
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [types, setTypes] = useState([]);
  const [optionTimeoffType, setOptionTimeoffType] = useState('by_employee');

  const isEditSection = router.pathname.includes('quotas/edit');

  const fetchEmployeeByUserId = useCallback(async () => {
    if (!user) return;

    try {
      setIsFetching(true);
      const employeeLists = await employeeService.getByUserId(supabase, user.id); 
      const response = await employeeService.getUsersByClientId(supabase, employeeLists.client_id);
      const employee = response.map(data => ({ value: data.id, label: data.name }))
      setEmployeeLists(employee);
    } catch (e) {
      console.log(e.message);
    } finally {
      setIsFetching(false);
    }
  }, [supabase, user]);



  const fetchTimeoffTypesByClientId = useCallback(async () => {
    if (!user) return;

    try {
      setIsFetching(true);
      const employee = await employeeService.getByUserId(supabase, user.id); 
      const response: any = await timeoffService.findAllTimeoffTypeByClient(supabase, { client_id: employee.client_id });
      const typeMap = response.map(data => ({ value: data.id, label: data.label }))

      setTypes(typeMap);
    } catch (e) {
      console.log(e.message);
    } finally {
      setIsFetching(false);
    }
  }, [supabase, user]);

  useEffect(() => {
    fetchEmployeeByUserId();
    fetchTimeoffTypesByClientId();
  }, [fetchTimeoffTypesByClientId, fetchEmployeeByUserId]);

  return <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
    <div className="rounded-t mb-0 px-6 py-6 border-0">
      <div className="flex flex-wrap items-center">
        <div className="relative w-full max-w-full flex-grow flex-1">
          <h3 className="font-semibold text-base text-blueGray-700">
            Employee Quota Lists
          </h3>
        </div>
        {isEditSection ? (
          <>
            <Link
              href="/admin/timeoff/quotas"
              className="bg-red-500 active:bg-red-700 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
            >
              Cancel
            </Link>
            <Link
              href="/admin/timeoff/quotas"
              className="bg-blueGray-700 active:bg-blueGray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
            >
              Update Quota
            </Link>
          </>
        ) : (
          <>
            <Link
              href="/admin/timeoff/quotas"
              className="bg-red-500 active:bg-red-700 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
            >
              Cancel
            </Link>
            <Link
              href="/admin/timeoff/quotas"
              className="bg-blueGray-700 active:bg-blueGray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
            >
              Set Quota
            </Link>
          </>
        )}
      </div>
    </div>
    <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
      <form>
        <div className="relative w-full lg:max-w-sm px-4 mb-3">
          <Dropdown
            options={MOCK_SET_QUOTA_BY}
            value={optionTimeoffType}
            className="w-full"
            handleChange={e => setOptionTimeoffType(e.target.value)}
          />
        </div>
        {optionTimeoffType === 'by_employee' && (
          <div className="flex flex-wrap">
            <div className="w-full lg:w-12/12 px-4">
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Select Name
                </label>
                <div className="relative w-full lg:max-w-sm">
                  <Dropdown className='w-full' options={employeeList} value={null} />
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="flex flex-wrap">
          <div className="w-full lg:w-12/12 px-4">
            <div className="relative w-full mb-3">
              <label
                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                Timeoff Type
              </label>
              <div className="relative w-full lg:max-w-sm">
                <Dropdown className='w-full' options={types} value={null} />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap">
          <div className="w-full lg:w-12/12 px-4">
            <div className="relative w-full mb-3">
              <label
                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                Year
              </label>
              <div className="relative w-full lg:max-w-sm">
                <Dropdown className='w-full' options={MOCK_YEAR} value={2021} />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap">
          <div className="w-full lg:w-12/12 px-4">
            <div className="relative w-full mb-3">
              <label
                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                Number of Quota
              </label>
              <input
                type="text"
                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                defaultValue="100"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
}

export default TimeoffQuotaForm;
