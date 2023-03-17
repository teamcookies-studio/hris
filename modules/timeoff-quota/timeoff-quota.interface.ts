export interface TimeoffQuota {
  id: string;
  year: number;
  quota: number;
  timeoff_type_id: string;
  employee_id: string;
  created_at: Date;
}

export interface TimeoffQuotaWithTypeAndEmployee extends TimeoffQuota {
  type: string;
  employee_name: string;
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
