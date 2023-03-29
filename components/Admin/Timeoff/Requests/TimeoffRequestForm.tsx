import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import employeeService from "../../../../services/employee/employee.service";
import timeoffService from "../../../../services/timeoff/timeoff.service";
import { Dropdown } from "../../../common/Dropdown";

const SubmissionForm = () => {
  const user = useUser();
  const router = useRouter();
  const supabase = useSupabaseClient();
  const [types, setTypes] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const fetchTimeoffTypesByClientId = useCallback(async () => {
    if (!user) return;

    try {
      setIsFetching(true);
      const employee = await employeeService.getByUserId(supabase, user.id); 
      const response: any = await timeoffService.findAllTimeoffTypeByClient(supabase, { client_id: employee.client_id });

      setTypes(response.map(data => ({ value: data?.id, label: data.label })));
    } catch (e) {
      console.log(e.message);
    } finally {
      setIsFetching(false);
    }
  }, [supabase, user]);

  useEffect(() => {
    fetchTimeoffTypesByClientId();
  }, [fetchTimeoffTypesByClientId]);
  return <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
    <div className="rounded-t bg-white mb-0 px-6 py-6">
      <div className="text-center flex justify-between">
        <h6 className="text-blueGray-700 font-bold">Submission Form</h6>
        <div>
          <Link
            href="/admin/timeoff/types"
            className="bg-red-700 active:bg-red-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
          >
            Cancel
          </Link>
          <Link
            href="/admin/timeoff/types"
            className="bg-emerald-500 active:bg-emerald-300 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
          >
            Update Timeoff
          </Link>
        </div>
      </div>
    </div>
    <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
      <form>
        <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
          Timeoff Types
        </h6>
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
                <Dropdown className="w-full" options={types} value={null} handleChange={() => { }} />
              </div>
            </div>
          </div>
        </div>

        <hr className="mt-6 border-b-1 border-blueGray-300" />
        <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
          Timeoff Date
        </h6>
        <div className="flex flex-wrap">
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative w-full mb-3">
              <label
                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                Start
              </label>
              <input
                type="date"
                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              />
            </div>
          </div>
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative w-full mb-3">
              <label
                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                End
              </label>
              <input
                type="date"
                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              />
            </div>
          </div>
        </div>

        <hr className="mt-6 border-b-1 border-blueGray-300" />
        {/* <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase"></h6> */}
        <div className="flex flex-wrap">
          <div className="w-full lg:w-12/12 px-4">
            <div className="relative w-full mb-3">
              <label
                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                Delegate to (Employee)
              </label>
              <input
                type="text"
                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                placeholder="Delegate to Employee"
              />
            </div>
          </div>
        </div>

        <div className="w-full lg:w-12/12 px-4">
          <div className="relative w-full mb-3">
            <label
              className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
              htmlFor="grid-password"
            >
              Notes
            </label>
            <textarea
              className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              rows={4}
              placeholder="Input Notes"
            ></textarea>
          </div>
        </div>
      </form>
    </div>
  </div>
}

export default SubmissionForm;
