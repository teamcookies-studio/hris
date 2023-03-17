import { SupabaseClient } from "@supabase/supabase-js";
import ERROR from "../../utils/errors";
import {
  Client,
  ClientCreatePayload,
  ClientUpdatePayload,
} from "./client.interface";

const clientRepository = {
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
  findOne: async (
    supabase: SupabaseClient,
    payload: Partial<Client>
  ): Promise<Client | null> => {
    let builder = supabase.from("clients").select("*");

    builder = Object.keys(payload).reduce((prev, key) => {
      return prev.eq(key, payload[key]);
    }, builder);

    const { error, data } = await builder.single();

    if (error) throw Error(ERROR.SOMETHING_WENT_WRONG);

    return data;
  },
};

export default clientRepository;
