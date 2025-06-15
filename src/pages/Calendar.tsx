
import React from 'react';
import TaskCalendar from '@/components/calendar/TaskCalendar';

const Calendar = () => {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Takvim</h1>
        <p className="text-white/70">Görevlerinizi takvim görünümünde yönetin</p>
      </div>
      <TaskCalendar />
    </div>
  );
};

export default Calendar;
