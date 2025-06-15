
import React from 'react';
import { Calendar, momentLocalizer, View } from 'react-big-calendar';
import moment from 'moment';
import { Card, CardContent } from '@/components/ui/card';
import { CalendarEvent, calendarMessages, getEventStyle } from './CalendarConfig';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './calendar.css';

const localizer = momentLocalizer(moment);

interface CalendarMainProps {
  events: CalendarEvent[];
  view: View;
  date: Date;
  onNavigate: (date: Date) => void;
  onViewChange: (view: View) => void;
  onSelectEvent: (event: CalendarEvent) => void;
  onSelectSlot: (slotInfo: { start: Date; end: Date }) => void;
}

const CalendarMain: React.FC<CalendarMainProps> = ({
  events,
  view,
  date,
  onNavigate,
  onViewChange,
  onSelectEvent,
  onSelectSlot,
}) => {
  return (
    <Card className="bg-white/5 border-white/10">
      <CardContent className="p-0">
        <div className="calendar-container">
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 600, padding: '20px' }}
            view={view}
            date={date}
            onNavigate={onNavigate}
            onView={onViewChange}
            onSelectEvent={onSelectEvent}
            onSelectSlot={onSelectSlot}
            selectable
            popup
            eventPropGetter={getEventStyle}
            messages={calendarMessages}
            step={30}
            timeslots={2}
            defaultView="month"
            views={['month', 'week', 'day']}
            toolbar={false}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default CalendarMain;
