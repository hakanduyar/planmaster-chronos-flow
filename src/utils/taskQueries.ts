
import { supabase } from '@/integrations/supabase/client';
import { TaskFilters, TaskSort, Task } from '@/types/task';
import { TaskInstance } from '@/types/pattern';

export const buildTaskQuery = (filters?: TaskFilters, sort?: TaskSort) => {
  let query = supabase
    .from('tasks')
    .select(`
      *,
      category:categories(id, name, emoji, color)
    `);

  // Apply filters
  if (filters) {
    if (filters.status === 'active') {
      query = query.eq('completed', false);
    } else if (filters.status === 'completed') {
      query = query.eq('completed', true);
    } else if (filters.status === 'overdue') {
      query = query.eq('completed', false).lt('due_date', new Date().toISOString());
    }

    if (filters.categories.length > 0) {
      query = query.in('category_id', filters.categories);
    }

    if (filters.priorities.length > 0) {
      query = query.in('priority', filters.priorities);
    }

    if (filters.search) {
      query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%,notes.ilike.%${filters.search}%`);
    }

    if (filters.dateRange) {
      query = query.gte('due_date', filters.dateRange.start).lte('due_date', filters.dateRange.end);
    }
  }

  // Apply sorting
  if (sort) {
    const ascending = sort.order === 'asc';
    query = query.order(sort.by, { ascending });
  } else {
    // Default sort: incomplete tasks first, then by due date
    query = query.order('completed').order('due_date', { ascending: true });
  }

  return query;
};

export const fetchTasks = async (filters?: TaskFilters, sort?: TaskSort): Promise<Task[]> => {
  const query = buildTaskQuery(filters, sort);
  const { data, error } = await query;

  if (error) throw error;
  return data as Task[];
};

export const fetchAllTasks = async (filters?: TaskFilters, sort?: TaskSort): Promise<(Task | TaskInstance)[]> => {
  // Hem normal görevleri hem de task instance'larını getir
  const [normalTasks, taskInstances] = await Promise.all([
    fetchTasks(filters, sort),
    fetchTaskInstances(filters, sort)
  ]);

  // İkisini birleştir ve tarih sıralaması yap
  const allTasks = [...normalTasks, ...taskInstances];
  
  return allTasks.sort((a, b) => {
    // Tamamlanmamış görevler önce
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }
    
    // Sonra due_date'e göre sırala
    if (a.due_date && b.due_date) {
      return new Date(a.due_date).getTime() - new Date(b.due_date).getTime();
    }
    
    // due_date olmayan görevler en sona
    if (a.due_date && !b.due_date) return -1;
    if (!a.due_date && b.due_date) return 1;
    
    return 0;
  });
};

const fetchTaskInstances = async (filters?: TaskFilters, sort?: TaskSort): Promise<TaskInstance[]> => {
  let query = supabase
    .from('task_instances')
    .select(`
      *,
      category:categories(id, name, emoji, color)
    `);

  // Apply filters (similar to normal tasks)
  if (filters) {
    if (filters.status === 'active') {
      query = query.eq('completed', false);
    } else if (filters.status === 'completed') {
      query = query.eq('completed', true);
    } else if (filters.status === 'overdue') {
      query = query.eq('completed', false).lt('due_date', new Date().toISOString());
    }

    if (filters.categories.length > 0) {
      query = query.in('category_id', filters.categories);
    }

    if (filters.priorities.length > 0) {
      query = query.in('priority', filters.priorities);
    }

    if (filters.search) {
      query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%,notes.ilike.%${filters.search}%`);
    }

    if (filters.dateRange) {
      query = query.gte('due_date', filters.dateRange.start).lte('due_date', filters.dateRange.end);
    }
  }

  const { data, error } = await query;
  if (error) throw error;
  
  return data as TaskInstance[];
};
