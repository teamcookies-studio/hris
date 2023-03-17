export interface TimeoffRequest {
  id: string;
  start_date: Date;
  end_date: Date;
  status: string;
  timeoff_type_id: string;
  employee_id: string;
  reviewed_by: string;
  delegate_to: string;
  created_at: string;
}

export enum TimeoffStatus {
  PENDING = "pending",
  APPROVED = "approved",
  REJECTED = "rejected",
}

export interface TimeoffRequestCreatePayload {
  start_date: Date;
  end_date: Date;
  status: string;
  timeoff_type_id: string;
  employee_id: string;
  reviewed_by: string;
  delegate_to: string;
}

export interface TimeoffRequestUpdatePayload {
  id: string;
  start_date?: Date;
  end_date?: Date;
  status?: string;
  timeoff_type_id?: string;
  employee_id?: string;
  reviewed_by?: string;
  delegate_to?: string;
}

export interface TimeoffRequestFindAllPayload {
  start_date?: Date;
  end_date?: Date;
  status?: string;
  timeoff_type_id?: string;
  employee_id?: string;
  reviewed_by?: string;
  delegate_to?: string;
}
