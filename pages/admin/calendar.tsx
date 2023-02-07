import React from "react";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';

import 'react-big-calendar/lib/css/react-big-calendar.css';

// layout for page

import Admin from "../../layouts/Admin";

const localizer: any = momentLocalizer(moment)

export default function CalendarLayout() {
    const events = [
        {
            start: moment().toDate(),
            end: moment()
                .add(1, "days")
                .toDate(),
            title: "Kurt PTO"
        }
    ];
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full px-4">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
            <Calendar
                defaultDate={new Date()}
                localizer={localizer}
                events={events}
                style={{ height: "100vh" }}
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
