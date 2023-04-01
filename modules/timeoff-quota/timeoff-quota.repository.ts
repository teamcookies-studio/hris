import { SupabaseClient } from "@supabase/supabase-js";
import ERROR from "../../utils/errors";
import {
  TimeoffQuota,
  TimeoffQuotaCreatePayload,
  TimeoffQuotaWithTypeAndEmployee,
  TimeoffQuotaUpdatePayload,
} from "./timeoff-quota.interface";

const timeoffQuotaRepository = {
  create: async (
    supabase: SupabaseClient,
    payload: TimeoffQuotaCreatePayload
  ): Promise<TimeoffQuota> => {
    const { error, data } = await supabase
      .from("timeoff_quotas")
      .insert(payload)
      .select()
      .single();

    if (error) throw Error(ERROR.SOMETHING_WENT_WRONG);

    return data;
  },

  bulkCreate: async (
    supabase: SupabaseClient,
    payload: TimeoffQuotaCreatePayload[]
  ): Promise<TimeoffQuota[]> => {
    const { error, data } = await supabase
      .from("timeoff_quotas")
      .insert(payload)
      .select('*')

    if (error) throw Error(ERROR.SOMETHING_WENT_WRONG);

    return data;
  },

  update: async (
    supabase: SupabaseClient,
    payload: TimeoffQuotaUpdatePayload
  ): Promise<TimeoffQuota> => {
    const { id, ...others } = payload;
    const { error, data } = await supabase
      .from("timeoff_quotas")
      .update({
        ...others,
      })
      .eq("id", id)
      .select()
      .single();

    if (error) throw Error(ERROR.SOMETHING_WENT_WRONG);

    return data;
  },

  findAll: async (supabase: SupabaseClient): Promise<TimeoffQuota[]> => {
    const { error, data } = await supabase.from("timeoff_quotas").select("*");

    if (error) throw Error(ERROR.SOMETHING_WENT_WRONG);

    return data;
  },

  findOne: async (
    supabase: SupabaseClient,
    payload: Partial<TimeoffQuota>
  ): Promise<TimeoffQuota> => {
    let builder = supabase.from("timeoff_quotas").select("*");

    builder = Object.keys(payload).reduce((prev, key) => {
      return prev.eq(key, payload[key]);
    }, builder);

    const { error, data } = await builder.single();

    if (error) throw Error(ERROR.SOMETHING_WENT_WRONG);

    return data;
  },

  findAllByClient: async (supabase: SupabaseClient, client: string): Promise<TimeoffQuotaWithTypeAndEmployee[]> => {
    const { error, data } = await supabase.from("timeoff_quotas")
      .select('*, timeoff_type_id(label), employee_id(name)')
      .eq('employee_id.client_id', client)

    if (error) throw Error(ERROR.SOMETHING_WENT_WRONG);

    return data.map((val) => ({
      ...val,
      type: val.timeoff_type_id.label,
      employee_name: val.employee_id.name,
    }));
  },

  delete: async (supabase: SupabaseClient, id: string): Promise<boolean> => {
    const { error } = await supabase
      .from("timeoff_quotas")
      .delete()
      .eq("id", id)
      .select();

    if (error) throw Error(ERROR.SOMETHING_WENT_WRONG);

    return true;
  },
};

export default timeoffQuotaRepository;
