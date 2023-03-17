import { SupabaseClient } from "@supabase/supabase-js";
import employeeRepository from "../../modules/employee/employee.repository";

const employeeService = {
  getByUserId: async (supabase: SupabaseClient, userId: string) => {
    await employeeRepository.findOne(supabase, { user_id: userId });
  },
};

export default employeeService;
