import { SupabaseClient } from "@supabase/supabase-js";

export const role = {
  findByLabel: async (client: SupabaseClient, label: Roles): Promise<Role> => {
    const res = await client.from('roles')
      .select('*')
      .eq('label', label)

    return res.data.length > 0 ? res.data[0] : null;
  },
};

export enum Roles {
  ADMIN = 'admin',
  LEADER = 'leader',
  EMPLOYEE = 'employee',
}

interface Role {
  id: string;
  label: string;
  created_at: string;
}