
import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Category, CreateCategoryData, UpdateCategoryData } from '@/types/category';
import { useToast } from '@/hooks/use-toast';

export const useCategories = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: categories = [], isLoading, error } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) throw error;
      return data as Category[];
    },
  });

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
      toast({
        title: 'Hata!',
        description: error.message === 'duplicate key value violates unique constraint "categories_user_id_name_key"' 
          ? 'Bu kategori zaten mevcut' 
          : 'Kategori oluşturulurken bir hata oluştu',
        variant: 'destructive',
      });
    },
  });

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
      toast({
        title: 'Hata!',
        description: error.message === 'duplicate key value violates unique constraint "categories_user_id_name_key"' 
          ? 'Bu kategori zaten mevcut' 
          : 'Kategori güncellenirken bir hata oluştu',
        variant: 'destructive',
      });
    },
  });

  const deleteCategoryMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('categories')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast({
        title: 'Başarılı!',
        description: 'Kategori silindi, görevler "Diğer" kategorisine taşındı',
        variant: 'destructive',
      });
    },
    onError: () => {
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
