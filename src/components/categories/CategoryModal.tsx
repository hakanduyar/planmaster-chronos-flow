
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useCategories } from '@/hooks/useCategories';
import { Category, DEFAULT_COLORS, DEFAULT_EMOJIS } from '@/types/category';

const categorySchema = z.object({
  name: z.string().min(1, 'Kategori adı gereklidir'),
  description: z.string().optional(),
  emoji: z.string().min(1, 'Emoji seçilmelidir'),
  color: z.string().min(1, 'Renk seçilmelidir'),
});

type CategoryFormData = z.infer<typeof categorySchema>;

interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  category?: Category | null;
}

const CategoryModal: React.FC<CategoryModalProps> = ({
  isOpen,
  onClose,
  category,
}) => {
  const { createCategory, updateCategory, isCreating, isUpdating } = useCategories();
  const isEditing = !!category;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: '',
      description: '',
      emoji: DEFAULT_EMOJIS[0],
      color: DEFAULT_COLORS[0],
    },
  });

  const selectedEmoji = watch('emoji');
  const selectedColor = watch('color');

  useEffect(() => {
    if (category) {
      reset({
        name: category.name,
        description: category.description || '',
        emoji: category.emoji,
        color: category.color,
      });
    } else {
      reset({
        name: '',
        description: '',
        emoji: DEFAULT_EMOJIS[0],
        color: DEFAULT_COLORS[0],
      });
    }
  }, [category, reset]);

  const onSubmit = (data: CategoryFormData) => {
    if (isEditing && category) {
      updateCategory({ 
        id: category.id, 
        data: {
          name: data.name,
          description: data.description,
          emoji: data.emoji,
          color: data.color,
        }
      });
    } else {
      createCategory({
        name: data.name,
        emoji: data.emoji,
        color: data.color,
        description: data.description,
      });
    }
    onClose();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-gray-900/95 backdrop-blur-sm border-white/10 max-w-md">
        <DialogHeader>
          <DialogTitle className="text-white">
            {isEditing ? 'Kategoriyi Düzenle' : 'Yeni Kategori Oluştur'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-white">Kategori Adı</Label>
            <Input
              id="name"
              {...register('name')}
              placeholder="Kategori adını girin"
              className="bg-white/10 border-white/20 text-white placeholder-white/50"
            />
            {errors.name && (
              <p className="text-red-400 text-sm">{errors.name.message}</p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-white">Açıklama (İsteğe bağlı)</Label>
            <Textarea
              id="description"
              {...register('description')}
              placeholder="Kategori açıklaması"
              className="bg-white/10 border-white/20 text-white placeholder-white/50 resize-none"
              rows={3}
            />
          </div>

          {/* Emoji Selection */}
          <div className="space-y-2">
            <Label className="text-white">Emoji</Label>
            <div className="grid grid-cols-6 gap-2 max-h-32 overflow-y-auto p-2 bg-white/5 rounded-lg">
              {DEFAULT_EMOJIS.map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => setValue('emoji', emoji)}
                  className={`
                    p-2 rounded-lg text-xl hover:bg-white/10 transition-colors
                    ${selectedEmoji === emoji ? 'bg-blue-600/50 ring-2 ring-blue-400' : ''}
                  `}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          {/* Color Selection */}
          <div className="space-y-2">
            <Label className="text-white">Renk</Label>
            <div className="grid grid-cols-5 gap-2">
              {DEFAULT_COLORS.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setValue('color', color)}
                  className={`
                    w-8 h-8 rounded-lg transition-transform hover:scale-110
                    ${selectedColor === color ? 'ring-2 ring-white ring-offset-2 ring-offset-gray-900' : ''}
                  `}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          {/* Preview */}
          <div className="space-y-2">
            <Label className="text-white">Önizleme</Label>
            <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
              <div 
                className="w-10 h-10 rounded-lg flex items-center justify-center text-xl"
                style={{ backgroundColor: `${selectedColor}20` }}
              >
                {selectedEmoji}
              </div>
              <div>
                <p className="text-white font-medium">{watch('name') || 'Kategori Adı'}</p>
                <p className="text-white/60 text-sm">{watch('description') || 'Açıklama...'}</p>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="flex-1 bg-white/10 text-white hover:bg-white/20 border-white/20"
            >
              İptal
            </Button>
            <Button
              type="submit"
              disabled={isCreating || isUpdating}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
            >
              {isCreating || isUpdating 
                ? 'Kaydediliyor...' 
                : isEditing 
                  ? 'Güncelle' 
                  : 'Oluştur'
              }
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CategoryModal;
