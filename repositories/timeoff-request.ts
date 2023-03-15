import { SupabaseClient } from "@supabase/supabase-js";

export const timeoffRequest = {
  create: async (client: SupabaseClient, payload: TimeoffRequestCreatePayload): Promise<TimeoffRequest> => {
    const res = await client.from('timeoff_requests')
      .insert({
        ...payload,
      })
      .select();

    return res.data.length > 0 ? res.data[0] : null;
  },
  update: async (client: SupabaseClient, payload: TimeoffRequestUpdatePayload): Promise<TimeoffRequest> => {
    const { id, ...others } = payload;
    const res = await client.from('timeoff_requests')
      .update({
        ...others,
      })
      .eq('id', id)
      .select();

    return res.data.length > 0 ? res.data[0] : null;
  },
  findAll: async (client: SupabaseClient, payload: TimeoffRequestFindAllPayload): Promise<TimeoffRequest[]> => {
    let builder = client.from('timeoff_requests')
      .select('*')
      .range(0, 10)

    builder = Object.keys(payload).reduce((prev, key) => {
      return prev.eq(key, payload[key]);
    }, builder);

    const res = await builder;

    return res.data;
  },
  findOne: async (client: SupabaseClient, payload: Partial<TimeoffRequest>): Promise<TimeoffRequest | null> => {
    let builder = client.from('timeoff_requests')
      .select('*');

    builder = Object.keys(payload).reduce((prev, key) => {
      return prev.eq(key, payload[key]);
    }, builder);

    const res = await builder;

    return res.data.length > 0 ? res.data[0] : null;
  },
};

interface TimeoffRequest {
  id: string;
  start_date: Date;
  end_date: Date;
  status: string;
  timeoff_type_id: string;
  employee_id: string;
  reviewed_by: string;
  delegate_to: string;
  created_at: string;
}

export enum TimeoffStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

export interface TimeoffRequestCreatePayload {
  start_date: Date;
  end_date: Date;
  status: string;
  timeoff_type_id: string;
  employee_id: string;
  reviewed_by: string;
  delegate_to: string;
}

export interface TimeoffRequestUpdatePayload {
  id: string;
  start_date?: Date;
  end_date?: Date;
  status?: string;
  timeoff_type_id?: string;
  employee_id?: string;
  reviewed_by?: string;
  delegate_to?: string;
}

export interface TimeoffRequestFindAllPayload {
  start_date?: Date;
  end_date?: Date;
  status?: string;
  timeoff_type_id?: string;
  employee_id?: string;
  reviewed_by?: string;
  delegate_to?: string;
}
