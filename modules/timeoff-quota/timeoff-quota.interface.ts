export interface TimeoffQuota {
  id: string;
  year: number;
  quota: number;
  timeoff_type_id: string;
  employee_id: string;
  created_at: Date;
}

export interface TimeoffQuotaCreatePayload {
  year: number;
  quota: number;
  timeoff_type_id: string;
  employee_id: string;
}

export interface TimeoffQuotaUpdatePayload {
  id: string;
  year?: number;
  quota?: number;
  timeoff_type_id?: string;
  employee_id?: string;
}
