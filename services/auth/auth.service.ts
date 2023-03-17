import { SupabaseClient } from "@supabase/supabase-js";
import authRepository from "../../modules/auth/auth.repository";

const authService = {
  signOut: async (supabase: SupabaseClient) => {
    await authRepository.signOut(supabase);
  },
};

export default authService;
