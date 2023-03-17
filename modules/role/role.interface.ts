export enum Roles {
  ADMIN = "admin",
  LEADER = "leader",
  EMPLOYEE = "employee",
}

export interface Role {
  id: string;
  label: Roles;
  created_at: string;
}
