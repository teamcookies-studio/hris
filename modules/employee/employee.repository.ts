import { SupabaseClient } from "@supabase/supabase-js";
import ERROR from "../../utils/errors";
import {
  Employee,
  EmployeeCreatePayload,
  EmployeeUpdatePayload,
} from "./employee.interface";

export const employee = {
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
      .select()
      .single();

    if (error) throw Error(ERROR.SOMETHING_WENT_WRONG);

    return data;
  },
  findAll: async (supabase: SupabaseClient): Promise<Employee[]> => {
    const { error, data } = await supabase.from("employees").select("*");

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

    const { error, data } = await builder.single();

    if (error) throw Error(ERROR.SOMETHING_WENT_WRONG);

    return data;
  },
};
