import { SupabaseClient } from "@supabase/supabase-js";

export const employee = {
  create: async (client: SupabaseClient, payload: EmployeeCreatePayload): Promise<Employee> => {
    const res = await client.from('employees')
      .insert({
        ...payload,
      })
      .select();

    return res.data.length > 0 ? res.data[0] : null;
  },
  update: async (client: SupabaseClient, payload: EmployeeUpdatePayload): Promise<Employee> => {
    const { id, ...others } = payload;
    const res = await client.from('employees')
      .update({
        ...others,
      })
      .eq('id', id);

    return res.data.length > 0 ? res.data[0] : null;
  },
  findAll: async (client: SupabaseClient): Promise<Employee[]> => {
    const res = await client.from('employees')
      .select('*')

    return res.data;
  },
  findOne: async (client: SupabaseClient, payload: Partial<Employee>): Promise<Employee> => {
    let builder = client.from('employees')
      .select('*');

    builder = Object.keys(payload).reduce((prev, key) => {
      return prev.eq(key, payload[key]);
    }, builder);

    const res = await builder;

    return res.data.length > 0 ? res.data[0] : null;
  },
};

interface Employee {
  id: string;
  user_id: string;
  name: string;
  nickname: string;
  phone: string;
  email: string;
  gender: string;
  address: string;
  join_date: Date;
  office_email: string;
  report_to: string;
  role_id: string;
  client_id: string;
  created_at: Date;
}

export interface EmployeeCreatePayload {
  user_id: string;
  name: string;
  nickname?: string;
  phone?: string;
  email?: string;
  gender?: string;
  address?: string;
  join_date?: Date;
  office_email?: string;
  report_to?: string;
  role_id: string;
  client_id: string;
}

export interface EmployeeUpdatePayload {
  id: string;
  user_id?: string;
  name?: string;
  nickname?: string;
  phone?: string;
  email?: string;
  gender?: string;
  address?: string;
  join_date?: Date;
  office_email?: string;
  report_to?: string;
  role_id?: string;
  client_id?: string;
}