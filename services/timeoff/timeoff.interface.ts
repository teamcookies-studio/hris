import { TimeoffStatus } from "../../modules/timeoff-request/timeoff-request.interface";

export interface RequestTimeoffPayload {
  start_date: Date;
  end_date: Date;
  timeoff_type_id: string;
  employee_id: string;
  reviewed_by: string;
  delegate_to: string;
}

export interface TimeoffRequestReviewPayload {
  reviewer_id: string;
  timeoff_request_id: string;
  status: TimeoffStatus.APPROVED | TimeoffStatus.REJECTED;
}

export interface TimeoffRequestFindAllByClientListPayload {
  client_id: string;
  status: TimeoffStatus;
}
export interface TimeoffRequestFindAllByReviewerListPayload {
  reviewer_id: string;
  status: TimeoffStatus;
}

export interface TimeoffRequestFindAllByDelegateListPayload {
  delegate_id: string;
  status: TimeoffStatus;
}

export interface TimeoffQuotaFindAllEmployeePayload {
  client_id: string;
}

export interface CreateQuotaByTypePayload {
  client_id: string;
  timeoff_type_id: string;
  quota: number;
  year: number;
}

export interface CreateQuotaByEmployeePayload {
  client_id: string;
  timeoff_type_id: string;
  employee_id: string;
  quota: number;
  year: number;
}

export interface TimeoffQuotaFindOneByTypeAndEmployeePayload {
  timeoff_type_id: string;
  employee_id: string;
}

export interface TimeoffTypeFindAllByClientPayload {
  id?: string;
  client_id?: string;
}