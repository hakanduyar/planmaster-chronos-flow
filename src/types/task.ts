
export interface Task {
  id: string;
  user_id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  category_id: string;
  due_date?: string;
  estimated_time?: number; // minutes
  actual_time?: number; // minutes
  tags?: string[];
  notes?: string;
  created_at: string;
  updated_at: string;
  // Join fields
  category?: {
    id: string;
    name: string;
    emoji: string;
    color: string;
  };
}

export interface CreateTaskData {
  title: string;
  description?: string;
  priority?: 'low' | 'medium' | 'high';
  category_id: string;
  due_date?: string;
  estimated_time?: number;
  tags?: string[];
  notes?: string;
}

export interface UpdateTaskData {
  title?: string;
  description?: string;
  completed?: boolean;
  priority?: 'low' | 'medium' | 'high';
  category_id?: string;
  due_date?: string;
  estimated_time?: number;
  actual_time?: number;
  tags?: string[];
  notes?: string;
}

export type TaskPriority = 'low' | 'medium' | 'high';
export type TaskStatus = 'all' | 'active' | 'completed' | 'overdue';
export type TaskSortBy = 'due_date' | 'priority' | 'created_at' | 'title' | 'estimated_time';
export type TaskSortOrder = 'asc' | 'desc';

export interface TaskFilters {
  status: TaskStatus;
  categories: string[];
  priorities: TaskPriority[];
  search: string;
  dateRange?: {
    start: string;
    end: string;
  };
}

export interface TaskSort {
  by: TaskSortBy;
  order: TaskSortOrder;
}
