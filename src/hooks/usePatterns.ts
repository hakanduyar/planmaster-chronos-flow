
import { useQuery } from '@tanstack/react-query';
import { usePatternMutations } from './usePatternMutations';
import { fetchPatterns } from '@/utils/patternQueries';

export const usePatterns = () => {
  const { data: patterns = [], isLoading, error } = useQuery({
    queryKey: ['patterns'],
    queryFn: fetchPatterns,
  });

  const mutations = usePatternMutations();

  return {
    patterns,
    isLoading,
    error,
    ...mutations,
  };
};
