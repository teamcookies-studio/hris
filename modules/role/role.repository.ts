import { SupabaseClient } from "@supabase/supabase-js";
import ERROR from "../../utils/errors";
import { Role } from "./role.interface";

const roleRepository = {
  findOne: async (
    supabase: SupabaseClient,
    label: Partial<Role>
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

export default roleRepository;
