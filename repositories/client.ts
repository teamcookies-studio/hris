import { SupabaseClient } from "@supabase/supabase-js";

export const client = {
  create: async (client: SupabaseClient, payload: ClientCreatePayload): Promise<Client> => {
    const res = await client.from('clients')
      .insert({
        ...payload,
      })
      .select();

    return res.data.length > 0 ? res.data[0] : null;
  },
  update: async (client: SupabaseClient, payload: ClientUpdatePayload): Promise<Client> => {
    const { id, ...others } = payload;
    const res = await client.from('clients')
      .update({
        ...others,
      })
      .eq('id', id)
      .select();

    return res.data.length > 0 ? res.data[0] : null;
  },
};

interface Client {
  id: string;
  name: string;
  admin: string;
  created_at: Date;
}

export interface ClientCreatePayload {
  name: string;
}

export interface ClientUpdatePayload {
  id: string;
  name?: string;
  admin?: string;
}