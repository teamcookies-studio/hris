import { SupabaseClient } from "@supabase/supabase-js";
import moment from "moment";
import timeoffQuotaRepository from "../../modules/timeoff-quota/timeoff-quota.repository";
import timeoffRequestRepository from "../../modules/timeoff-request/timeoff-request.repository";
import timeoffTypeRepository from "../../modules/timeoff-type/timeoff-type.repository";
import employeeRepository from "../../modules/employee/employee.repository";
import { TimeoffStatus } from "../../modules/timeoff-request/timeoff-request.interface";
import {
  CreateQuotaByEmployeePayload,
  CreateQuotaByTypePayload,
  RequestTimeoffPayload,
  TimeoffQuotaFindAllEmployeePayload,
  TimeoffQuotaFindOneByTypeAndEmployeePayload,
  TimeoffRequestFindAllByClientListPayload,
  TimeoffRequestFindAllByDelegateListPayload,
  TimeoffRequestFindAllByReviewerListPayload,
  TimeoffRequestReviewPayload,
  TimeoffTypeFindAllByClientPayload,
} from "./timeoff.interface";

const timeoffTypeService = {
  findAllTimeoffTypeByClient: async (
    supabase: SupabaseClient,
    payload: TimeoffTypeFindAllByClientPayload
  ) => {
    return await timeoffTypeRepository.findAll(supabase, payload);
  },
};

const timeoffQuotaService = {
  createQuotaByType: async (
    supabase: SupabaseClient,
    payload: CreateQuotaByTypePayload
  ) => {
    const employees = await employeeRepository.findAll(supabase, {
      client_id: payload.client_id,
    });
    const bulkCreatePayload = employees.map((employee) => ({
      employee_id: employee.id,
      timeoff_type_id: payload.timeoff_type_id,
      quota: payload.quota,
      year: payload.year,
    }));
    return await timeoffQuotaRepository.bulkCreate(supabase, bulkCreatePayload);
  },
  createQuotaByEmployee: async (
    supabase: SupabaseClient,
    payload: CreateQuotaByEmployeePayload
  ) => {
    return await timeoffQuotaRepository.create(supabase, payload);
  },
  findOneQuotaByTypeAndEmployee: async (
    supabase: SupabaseClient,
    payload: TimeoffQuotaFindOneByTypeAndEmployeePayload
  ) => {
    return await timeoffQuotaRepository.findOne(supabase, payload);
  },
  findAllQuotaByClientWithEmployee: async (
    supabase: SupabaseClient,
    payload: TimeoffQuotaFindAllEmployeePayload
  ) => {
    return await timeoffQuotaRepository.findAllByClient(
      supabase,
      payload.client_id
    );
  },
};

const timeoffRequestService = {
  createRequest: async (
    supabase: SupabaseClient,
    payload: RequestTimeoffPayload
  ) => {
    const quota = await timeoffQuotaRepository.findOne(supabase, {
      employee_id: payload.employee_id,
      year: moment().year(),
    });

    if (!quota) {
      throw new Error();
    }

    const timeoffTotalDays =
      moment(payload.end_date).diff(moment(payload.start_date), "days") + 1;

    if (timeoffTotalDays > quota.quota) {
      throw new Error();
    }

    if (moment(payload.start_date).diff(moment()) < 14) {
      throw new Error();
    }

    const result = await timeoffRequestRepository.create(supabase, {
      ...payload,
      status: TimeoffStatus.PENDING,
    });

    return result;
  },
  reviewRequest: async (
    supabase: SupabaseClient,
    payload: TimeoffRequestReviewPayload
  ) => {
    const timeoff = await timeoffRequestRepository.findOne(supabase, {
      id: payload.timeoff_request_id,
    });

    if (!timeoff) {
      throw new Error();
    }

    if (timeoff.reviewed_by !== payload.reviewer_id) {
      throw new Error();
    }

    if (payload.status === TimeoffStatus.APPROVED) {
      const quota = await timeoffQuotaRepository.findOne(supabase, {
        employee_id: timeoff.employee_id,
        timeoff_type_id: timeoff.timeoff_type_id,
      });

      if (!quota) {
        throw new Error();
      }

      const timeoffTotalDays =
        moment(timeoff.end_date).diff(moment(timeoff.start_date), "days") + 1;

      await timeoffQuotaRepository.update(supabase, {
        id: quota.id,
        quota: quota.quota - timeoffTotalDays,
      });
    }

    const result = await timeoffRequestRepository.update(supabase, {
      id: payload.timeoff_request_id,
      status: payload.status,
    });

    return result;
  },
  findAllRequestsByClient: async (
    supabase: SupabaseClient,
    payload: TimeoffRequestFindAllByClientListPayload
  ) => {
    return await timeoffRequestRepository.findAll(supabase, {
      client_id: payload.client_id,
      status: payload.status,
    });
  },
  findAllRequestsByReviewer: async (
    supabase: SupabaseClient,
    payload: TimeoffRequestFindAllByReviewerListPayload
  ) => {
    return await timeoffRequestRepository.findAll(supabase, {
      reviewed_by: payload.reviewer_id,
      status: payload.status,
    });
  },
  findAllRequestsByDelegate: async (
    supabase: SupabaseClient,
    payload: TimeoffRequestFindAllByDelegateListPayload
  ) => {
    return await timeoffRequestRepository.findAll(supabase, {
      delegate_to: payload.delegate_id,
      status: payload.status,
    });
  },
  findAllByStatus: async (supabase: SupabaseClient, status: TimeoffStatus) => {
    return await timeoffRequestRepository.findAll(supabase, {
      status,
    });
  },
};

export default {
  ...timeoffTypeService,
  ...timeoffQuotaService,
  ...timeoffRequestService,
};
