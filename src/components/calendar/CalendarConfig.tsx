
import { Task } from '@/types/task';

export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  task: Task;
  resource?: any;
}

export const calendarMessages = {
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

export const getEventStyle = (event: CalendarEvent) => {
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

export const transformTasksToEvents = (tasks: Task[]): CalendarEvent[] => {
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
};
