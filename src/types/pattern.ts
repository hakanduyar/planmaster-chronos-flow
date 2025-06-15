
export type RecurrenceType = 'daily' | 'weekly' | 'monthly' | 'yearly';

export interface RecurrencePattern {
  id: string;
  user_id: string;
  title: string;
  description?: string;
  category_id: string;
  priority: 'low' | 'medium' | 'high';
  estimated_time?: number;
  recurrence_type: RecurrenceType;
  interval_value: number;
  days_of_week?: number[];
  day_of_month?: number;
  start_date: string;
  end_date?: string;
  max_occurrences?: number;
  is_active: boolean;
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

export interface TaskInstance {
  id: string;
  pattern_id: string;
  user_id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  category_id: string;
  due_date: string;
  estimated_time?: number;
  actual_time?: number;
  tags?: string[];
  notes?: string;
  is_pattern_instance: boolean;
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

export interface CreatePatternData {
  title: string;
  description?: string;
  category_id: string;
  priority?: 'low' | 'medium' | 'high';
  estimated_time?: number;
  recurrence_type: RecurrenceType;
  interval_value?: number;
  days_of_week?: number[];
  day_of_month?: number;
  start_date: string;
  end_date?: string;
  max_occurrences?: number;
  tags?: string[];
  notes?: string;
}

export interface UpdatePatternData {
  title?: string;
  description?: string;
  category_id?: string;
  priority?: 'low' | 'medium' | 'high';
  estimated_time?: number;
  recurrence_type?: RecurrenceType;
  interval_value?: number;
  days_of_week?: number[];
  day_of_month?: number;
  start_date?: string;
  end_date?: string;
  max_occurrences?: number;
  is_active?: boolean;
  tags?: string[];
  notes?: string;
}
