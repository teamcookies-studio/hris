import { SupabaseClient } from "@supabase/supabase-js";
import { timeoffQuota as timeoffQuotaRepository } from '../modules/timeoff-quota/timeoff-quota.repository';
import { timeoffRequest as timeoffRequestRepository } from '../modules/timeoff-request/timeoff-request.repository';
import moment from 'moment';
import { TimeoffStatus } from "../modules/timeoff-request/timeoff-request.interface";

export const timeoff = {
  request: async (supabase: SupabaseClient, payload: RequestTimeoffPayload) => {
    const quota = await timeoffQuotaRepository.findOne(supabase, {
      employee_id: payload.employee_id,
      year: moment().year(),
    });

    const timeoffTotalDays = moment(payload.start_date).diff(moment(payload.end_date), 'days');

    if (timeoffTotalDays > quota.quota) {
      throw new Error();
    }

    const result = await timeoffRequestRepository.create(supabase, {
      ...payload,
      status: TimeoffStatus.PENDING,
    });

    return result;
  },
  review: async (supabase: SupabaseClient, payload: TimeoffRequestReviewPayload) => {
    const timeoff = await timeoffRequestRepository.findOne(supabase, { id: payload.timeoff_request_id });
    if (timeoff) {
      if (timeoff.reviewed_by !== payload.reviewer_id) {
        throw new Error();
      }

      const result = await timeoffRequestRepository.update(supabase, {
        id: payload.timeoff_request_id,
        status: payload.status,
      });

      return result;
    }

    throw new Error();
  },
};

interface RequestTimeoffPayload {
  start_date: Date;
  end_date: Date;
  timeoff_type_id: string;
  employee_id: string;
  reviewed_by: string;
  delegate_to: string;
}

interface TimeoffRequestReviewPayload {
  reviewer_id: string;
  timeoff_request_id: string;
  status: TimeoffStatus.APPROVED | TimeoffStatus.REJECTED;
}