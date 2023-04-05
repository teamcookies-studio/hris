import { SupabaseClient } from "@supabase/supabase-js";
import {
  Employee,
  EmployeeCreatePayload,
  EmployeeUpdatePayload,
  EmployeeFindAllPayload,
} from "../../modules/employee/employee.interface";
import employeeRepository from "../../modules/employee/employee.repository";

const employeeService = {
  getAll: async (
    supabase: SupabaseClient,
    query: EmployeeFindAllPayload
  ): Promise<Employee[]> => {
    return await employeeRepository.findAll(supabase, query);
  },

  getByUserId: async (
    supabase: SupabaseClient,
    userId: string
  ): Promise<Employee> => {
    return await employeeRepository.findOne(supabase, { user_id: userId });
  },
  create: async (
    supabase: SupabaseClient,
    payload: EmployeeCreatePayload
  ): Promise<Employee> => {
    return await employeeRepository.create(supabase, payload);
  },
  findAllByClientId: async (
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

  remove: async (supabase: SupabaseClient, id: string): Promise<boolean> => {
    return await employeeRepository.delete(supabase, id);
  },
};

export default employeeService;
