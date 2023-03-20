import { SupabaseClient } from "@supabase/supabase-js";
import {
  Employee,
  EmployeeUpdatePayload,
} from "../../modules/employee/employee.interface";
import employeeRepository from "../../modules/employee/employee.repository";

const employeeService = {
  getByUserId: async (
    supabase: SupabaseClient,
    userId: string
  ): Promise<Employee> => {
    return await employeeRepository.findOne(supabase, { user_id: userId });
  },
  getUsersByClientId: async (
    supabase: SupabaseClient,
    clientId: string
  ): Promise<Employee[]> => {
    return await employeeRepository.findAll(supabase, { client_id: clientId });
  },
  updateProfile: async (
    supabase: SupabaseClient,
    payload: EmployeeUpdatePayload
  ): Promise<Employee> => {
    return await employeeRepository.update(supabase, payload);
  },
};

export default employeeService;
