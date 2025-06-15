
import { supabase } from '@/integrations/supabase/client';
import { RecurrencePattern, CreatePatternData, UpdatePatternData, TaskInstance } from '@/types/pattern';

export const fetchPatterns = async (): Promise<RecurrencePattern[]> => {
  const { data, error } = await supabase
    .from('recurrence_patterns')
    .select(`
      *,
      category:categories(id, name, emoji, color)
    `)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data as RecurrencePattern[];
};

export const fetchTaskInstances = async (): Promise<TaskInstance[]> => {
  const { data, error } = await supabase
    .from('task_instances')
    .select(`
      *,
      category:categories(id, name, emoji, color)
    `)
    .order('due_date', { ascending: true });

  if (error) throw error;
  return data as TaskInstance[];
};

export const createPattern = async (patternData: CreatePatternData): Promise<RecurrencePattern> => {
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) throw new Error('User not authenticated');

  const { data, error } = await supabase
    .from('recurrence_patterns')
    .insert({
      ...patternData,
      user_id: userData.user.id,
    })
    .select(`
      *,
      category:categories(id, name, emoji, color)
    `)
    .single();

  if (error) throw error;
  return data as RecurrencePattern;
};

export const updatePattern = async (id: string, patternData: UpdatePatternData): Promise<RecurrencePattern> => {
  const { data, error } = await supabase
    .from('recurrence_patterns')
    .update(patternData)
    .eq('id', id)
    .select(`
      *,
      category:categories(id, name, emoji, color)
    `)
    .single();

  if (error) throw error;
  return data as RecurrencePattern;
};

export const deletePattern = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('recurrence_patterns')
    .delete()
    .eq('id', id);

  if (error) throw error;
};

export const generateTaskInstances = async (patternId: string, daysAhead: number = 30): Promise<number> => {
  const { data, error } = await supabase.rpc('generate_task_instances_for_pattern', {
    pattern_id: patternId,
    days_ahead: daysAhead
  });

  if (error) throw error;
  return data as number;
};

export const updateTaskInstance = async (id: string, updates: Partial<TaskInstance>): Promise<TaskInstance> => {
  const { data, error } = await supabase
    .from('task_instances')
    .update(updates)
    .eq('id', id)
    .select(`
      *,
      category:categories(id, name, emoji, color)
    `)
    .single();

  if (error) throw error;
  return data as TaskInstance;
};
