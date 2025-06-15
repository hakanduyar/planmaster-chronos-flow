
import React, { useState, useMemo } from 'react';
import { View } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/tr';
import { useTasks } from '@/hooks/useTasks';
import TaskModal from '@/components/tasks/TaskModal';
import CalendarEventModal from './CalendarEventModal';
import CalendarHeader from './CalendarHeader';
import CalendarMain from './CalendarMain';
import { CalendarEvent, transformTasksToEvents } from './CalendarConfig';

// Moment.js'i Türkçe olarak ayarla
moment.locale('tr');

const TaskCalendar: React.FC = () => {
  const [view, setView] = useState<View>('month');
  const [date, setDate] = useState(new Date());
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<{ start: Date; end: Date } | null>(null);

  const { tasks } = useTasks();

  // Görevleri takvim eventlerine dönüştür
  const events: CalendarEvent[] = useMemo(() => {
    return transformTasksToEvents(tasks);
  }, [tasks]);

  const handleSelectEvent = (event: CalendarEvent) => {
    setSelectedEvent(event);
    setShowEventModal(true);
  };

  const handleSelectSlot = ({ start, end }: { start: Date; end: Date }) => {
    setSelectedSlot({ start, end });
    setShowTaskModal(true);
  };

  const handleNavigate = (newDate: Date) => {
    setDate(newDate);
  };

  const handleViewChange = (newView: View) => {
    setView(newView);
  };

  const handleAddTask = () => {
    setShowTaskModal(true);
  };

  const handleCloseTaskModal = () => {
    setShowTaskModal(false);
    setSelectedSlot(null);
  };

  const handleCloseEventModal = () => {
    setShowEventModal(false);
    setSelectedEvent(null);
  };

  return (
    <div className="space-y-4">
      <CalendarHeader
        view={view}
        date={date}
        onNavigate={handleNavigate}
        onViewChange={handleViewChange}
        onAddTask={handleAddTask}
      />

      <CalendarMain
        events={events}
        view={view}
        date={date}
        onNavigate={handleNavigate}
        onViewChange={handleViewChange}
        onSelectEvent={handleSelectEvent}
        onSelectSlot={handleSelectSlot}
      />

      <TaskModal
        isOpen={showTaskModal}
        onClose={handleCloseTaskModal}
        initialDueDate={selectedSlot?.start}
      />

      {selectedEvent && (
        <CalendarEventModal
          isOpen={showEventModal}
          onClose={handleCloseEventModal}
          event={selectedEvent}
        />
      )}
    </div>
  );
};

export default TaskCalendar;
