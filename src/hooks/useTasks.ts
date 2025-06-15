
import { useQuery } from '@tanstack/react-query';
import { TaskFilters, TaskSort } from '@/types/task';
import { useTaskMutations } from './useTaskMutations';
import { useTasksRealtime } from './useTasksRealtime';
import { fetchTasks } from '@/utils/taskQueries';

export const useTasks = (filters?: TaskFilters, sort?: TaskSort) => {
  const { data: tasks = [], isLoading, error } = useQuery({
    queryKey: ['tasks', filters, sort],
    queryFn: () => fetchTasks(filters, sort),
  });

  const mutations = useTaskMutations();
  
  // Set up real-time subscription
  useTasksRealtime();

  return {
    tasks,
    isLoading,
    error,
    ...mutations,
  };
};
