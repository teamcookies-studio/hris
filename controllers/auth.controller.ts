import { SupabaseClient } from "@supabase/supabase-js";
import { authRepository } from "../modules/auth/auth.repository";

export const authController = {
  signOut: async (supabase: SupabaseClient) => {
    await authRepository.signOut(supabase);
  },
};
