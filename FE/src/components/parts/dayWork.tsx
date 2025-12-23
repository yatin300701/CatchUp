"use client";

import { useState, useCallback } from "react";
import { Calendar, dayjsLocalizer, type View } from "react-big-calendar";
import dayjs from "dayjs";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";

import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";

const localizer = dayjsLocalizer(dayjs);

type CalendarEvent = {
  title: string;
  start: Date;
  end: Date;
};

export default function DayWork() {
  const [date, setDate] = useState(new Date());
  const [view, setView] = useState<View>("day");
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  const onNavigate = useCallback((newDate: Date) => {
    setDate(newDate);
  }, []);

  const onView = useCallback((newView: View) => {
    setView(newView);
  }, []);

  const handleSelectSlot = useCallback(
    ({ start, end }: { start: Date; end: Date }) => {
      const title = prompt("Enter task title");
      if (!title) return;

      setEvents((prev) => [...prev, { title, start, end }]);
    },
    []
  );

  const handleEventDrop = useCallback(({ event, start, end }: any) => {
    setEvents((prev) =>
      prev.map((e) => (e === event ? { ...e, start, end } : e))
    );
  }, []);

  const DnDCalendar = withDragAndDrop<CalendarEvent>(Calendar);

  return (
    <DnDCalendar
      localizer={localizer}
      events={events}
      date={date}
      view={view}
      selectable
      onSelectSlot={handleSelectSlot}
      onEventDrop={handleEventDrop}
      onNavigate={onNavigate}
      onView={onView}
      views={["day", "agenda"]}
      style={{ height: 700 }}
    />
  );
}
