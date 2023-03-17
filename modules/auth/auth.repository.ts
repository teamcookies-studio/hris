import { SupabaseClient } from "@supabase/supabase-js";

export const authRepository = {
  signOut: async (supabase: SupabaseClient) => {
    await supabase.auth.signOut();
  },
};
