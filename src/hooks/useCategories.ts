
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Category, CreateCategoryData, UpdateCategoryData } from '@/types/category';
import { useToast } from '@/hooks/use-toast';

export const useCategories = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch categories
  const { data: categories = [], isLoading, error } = useQuery({
    queryKey: ['categories'],
    queryFn: async (): Promise<Category[]> => {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('categories')
        .select(`
          *,
          task_count:tasks(count)
        `)
        .eq('user_id', userData.user.id)
        .order('name');

      if (error) throw error;
      
      // Process task_count
      return (data || []).map(category => ({
        ...category,
        task_count: category.task_count?.[0]?.count || 0
      }));
    },
  });

  // Create category mutation
  const createCategoryMutation = useMutation({
    mutationFn: async (categoryData: CreateCategoryData) => {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('categories')
        .insert({
          ...categoryData,
          user_id: userData.user.id,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast({
        title: 'Başarılı!',
        description: 'Kategori başarıyla oluşturuldu',
      });
    },
    onError: (error: any) => {
      console.error('Category creation error:', error);
      toast({
        title: 'Hata!',
        description: 'Kategori oluşturulurken bir hata oluştu',
        variant: 'destructive',
      });
    },
  });

  // Update category mutation
  const updateCategoryMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdateCategoryData }) => {
      const { data: result, error } = await supabase
        .from('categories')
        .update(data)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast({
        title: 'Başarılı!',
        description: 'Kategori başarıyla güncellendi',
      });
    },
    onError: (error: any) => {
      console.error('Category update error:', error);
      toast({
        title: 'Hata!',
        description: 'Kategori güncellenirken bir hata oluştu',
        variant: 'destructive',
      });
    },
  });

  // Delete category mutation
  const deleteCategoryMutation = useMutation({
    mutationFn: async (id: string) => {
      // First, move all tasks from this category to "Diğer" category
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) throw new Error('User not authenticated');

      // Find the "Diğer" category
      const { data: otherCategory, error: findError } = await supabase
        .from('categories')
        .select('id')
        .eq('user_id', userData.user.id)
        .eq('name', 'Diğer')
        .single();

      if (findError || !otherCategory) {
        throw new Error('Diğer kategorisi bulunamadı');
      }

      // Move tasks to "Diğer" category
      const { error: updateTasksError } = await supabase
        .from('tasks')
        .update({ category_id: otherCategory.id })
        .eq('category_id', id);

      if (updateTasksError) throw updateTasksError;

      // Delete the category
      const { error: deleteError } = await supabase
        .from('categories')
        .delete()
        .eq('id', id);

      if (deleteError) throw deleteError;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      toast({
        title: 'Başarılı!',
        description: 'Kategori silindi ve görevler "Diğer" kategorisine taşındı',
      });
    },
    onError: (error: any) => {
      console.error('Category deletion error:', error);
      toast({
        title: 'Hata!',
        description: 'Kategori silinirken bir hata oluştu',
        variant: 'destructive',
      });
    },
  });

  return {
    categories,
    isLoading,
    error,
    createCategory: createCategoryMutation.mutate,
    updateCategory: updateCategoryMutation.mutate,
    deleteCategory: deleteCategoryMutation.mutate,
    isCreating: createCategoryMutation.isPending,
    isUpdating: updateCategoryMutation.isPending,
    isDeleting: deleteCategoryMutation.isPending,
  };
};
