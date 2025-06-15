
import { useQuery } from '@tanstack/react-query';
import { TaskFilters, TaskSort } from '@/types/task';
import { useTaskMutations } from './useTaskMutations';
import { useTasksRealtime } from './useTasksRealtime';
import { fetchTasks, fetchAllTasks } from '@/utils/taskQueries';

export const useTasks = (filters?: TaskFilters, sort?: TaskSort, includePatternInstances: boolean = false) => {
  const queryFn = includePatternInstances ? 
    () => fetchAllTasks(filters, sort) : 
    () => fetchTasks(filters, sort);

  const { data: tasks = [], isLoading, error } = useQuery({
    queryKey: ['tasks', filters, sort, includePatternInstances],
    queryFn,
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
