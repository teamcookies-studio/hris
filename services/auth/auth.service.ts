import { SupabaseClient } from "@supabase/supabase-js";
import authRepository from "../../modules/auth/auth.repository";
import { InviteUserPayload, RegisterUserPayload } from "../../modules/auth/auth.interface";
import clientRepository from "../../modules/client/client.repository";
import employeeRepository from "../../modules/employee/employee.repository";
import roleRepository from "../../modules/role/role.repository";
import { Roles } from "../../modules/role/role.interface";

export const authService = {
  register: async (
    supabaseClient: SupabaseClient,
    payload: RegisterUserPayload
  ) => {
    const { email, password, client_name, name } = payload;
    const { data, error } = await supabaseClient.auth.signUp({
      email,
      password,
    });

    if (!error) {
      const { user } = data;

      let client = await clientRepository.create(supabaseClient, {
        name: client_name,
      });

      const role = await roleRepository.findOne(supabaseClient, {
        label: Roles.ADMIN,
      });

      const employee = await employeeRepository.create(supabaseClient, {
        name: name,
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
  invite: async (
    supabaseClient: SupabaseClient,
    payload: InviteUserPayload,
  ) => {
    const { error, data } = await supabaseClient.auth.admin.inviteUserByEmail(payload.email);
    if (!error) {
      const { user } = data;

      const role = await roleRepository.findOne(supabaseClient, {
        label: payload.role,
      });

      const employee = await employeeRepository.create(supabaseClient, {
        name: payload.name,
        user_id: user.id,
        role_id: role.id,
        client_id: payload.client_id,
      });

      return employee;
    }

    return null;
  },
  signOut: async (client: SupabaseClient) => {
    await authRepository.signOut(client);
  },
};

export default authService;
