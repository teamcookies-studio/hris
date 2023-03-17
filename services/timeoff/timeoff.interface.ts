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
