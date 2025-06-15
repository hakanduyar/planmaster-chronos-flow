
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { 
  createPattern, 
  updatePattern, 
  deletePattern, 
  generateTaskInstances 
} from '@/utils/patternQueries';
import { CreatePatternData, UpdatePatternData } from '@/types/pattern';

export const usePatternMutations = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const createPatternMutation = useMutation({
    mutationFn: createPattern,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['patterns'] });
      toast({
        title: 'Başarılı!',
        description: 'Tekrarlayan görev pattern\'ı oluşturuldu',
      });
    },
    onError: (error: any) => {
      console.error('Pattern creation error:', error);
      toast({
        title: 'Hata!',
        description: 'Pattern oluşturulurken bir hata oluştu',
        variant: 'destructive',
      });
    },
  });

  const updatePatternMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdatePatternData }) => 
      updatePattern(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['patterns'] });
      queryClient.invalidateQueries({ queryKey: ['task-instances'] });
      toast({
        title: 'Başarılı!',
        description: 'Pattern güncellendi',
      });
    },
    onError: (error: any) => {
      console.error('Pattern update error:', error);
      toast({
        title: 'Hata!',
        description: 'Pattern güncellenirken bir hata oluştu',
        variant: 'destructive',
      });
    },
  });

  const deletePatternMutation = useMutation({
    mutationFn: deletePattern,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['patterns'] });
      queryClient.invalidateQueries({ queryKey: ['task-instances'] });
      toast({
        title: 'Başarılı!',
        description: 'Pattern silindi',
      });
    },
    onError: (error: any) => {
      console.error('Pattern deletion error:', error);
      toast({
        title: 'Hata!',
        description: 'Pattern silinirken bir hata oluştu',
        variant: 'destructive',
      });
    },
  });

  const generateInstancesMutation = useMutation({
    mutationFn: ({ patternId, daysAhead }: { patternId: string; daysAhead?: number }) =>
      generateTaskInstances(patternId, daysAhead),
    onSuccess: (instancesCreated: number) => {
      queryClient.invalidateQueries({ queryKey: ['task-instances'] });
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      toast({
        title: 'Başarılı!',
        description: `${instancesCreated} adet görev instance'ı oluşturuldu`,
      });
    },
    onError: (error: any) => {
      console.error('Generate instances error:', error);
      toast({
        title: 'Hata!',
        description: 'Görev instance\'ları oluşturulurken bir hata oluştu',
        variant: 'destructive',
      });
    },
  });

  return {
    createPattern: createPatternMutation.mutate,
    updatePattern: updatePatternMutation.mutate,
    deletePattern: deletePatternMutation.mutate,
    generateInstances: generateInstancesMutation.mutate,
    isCreating: createPatternMutation.isPending,
    isUpdating: updatePatternMutation.isPending,
    isDeleting: deletePatternMutation.isPending,
    isGenerating: generateInstancesMutation.isPending,
  };
};
