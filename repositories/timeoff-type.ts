import { SupabaseClient } from "@supabase/supabase-js";

export const timeoffType = {
  create: async (client: SupabaseClient, payload: TimeoffTypeCreatePayload): Promise<TimeoffType> => {
    const res = await client.from('timeoff_types')
      .insert({
        ...payload,
      })
      .select();

    return res.data.length > 0 ? res.data[0] : null;
  },
  update: async (client: SupabaseClient, payload: TimeoffTypeUpdatePayload): Promise<TimeoffType> => {
    const { id, ...others } = payload;
    const res = await client.from('timeoff_types')
      .update({
        ...others,
      })
      .eq('id', id)
      .select();

    return res.data.length > 0 ? res.data[0] : null;
  },
  findAll: async (client: SupabaseClient): Promise<TimeoffType[]> => {
    const res = await client.from('timeoff_types')
      .select('*')

    return res.data;
  },
  findOne: async (client: SupabaseClient, payload: Partial<TimeoffType>): Promise<TimeoffType> => {
    let builder = client.from('timeoff_types')
      .select('*');

    builder = Object.keys(payload).reduce((prev, key) => {
      return prev.eq(key, payload[key]);
    }, builder);

    const res = await builder;

    return res.data.length > 0 ? res.data[0] : null;
  },
};

interface TimeoffType {
  id: string;
  label: string;
  client_id: string;
  created_at: string;
}

export interface TimeoffTypeCreatePayload {
  label: string;
  client_id: string;
}

export interface TimeoffTypeUpdatePayload {
  id: string;
  label?: string;
}