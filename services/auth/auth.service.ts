import { SupabaseClient } from "@supabase/supabase-js";
import authRepository from "../../modules/auth/auth.repository";
import { RegisterUserPayload } from "./auth.interface";
import clientRepository from '../../modules/client/client.repository';
import employeeRepository from '../../modules/employee/employee.repository';
import roleRepository from '../../modules/role/role.repository';
import { Roles } from '../../modules/role/role.interface';

export const authService = {
  register: async (supabaseClient: SupabaseClient, payload: RegisterUserPayload) => {
    const { email, password, ...others } = payload;
    const { data, error } = await supabaseClient.auth.signUp({
      email, password
    });

    if (!error) {
      const { user } = data;

      let client = await clientRepository.create(supabaseClient, {
        name: others.client_name,
      });

      const role = await roleRepository.findOne(supabaseClient, { label: Roles.ADMIN });

      const employee = await employeeRepository.create(supabaseClient, {
        name: others.name,
        user_id: user.id,
        role_id: role.id,
        client_id: client.id,
      });

      client = await clientRepository.update(supabaseClient, {
        id: client.id,
        admin: employee.id,
      });

      return {
        client,
        employee,
      };
    }

    return null;
  },
  signOut: async (client: SupabaseClient) => {
    await client.auth.signOut();
  },
};

export default authService;