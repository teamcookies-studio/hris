import { SupabaseClient } from "@supabase/supabase-js";
import ERROR from "../../utils/errors";
import {
  Client,
  ClientCreatePayload,
  ClientUpdatePayload,
} from "./client.interface";

export const client = {
  create: async (
    supabase: SupabaseClient,
    payload: ClientCreatePayload
  ): Promise<Client> => {
    const { error, data } = await supabase
      .from("clients")
      .insert(payload)
      .select()
      .single();

    if (error) throw Error(ERROR.SOMETHING_WENT_WRONG);

    return data;
  },
  update: async (
    supabase: SupabaseClient,
    payload: ClientUpdatePayload
  ): Promise<Client> => {
    const { id, ...others } = payload;
    const { error, data } = await supabase
      .from("clients")
      .update(others)
      .eq("id", id)
      .select()
      .single();

    if (error) throw Error(ERROR.SOMETHING_WENT_WRONG);

    return data;
  },
};
