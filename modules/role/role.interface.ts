export enum Roles {
  ADMIN = "admin",
  LEADER = "leader",
  EMPLOYEE = "employee",
}

export interface Role {
  id: string;
  label: string;
  created_at: string;
}
