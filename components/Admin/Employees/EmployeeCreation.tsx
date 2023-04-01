import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { Employee } from "../../../modules/employee/employee.interface";
import employeeService from "../../../services/employee/employee.service";
import roleRepository from "../../../modules/role/role.repository";
import { Roles } from "../../../modules/role/role.interface";

export default function EmployeeCreation() {
  const router = useRouter();
  const user = useUser();
  const supabase = useSupabaseClient();
  const [employee, setEmployee] = useState<Employee>(null);
  const [isFetching, setIsFetching] = useState<boolean>(true);

  const [formData, setFormData] = useState({
    name: "",
    nickname: "",
    email: "",
    office_email: "",
    address: "",
    phone: "",
    occupation: "",
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  
  const isPersonalProfile = router.pathname.includes('profile');

  const createProfile = async () => {
    try {
      setIsFetching(true);

      const role = await roleRepository.findOne(supabase, {
        label: Roles.EMPLOYEE,
      });

      const employee = await employeeService.getByUserId(supabase, user.id); 

      await employeeService.create(supabase, {
        user_id: user.id,
        role_id: role.id,
        client_id: employee.client_id,
        ...formData,
      });

      if (!isPersonalProfile) {
        router.push("/admin/employees/list");
      } else {
        router.push("/admin/profiles");
      }
    } catch (e) {
      console.log(e.message);
    } finally {
      setIsFetching(false);
    }
  };

  return (
    <>
      <div className="mt-16 relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
        <form>
          <div className="rounded-t bg-white mb-0 px-6 py-6">
            <div className="text-center flex justify-between">
              <h6 className="text-blueGray-700 text-xl font-bold">Create Employee</h6>
              <div>
                <Link href="/admin/employees/list">
                  <button
                    className="font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md mr-1 ease-linear transition-all duration-150"
                    type="button"
                  >
                    Cancel
                  </button>
                </Link>
                <button
                  className="bg-blueGray-700 active:bg-blueGray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={createProfile}
                >
                  Create Employee
                </button>
              </div>
            </div>
          </div>
          <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
              <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                User Information
              </h6>
              <div className="flex flex-wrap">
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      value={formData.name}
                      name="name"
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Nickname
                    </label>
                    <input
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      value={formData.nickname}
                      name="nickname"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Email address
                    </label>
                    <input
                      type="email"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      value={formData.email}
                      name="email"
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Office Email
                    </label>
                    <input
                      type="text"
                      className="cursor-not-allowed border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      value={formData.office_email}
                      name="office_email"
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              <hr className="mt-6 border-b-1 border-blueGray-300" />

              <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                Contact Information
              </h6>
              <div className="flex flex-wrap">
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Address
                    </label>
                    <input
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      value={formData.address}
                      name="address"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Phone Number
                    </label>
                    <input
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      value={formData.phone}
                      name="phone"
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
              <hr className="mt-6 border-b-1 border-blueGray-300" />
              <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                About Me
              </h6>
              <div className="flex flex-wrap">
                <div className="w-full lg:w-12/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Occupation
                    </label>
                    <input
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      value={formData.occupation}
                      name="occupation"
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </form>
      </div>
    </>
  );
}
