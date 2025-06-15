
import { Task, Category, DashboardStats } from '@/types';
import { addDays, subDays, addHours } from 'date-fns';

export const mockCategories: Category[] = [
  { id: '1', name: 'İş', color: '#3b82f6', icon: '💼' },
  { id: '2', name: 'Kişisel', color: '#10b981', icon: '👤' },
  { id: '3', name: 'Eğitim', color: '#f59e0b', icon: '📚' },
  { id: '4', name: 'Sağlık', color: '#ef4444', icon: '🏥' },
  { id: '5', name: 'Alışveriş', color: '#8b5cf6', icon: '🛒' },
];

export const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Proje sunumu hazırla',
    description: 'Q4 hedefleri için detaylı sunum hazırlanması',
    completed: false,
    priority: 'high',
    category: mockCategories[0],
    dueDate: addDays(new Date(), 2),
    createdAt: subDays(new Date(), 3),
    updatedAt: new Date(),
    tags: ['sunum', 'q4', 'hedefler'],
    estimatedTime: 120,
  },
  {
    id: '2',
    title: 'Spor antrenmanı',
    description: 'Haftalık cardio ve güç antrenmanı',
    completed: true,
    priority: 'medium',
    category: mockCategories[3],
    dueDate: new Date(),
    createdAt: subDays(new Date(), 1),
    updatedAt: new Date(),
    tags: ['spor', 'sağlık'],
    estimatedTime: 60,
    actualTime: 65,
  },
  {
    id: '3',
    title: 'React kurs videoları izle',
    description: 'Advanced React patterns üzerine çalışma',
    completed: false,
    priority: 'medium',
    category: mockCategories[2],
    dueDate: addDays(new Date(), 5),
    createdAt: subDays(new Date(), 2),
    updatedAt: new Date(),
    tags: ['react', 'eğitim', 'frontend'],
    estimatedTime: 180,
  },
  {
    id: '4',
    title: 'Market alışverişi',
    description: 'Haftalık temel ihtiyaçlar listesi',
    completed: false,
    priority: 'low',
    category: mockCategories[4],
    dueDate: addDays(new Date(), 1),
    createdAt: new Date(),
    updatedAt: new Date(),
    tags: ['market', 'yiyecek'],
    estimatedTime: 45,
  },
  {
    id: '5',
    title: 'Ekip toplantısı',
    description: 'Sprint retrospektifi ve planlama',
    completed: false,
    priority: 'high',
    category: mockCategories[0],
    dueDate: addHours(new Date(), 4),
    createdAt: subDays(new Date(), 1),
    updatedAt: new Date(),
    tags: ['toplantı', 'ekip', 'sprint'],
    estimatedTime: 90,
  },
];

export const getMockStats = (tasks: Task[]): DashboardStats => {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const weekStart = new Date(today);
  weekStart.setDate(today.getDate() - today.getDay());
  const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);

  return {
    totalTasks: tasks.length,
    completedTasks: tasks.filter(t => t.completed).length,
    pendingTasks: tasks.filter(t => !t.completed).length,
    overdueTasks: tasks.filter(t => !t.completed && t.dueDate && t.dueDate < now).length,
    todayTasks: tasks.filter(t => t.dueDate && t.dueDate >= today && t.dueDate < new Date(today.getTime() + 24 * 60 * 60 * 1000)).length,
    weekTasks: tasks.filter(t => t.dueDate && t.dueDate >= weekStart).length,
    monthTasks: tasks.filter(t => t.dueDate && t.dueDate >= monthStart).length,
  };
};
