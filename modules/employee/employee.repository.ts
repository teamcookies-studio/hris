import { SupabaseClient } from "@supabase/supabase-js";
import ERROR from "../../utils/errors";
import {
  Employee,
  EmployeeCreatePayload,
  EmployeeFindAllPayload,
  EmployeeUpdatePayload,
} from "./employee.interface";

const employeeRepository = {
  create: async (
    supabase: SupabaseClient,
    payload: EmployeeCreatePayload
  ): Promise<Employee> => {
    const { error, data } = await supabase
      .from("employees")
      .insert(payload)
      .select()
      .single();

    if (error) throw Error(ERROR.SOMETHING_WENT_WRONG);

    return data;
  },

  update: async (
    supabase: SupabaseClient,
    payload: EmployeeUpdatePayload
  ): Promise<Employee> => {
    const { id, ...others } = payload;
    const { error, data } = await supabase
      .from("employees")
      .update(others)
      .eq("id", id)
      .select();

    if (error) throw Error(ERROR.SOMETHING_WENT_WRONG);

    return data.length > 0 ? data[0] : null;
  },

  findAll: async (
    supabase: SupabaseClient,
    payload: EmployeeFindAllPayload
  ): Promise<Employee[]> => {
    let builder = supabase.from("employees").select("*").range(0, 10);

    builder = Object.keys(payload).reduce((prev, key) => {
      return prev.eq(key, payload[key]);
    }, builder);

    const { error, data } = await builder;

    if (error) throw Error(ERROR.SOMETHING_WENT_WRONG);

    return data;
  },

  findOne: async (
    supabase: SupabaseClient,
    payload: Partial<Employee>
  ): Promise<Employee> => {
    let builder = supabase.from("employees").select("*");

    builder = Object.keys(payload).reduce((prev, key) => {
      return prev.eq(key, payload[key]);
    }, builder);

    const { error, data } = await builder;

    if (error) throw Error(ERROR.SOMETHING_WENT_WRONG);

    return data.length > 0 ? data[0] : null;
  },
};

export default employeeRepository;
