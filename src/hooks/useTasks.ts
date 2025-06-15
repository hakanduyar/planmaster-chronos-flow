
import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Task, CreateTaskData, UpdateTaskData, TaskFilters, TaskSort } from '@/types/task';
import { useToast } from '@/hooks/use-toast';

export const useTasks = (filters?: TaskFilters, sort?: TaskSort) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: tasks = [], isLoading, error } = useQuery({
    queryKey: ['tasks', filters, sort],
    queryFn: async () => {
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

      const { data, error } = await query;

      if (error) throw error;
      return data as Task[];
    },
  });

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

  // Real-time subscription
  useEffect(() => {
    const channel = supabase
      .channel('tasks-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'tasks'
        },
        () => {
          queryClient.invalidateQueries({ queryKey: ['tasks'] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);

  return {
    tasks,
    isLoading,
    error,
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
