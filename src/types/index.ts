
export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  category: Category;
  dueDate?: Date;
  createdAt: Date;
  updatedAt: Date;
  tags?: string[];
  estimatedTime?: number; // minutes
  actualTime?: number; // minutes
}

export interface Category {
  id: string;
  name: string;
  color: string;
  icon: string;
  user_id?: string;
  emoji?: string;
  description?: string;
  created_at?: string;
  updated_at?: string;
  task_count?: number;
}

export interface DashboardStats {
  totalTasks: number;
  completedTasks: number;
  pendingTasks: number;
  overdueTasks: number;
  todayTasks: number;
  weekTasks: number;
  monthTasks: number;
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  type: 'task' | 'event';
  category?: Category;
  completed?: boolean;
}

export type ViewMode = 'day' | 'week' | 'month';
export type Priority = 'low' | 'medium' | 'high';

// Re-export from task types
export type { Task as TaskType, CreateTaskData, UpdateTaskData, TaskFilters, TaskSort } from './task';
