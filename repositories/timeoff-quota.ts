import { SupabaseClient } from "@supabase/supabase-js";

export const timeoffQuota = {
  create: async (client: SupabaseClient, payload: TimeoffQuotaCreatePayload): Promise<TimeoffQuota> => {
    const res = await client.from('timeoff_quotas')
      .insert({
        ...payload,
      })
      .select();

    return res.data.length > 0 ? res.data[0] : null;
  },
  update: async (client: SupabaseClient, payload: TimeoffQuotaUpdatePayload): Promise<TimeoffQuota> => {
    const { id, ...others } = payload;
    const res = await client.from('timeoff_quotas')
      .update({
        ...others,
      })
      .eq('id', id)
      .select();

    return res.data.length > 0 ? res.data[0] : null;
  },
  findAll: async (client: SupabaseClient): Promise<TimeoffQuota[]> => {
    const res = await client.from('timeoff_quotas')
      .select('*')

    return res.data;
  },
  findOne: async (client: SupabaseClient, payload: Partial<TimeoffQuota>): Promise<TimeoffQuota> => {
    let builder = client.from('timeoff_quotas')
      .select('*')

    builder = Object.keys(payload).reduce((prev, key) => {
      return prev.eq(key, payload[key]);
    }, builder);

    const res = await builder;

    return res.data.length > 0 ? res.data[0] : null;
  },
};

interface TimeoffQuota {
  id: string;
  year: number;
  quota: number;
  timeoff_type_id: string;
  employee_id: string;
  created_at: Date;
}

export interface TimeoffQuotaCreatePayload {
  year: number;
  quota: number;
  timeoff_type_id: string;
  employee_id: string;
}

export interface TimeoffQuotaUpdatePayload {
  id: string;
  year?: number;
  quota?: number;
  timeoff_type_id?: string;
  employee_id?: string;
}