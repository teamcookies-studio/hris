import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { Employee } from "../../../modules/employee/employee.interface";
import employeeService from "../../../services/employee/employee.service";
import { getAvatarByName } from "../../../utils/helpers";
import ProfileAttribute from "./ProfileAttribute";

export default function ProfileView() {
  const router = useRouter();
  const user = useUser();
  const supabase = useSupabaseClient();
  const [employee, setEmployee] = useState<Employee>(null);
  const [isFetching, setIsFetching] = useState<boolean>(true);

  const id = router.query?.id as string;
  const isPersonalProfile = router.pathname.includes('profile');

  const fetchEmployeeByUserId = useCallback(async () => {
    if (!user) return;

    try {
      setIsFetching(true);
      const response: Employee = await employeeService.getByUserId(supabase, !isPersonalProfile ? id : user.id);
      setEmployee(response);
    } catch (e) {
      console.log(e.message);
    } finally {
      setIsFetching(false);
    }
  }, [supabase, user, id]);

  useEffect(() => {
    fetchEmployeeByUserId();
  }, [fetchEmployeeByUserId]);

  if (isFetching) {
    return <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
      <div className="px-3">
        <div className="flex flex-wrap justify-center">
          <div className="w-full px-4 flex justify-center">
            <div className="relative">
              <img
                alt="..."
                src={getAvatarByName("Fetching Employee")}
                width={800}
                height={800}
                className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 max-w-150-px"
              />
            </div>
          </div>
          <div className="w-full px-4 text-center mt-20">
            <div className="flex-col justify-center py-4 lg:pt-4 pt-8">
              <h3 className="text-xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                Please Wait
              </h3>
              <div className="text-sm leading-normal mt-0 mb-4 text-blueGray-400 font-bold uppercase">
                Fetching Employee...
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  }

  if (!employee) {
    return <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
      <div className="px-3">
        <div className="flex flex-wrap justify-center">
          <div className="w-full px-4 flex justify-center">
            <div className="relative">
              <img
                alt="..."
                src={getAvatarByName("O")}
                width={800}
                height={800}
                className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 max-w-150-px"
              />
            </div>
          </div>
          <div className="w-full px-4 text-center mt-20">
            <div className="flex-col justify-center py-4 lg:pt-4 pt-8">
              <h3 className="text-xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                Something Went Wrong
              </h3>
              <div className="text-sm leading-normal mt-0 mb-4 text-blueGray-400 font-bold uppercase">
                Employee Not Found
              </div>
              <button
                className="bg-blueGray-700 active:bg-blueGray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                type="button"
                onClick={fetchEmployeeByUserId}
              >
                Reload
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  }

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
        <div className="px-3">
          <div className="flex flex-wrap justify-center">
            <div className="w-full px-4 flex justify-center">
              <div className="relative">
                <img
                  alt="..."
                  src="/img/team-1-800x800.jpg"
                  className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 max-w-150-px"
                />
              </div>
              {isPersonalProfile && (
                <Link href={`/admin/profiles/${employee.user_id}`}>
                  <button
                    className="absolute bg-blueGray-700 active:bg-blueGray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                    type="button"
                    style={{ right: 28, top: 28 }}
                  >
                    Update Profile
                  </button>
                </Link>
              )}
            </div>
            <div className="w-full px-4 text-center mt-20">
              <div className="flex-col justify-center py-4 lg:pt-4 pt-8">
                <h3 className="text-xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                  {employee.name || '-'}
                </h3>
                <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                  {employee.occupation || '-'}
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap mt-6 md:text-center">
            <ProfileAttribute label={"Nickname"} value={employee.nickname} />
            <ProfileAttribute label={"Gender"} value={employee.gender} />
            <ProfileAttribute label={"Phone Number"} value={employee.phone} />
            <ProfileAttribute label={"Address"} value={employee.address} />
            <ProfileAttribute label={"Personal Email"} value={employee.email} />
            <ProfileAttribute label={"Office Email"} value={employee.office_email} />
            <ProfileAttribute label={"Join Date"} value={employee.join_date} />
            <ProfileAttribute label={"Marital Status"} value={"Married"} />
          </div>
        </div>
      </div>
    </>
  );
}
