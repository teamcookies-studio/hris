import { SupabaseClient } from "@supabase/supabase-js";
import { Employee } from "../../modules/employee/employee.interface";
import employeeRepository from "../../modules/employee/employee.repository";

const employeeService = {
  getByUserId: async (
    supabase: SupabaseClient,
    userId: string
  ): Promise<Employee> => {
    return await employeeRepository.findOne(supabase, { user_id: userId });
  },
};

export default employeeService;
