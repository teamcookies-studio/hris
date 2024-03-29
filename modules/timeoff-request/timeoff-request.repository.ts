import { SupabaseClient } from "@supabase/supabase-js";
import ERROR from "../../utils/errors";
import {
  TimeoffRequest,
  TimeoffRequestCreatePayload,
  TimeoffRequestFindAllPayload,
  TimeoffRequestUpdatePayload,
} from "./timeoff-request.interface";

const timeoffRequestRepository = {
  create: async (
    supabase: SupabaseClient,
    payload: TimeoffRequestCreatePayload
  ): Promise<TimeoffRequest> => {
    const { error, data } = await supabase
      .from("timeoff_requests")
      .insert({
        ...payload,
      })
      .select()
      .single();

    if (error) throw Error(ERROR.SOMETHING_WENT_WRONG);

    return data;
  },

  update: async (
    supabase: SupabaseClient,
    payload: TimeoffRequestUpdatePayload
  ): Promise<TimeoffRequest> => {
    const { id, ...others } = payload;
    const { error, data } = await supabase
      .from("timeoff_requests")
      .update({
        ...others,
      })
      .eq("id", id)
      .select()
      .single();

    if (error) throw Error(ERROR.SOMETHING_WENT_WRONG);

    return data;
  },

  findAll: async (
    supabase: SupabaseClient,
    payload: TimeoffRequestFindAllPayload
  ): Promise<TimeoffRequest[]> => {
    let builder = supabase.from("timeoff_requests")
      .select(`*,
        employee:employee_id(name),
        reviewer:reviewed_by(name),
        delegate:delegate_to(name),
        type:timeoff_type_id(label)`
      )
      .range(0, 10);

    builder = Object.keys(payload).reduce((prev, key) => {
      if (key === 'client_id') {
        return prev.eq('employee.client_id', payload[key])
      }
      return prev.eq(key, payload[key]);
    }, builder);

    const { error, data } = await builder;

    if (error) throw Error(ERROR.SOMETHING_WENT_WRONG);

    return data.map((val) => ({
      ...val,
      employee_name: val.employee.name,
      reviewer: val.reviewer.name,
      delegate: val.delegate.name,
      type: val.type.label
    }));
  },

  findOne: async (
    supabase: SupabaseClient,
    payload: Partial<TimeoffRequest>
  ): Promise<TimeoffRequest | null> => {
    let builder = supabase.from("timeoff_requests").select("*");

    builder = Object.keys(payload).reduce((prev, key) => {
      return prev.eq(key, payload[key]);
    }, builder);

    const { error, data } = await builder.single();

    if (error) throw Error(ERROR.SOMETHING_WENT_WRONG);

    return data;
  },
};

export default timeoffRequestRepository;
