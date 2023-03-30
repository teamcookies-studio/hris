import { Roles } from "../role/role.interface";

export interface RegisterUserPayload {
  email: string;
  password: string;
  client_name: string;
  name: string;
}

export interface InviteUserPayload {
  email: string;
  name: string;
  role: Roles;
  client_id: string;
}