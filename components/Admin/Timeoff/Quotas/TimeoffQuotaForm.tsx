import React from 'react';
import { useCallback, useEffect, useState } from "react";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import Link from "next/link";
import moment from "moment";
import { Dropdown } from "../../../common/Dropdown";
import employeeService from "../../../../services/employee/employee.service";
import timeoffService from "../../../../services/timeoff/timeoff.service";

const quotaTypes = [
  { value: 'by_employee', label: 'By Employee' },
  { value: 'by_timeoff_type', label: 'By Timeoff Type' },
];

export default function TimeoffQuotaForm() {
  const user = useUser();
  const supabase = useSupabaseClient();
  const [requester, setRequester] = useState(null);
  const [types, setTypes] = useState(null);
  const [employees, setEmployees] = useState(null);
  
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [selectedQuota, setSelectedQuota] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);

  const [isFetching, setIsFetching] = useState(true);
  const [optionTimeoffType, setOptionTimeoffType] = React.useState('byEmployee');

  const fetchRequiredData = useCallback(async () => {
    if (!user) return;

    try {
      setIsFetching(true);
      const employee = await employeeService.getByUserId(supabase, user.id);
      const timeoffTypesResponse = await timeoffService.findAllTimeoffTypeByClient(supabase, { client_id: employee.client_id });
      const employeesResponse = await employeeService.findAllByClientId(supabase, employee.client_id);

      setRequester(employee);
      setTypes(timeoffTypesResponse);
      setEmployees(employeesResponse);
    } catch (e) {
      console.log(e.message);
    } finally {
      setIsFetching(false);
    }
  }, [supabase, user]);

  useEffect(() => {
    fetchRequiredData();
  }, [fetchRequiredData]);

  const submit = useCallback(async () => {
    if (optionTimeoffType === 'by_employee') {
      await timeoffService.createQuotaByEmployee(supabase, {
        client_id: requester.client_id,
        timeoff_type_id: selectedType,
        employee_id: selectedEmployee,
        quota: selectedQuota,
        year: selectedYear,
      });
    }
    if (optionTimeoffType === 'by_timeoff_type') {
      await timeoffService.createQuotaByType(supabase, {
        client_id: requester.client_id,
        timeoff_type_id: selectedType,
        quota: selectedQuota,
        year: selectedYear,
      });
    }
  }, [supabase, user]);


  const generateYears = () => {
    return Array.from(Array(10).keys()).map((i) => (moment().year() + i))
  }

  return (
    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
      <div className="rounded-t mb-0 px-6 py-6 border-0">
        <div className="flex flex-wrap items-center">
          <div className="relative w-full max-w-full flex-grow flex-1">
            <h3 className="font-semibold text-base text-blueGray-700">
              Employee Quota Lists
            </h3>
          </div>
          {false ? (
            <>
              <Link
                href="/admin/timeoff/quotas"
                className="bg-red-500 active:bg-red-700 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
              >
                Cancel
              </Link>
              <Link
                href="/admin/timeoff/quotas/updates/1"
                className="bg-blueGray-700 active:bg-blueGray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
              >
                Update Quota
              </Link>
            </>
          ) : (
            <Link
              href="/admin/timeoff/quotas"
              className="bg-blueGray-700 active:bg-blueGray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
            >
              Set Quota
            </Link>
          )}
        </div>
      </div>
      <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
        <form>
          <div className="relative w-full lg:max-w-sm px-4 mb-3">
            <Dropdown
              options={quotaTypes}
              value={`by_employee`}
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
                    <Dropdown className='w-full' options={employees?.map((val) => ({value: val.id, label: val.name}))} value={1} handleChange={(val) => {setSelectedEmployee(val)}} />
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
                  <Dropdown className='w-full' options={types?.map((val) => ({value: val.id, label: val.label}))} value={1} handleChange={(val) => {setSelectedType(val)}} />
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
                  <Dropdown className='w-full' options={generateYears()} value={moment().year()} handleChange={(val) => {setSelectedYear(val.target.value)}}/>
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
                  onChange={(val) => setSelectedQuota(val.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <button
              className="bg-blueGray-700 active:bg-blueGray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
              type="button"
              onClick={submit}   
              >
              Simpan
            </button>
          </div>
        </div>
        </form>
      </div>
    </div>
  );
}
