"use client";

import { Calendar, momentLocalizer, View, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useState } from "react";

// Initialize moment before using it with the localizer
moment.locale('en-US');
const localizer = momentLocalizer(moment);

const BigCalendar = ({
  data,
}: {
  data: { title: string; start: Date; end: Date }[];
}) => {
  const [view, setView] = useState<View>(Views.WORK_WEEK);

  const handleOnChangeView = (selectedView: View) => {
    setView(selectedView);
  };

  // Convert date strings to moment objects if needed
  const events = data.map(event => ({
    ...event,
    start: moment(event.start).toDate(),
    end: moment(event.end).toDate()
  }));

  return (
    <Calendar
      className="bg-white h-fit dark:bg-[#18181b] text-black dark:text-gray-500 flex items-center p-4 rounded-md"
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      views={["work_week", "day"]}
      view={view}
      style={{ height: "98%" }}
      onView={handleOnChangeView}
      min={moment().hours(8).minutes(0).toDate()}
      max={moment().hours(17).minutes(0).toDate()}
    />
  );
};

export default BigCalendar;
