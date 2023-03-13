import { SupabaseClient } from "@supabase/supabase-js";

export const auth = {
  signOut: async (client: SupabaseClient) => {
    await client.auth.signOut();
  },
};
