import { SupabaseClient } from "@supabase/supabase-js";
import ERROR from "../../utils/errors";
import { Role, Roles } from "./role.interface";

export const role = {
  findByLabel: async (
    supabase: SupabaseClient,
    label: Roles
  ): Promise<Role> => {
    const { error, data } = await supabase
      .from("roles")
      .select("*")
      .eq("label", label)
      .single();

    if (error) throw Error(ERROR.SOMETHING_WENT_WRONG);

    return data;
  },
};
