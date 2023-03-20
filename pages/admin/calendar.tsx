import React, { useCallback, useEffect, useState } from "react";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';

import 'react-big-calendar/lib/css/react-big-calendar.css';

import Admin from "../../layouts/Admin";
import { CalendarEvents } from "../../modules/calendar/calendar.interface";
import timeoffService from "../../services/timeoff/timeoff.service";
import { TimeoffRequest, TimeoffStatus } from "../../modules/timeoff-request/timeoff-request.interface";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

const localizer: any = momentLocalizer(moment)

const CalendarLayout = () => {
  const supabase = useSupabaseClient();
  const [events, setEvents] = useState<CalendarEvents[]>([]);

  const toCalendarEvents = (timeoffRequest: TimeoffRequest): CalendarEvents => {
    return {
      start: timeoffRequest.start_date,
      end: timeoffRequest.end_date,
      title: `${timeoffRequest.employee_name} - ${timeoffRequest.type}`,
    };
  }

  const fetchTimeoffRequests = useCallback(async () => {
    try {
      const timeoffRequests = await timeoffService.findAllByStatus(supabase, TimeoffStatus.APPROVED);
      const calendarEvents = timeoffRequests.map(toCalendarEvents);
      setEvents(calendarEvents);
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    fetchTimeoffRequests();
  }, [fetchTimeoffRequests]);

  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full px-4">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
            <Calendar
              defaultDate={new Date()}
              localizer={localizer}
              events={events}
              style={{ height: "80vh" }}
              startAccessor="start"
              endAccessor="end"
            />
          </div>
        </div>
      </div>
    </>
  );
}

CalendarLayout.layout = Admin;

export default CalendarLayout;
