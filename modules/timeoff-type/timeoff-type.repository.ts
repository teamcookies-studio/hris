import { SupabaseClient } from "@supabase/supabase-js";
import ERROR from "../../utils/errors";
import {
  TimeoffType,
  TimeoffTypeCreatePayload,
  TimeoffTypeFindAllPayload,
  TimeoffTypeUpdatePayload,
} from "./timeoff-type.interface";

const timeoffTypeRepository = {
  create: async (
    supabase: SupabaseClient,
    payload: TimeoffTypeCreatePayload
  ): Promise<TimeoffType> => {
    const { error, data } = await supabase
      .from("timeoff_types")
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
    payload: TimeoffTypeUpdatePayload
  ): Promise<TimeoffType> => {
    const { id, ...others } = payload;
    const { error, data } = await supabase
      .from("timeoff_types")
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
    payload: TimeoffTypeFindAllPayload
  ): Promise<TimeoffType[]> => {
    let builder = supabase.from("timeoff_types")
      .select("*")
      .range(0, 10);

    builder = Object.keys(payload).reduce((prev, key) => {
      return prev.eq(key, payload[key]);
    }, builder);

    const { error, data } = await builder;

    if (error) throw Error(ERROR.SOMETHING_WENT_WRONG);

    return data;
  },

  findOne: async (
    supabase: SupabaseClient,
    payload: Partial<TimeoffType>
  ): Promise<TimeoffType> => {
    let builder = supabase.from("timeoff_types").select("*");

    builder = Object.keys(payload).reduce((prev, key) => {
      return prev.eq(key, payload[key]);
    }, builder);

    const { error, data } = await builder.single();

    if (error) throw Error(ERROR.SOMETHING_WENT_WRONG);

    return data;
  },
};

export default timeoffTypeRepository;
