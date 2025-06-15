
import { supabase } from '@/integrations/supabase/client';
import { TaskFilters, TaskSort, Task } from '@/types/task';

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
