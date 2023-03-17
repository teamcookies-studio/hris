import { SupabaseClient } from "@supabase/supabase-js";

const authRepository = {
  signOut: async (supabase: SupabaseClient) => {
    await supabase.auth.signOut();
  },
};

export default authRepository;
