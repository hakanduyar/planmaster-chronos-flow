
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Task, CreateTaskData, UpdateTaskData } from '@/types/task';
import { useToast } from '@/hooks/use-toast';

export const useTaskMutations = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const createTaskMutation = useMutation({
    mutationFn: async (taskData: CreateTaskData) => {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('tasks')
        .insert({
          ...taskData,
          user_id: userData.user.id,
        })
        .select(`
          *,
          category:categories(id, name, emoji, color)
        `)
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      toast({
        title: 'Başarılı!',
        description: 'Görev başarıyla oluşturuldu',
      });
    },
    onError: (error: any) => {
      console.error('Task creation error:', error);
      toast({
        title: 'Hata!',
        description: 'Görev oluşturulurken bir hata oluştu',
        variant: 'destructive',
      });
    },
  });

  const updateTaskMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdateTaskData }) => {
      const { data: result, error } = await supabase
        .from('tasks')
        .update(data)
        .eq('id', id)
        .select(`
          *,
          category:categories(id, name, emoji, color)
        `)
        .single();

      if (error) throw error;
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      toast({
        title: 'Başarılı!',
        description: 'Görev başarıyla güncellendi',
      });
    },
    onError: (error: any) => {
      console.error('Task update error:', error);
      toast({
        title: 'Hata!',
        description: 'Görev güncellenirken bir hata oluştu',
        variant: 'destructive',
      });
    },
  });

  const deleteTaskMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      toast({
        title: 'Başarılı!',
        description: 'Görev silindi',
      });
    },
    onError: (error: any) => {
      console.error('Task deletion error:', error);
      toast({
        title: 'Hata!',
        description: 'Görev silinirken bir hata oluştu',
        variant: 'destructive',
      });
    },
  });

  const toggleTaskMutation = useMutation({
    mutationFn: async (task: Task) => {
      const { data, error } = await supabase
        .from('tasks')
        .update({ 
          completed: !task.completed,
          actual_time: !task.completed ? task.estimated_time : task.actual_time
        })
        .eq('id', task.id)
        .select(`
          *,
          category:categories(id, name, emoji, color)
        `)
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      toast({
        title: data.completed ? 'Görev Tamamlandı! 🎉' : 'Görev Tekrar Aktif',
        description: data.completed ? 'Tebrikler, bir görev daha tamamladın!' : 'Görev aktif görevlere geri eklendi',
      });
    },
    onError: (error: any) => {
      console.error('Task toggle error:', error);
      toast({
        title: 'Hata!',
        description: 'Görev durumu değiştirilirken bir hata oluştu',
        variant: 'destructive',
      });
    },
  });

  return {
    createTask: createTaskMutation.mutate,
    updateTask: updateTaskMutation.mutate,
    deleteTask: deleteTaskMutation.mutate,
    toggleTask: toggleTaskMutation.mutate,
    isCreating: createTaskMutation.isPending,
    isUpdating: updateTaskMutation.isPending,
    isDeleting: deleteTaskMutation.isPending,
    isToggling: toggleTaskMutation.isPending,
  };
};
