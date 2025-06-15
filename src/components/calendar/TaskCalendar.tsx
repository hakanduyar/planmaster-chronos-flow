
import React, { useState, useMemo } from 'react';
import { Calendar, momentLocalizer, View, Event } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/tr';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { useTasks } from '@/hooks/useTasks';
import { Task } from '@/types/task';
import TaskModal from '@/components/tasks/TaskModal';
import CalendarEventModal from './CalendarEventModal';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './calendar.css';

// Moment.js'i Türkçe olarak ayarla
moment.locale('tr');
const localizer = momentLocalizer(moment);

interface CalendarEvent extends Event {
  task: Task;
  resource?: any;
}

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
    return tasks
      .filter(task => task.due_date)
      .map(task => {
        const dueDate = new Date(task.due_date!);
        const endDate = new Date(dueDate.getTime() + (task.estimated_time || 60) * 60000);
        
        return {
          id: task.id,
          title: task.title,
          start: dueDate,
          end: endDate,
          task,
          resource: {
            category: task.category,
            priority: task.priority,
            completed: task.completed
          }
        };
      });
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

  // Event style'ını kategoriye ve duruma göre belirle
  const eventStyleGetter = (event: CalendarEvent) => {
    const { task } = event;
    let backgroundColor = task.category?.color || '#3B82F6';
    
    if (task.completed) {
      backgroundColor = '#10B981'; // Yeşil - tamamlanan
    } else if (task.priority === 'high') {
      backgroundColor = '#EF4444'; // Kırmızı - yüksek öncelik
    }

    return {
      style: {
        backgroundColor,
        borderRadius: '6px',
        opacity: task.completed ? 0.7 : 1,
        color: 'white',
        border: 'none',
        fontSize: '12px',
        padding: '2px 6px'
      }
    };
  };

  const messages = {
    allDay: 'Tüm Gün',
    previous: 'Önceki',
    next: 'Sonraki',
    today: 'Bugün',
    month: 'Ay',
    week: 'Hafta',
    day: 'Gün',
    agenda: 'Ajanda',
    date: 'Tarih',
    time: 'Saat',
    event: 'Görev',
    noEventsInRange: 'Bu tarih aralığında görev yok',
    showMore: (total: number) => `+${total} daha`
  };

  return (
    <div className="space-y-4">
      {/* Takvim Header */}
      <Card className="bg-white/5 border-white/10">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            {/* Navigasyon */}
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleNavigate(moment(date).subtract(1, view === 'month' ? 'month' : view === 'week' ? 'week' : 'day').toDate())}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleNavigate(new Date())}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                Bugün
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleNavigate(moment(date).add(1, view === 'month' ? 'month' : view === 'week' ? 'week' : 'day').toDate())}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
              
              <h2 className="text-xl font-semibold text-white ml-4">
                {moment(date).format(view === 'month' ? 'MMMM YYYY' : view === 'week' ? 'DD MMMM YYYY' : 'DD MMMM YYYY')}
              </h2>
            </div>

            {/* Görünüm Butonları ve Görev Ekleme */}
            <div className="flex items-center space-x-2">
              <div className="flex bg-white/10 rounded-lg p-1">
                {(['month', 'week', 'day'] as View[]).map((v) => (
                  <Button
                    key={v}
                    variant={view === v ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => handleViewChange(v)}
                    className={`${
                      view === v 
                        ? 'bg-blue-600 text-white' 
                        : 'text-white/70 hover:text-white hover:bg-white/10'
                    } text-xs`}
                  >
                    {v === 'month' ? 'Ay' : v === 'week' ? 'Hafta' : 'Gün'}
                  </Button>
                ))}
              </div>
              
              <Button
                onClick={() => setShowTaskModal(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white"
                size="sm"
              >
                <Plus className="h-4 w-4 mr-2" />
                Görev Ekle
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Takvim */}
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
              onNavigate={handleNavigate}
              onView={handleViewChange}
              onSelectEvent={handleSelectEvent}
              onSelectSlot={handleSelectSlot}
              selectable
              popup
              eventPropGetter={eventStyleGetter}
              messages={messages}
              step={30}
              timeslots={2}
              defaultView="month"
              views={['month', 'week', 'day']}
              toolbar={false}
            />
          </div>
        </CardContent>
      </Card>

      {/* Task Modal */}
      <TaskModal
        isOpen={showTaskModal}
        onClose={() => {
          setShowTaskModal(false);
          setSelectedSlot(null);
        }}
        initialDueDate={selectedSlot?.start}
      />

      {/* Calendar Event Modal */}
      {selectedEvent && (
        <CalendarEventModal
          isOpen={showEventModal}
          onClose={() => {
            setShowEventModal(false);
            setSelectedEvent(null);
          }}
          event={selectedEvent}
        />
      )}
    </div>
  );
};

export default TaskCalendar;
