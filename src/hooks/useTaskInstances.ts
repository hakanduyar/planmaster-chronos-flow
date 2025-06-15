
import { useQuery } from '@tanstack/react-query';
import { fetchTaskInstances } from '@/utils/patternQueries';

export const useTaskInstances = () => {
  const { data: taskInstances = [], isLoading, error } = useQuery({
    queryKey: ['task-instances'],
    queryFn: fetchTaskInstances,
  });

  return {
    taskInstances,
    isLoading,
    error,
  };
};
