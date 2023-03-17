export interface Employee {
  id: string;
  user_id: string;
  name: string;
  nickname: string;
  phone: string;
  email: string;
  gender: string;
  address: string;
  join_date: string;
  office_email: string;
  report_to: string;
  role_id: string;
  client_id: string;
  occupation: string;
  created_at: Date;
}

export interface EmployeeCreatePayload {
  user_id: string;
  name: string;
  nickname?: string;
  phone?: string;
  email?: string;
  gender?: string;
  address?: string;
  join_date?: Date;
  office_email?: string;
  report_to?: string;
  role_id: string;
  client_id: string;
}

export interface EmployeeUpdatePayload {
  id: string;
  user_id?: string;
  name?: string;
  nickname?: string;
  phone?: string;
  email?: string;
  gender?: string;
  address?: string;
  join_date?: Date;
  office_email?: string;
  report_to?: string;
  role_id?: string;
  client_id?: string;
}
