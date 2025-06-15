
import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { motion } from 'framer-motion';
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
import { Category, CreateCategoryData, UpdateCategoryData, DEFAULT_COLORS, DEFAULT_EMOJIS } from '@/types/category';

interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateCategoryData | UpdateCategoryData) => void;
  category?: Category;
  isLoading?: boolean;
}

const CategoryModal: React.FC<CategoryModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  category,
  isLoading = false,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    emoji: '📌',
    color: DEFAULT_COLORS[0],
    description: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name,
        emoji: category.emoji,
        color: category.color,
        description: category.description || '',
      });
    } else {
      setFormData({
        name: '',
        emoji: '📌',
        color: DEFAULT_COLORS[0],
        description: '',
      });
    }
    setErrors({});
  }, [category, isOpen]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Kategori adı gerekli';
    } else if (formData.name.length > 50) {
      newErrors.name = 'Kategori adı 50 karakteri geçemez';
    }

    if (formData.description && formData.description.length > 200) {
      newErrors.description = 'Açıklama 200 karakteri geçemez';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const submitData = {
      name: formData.name.trim(),
      emoji: formData.emoji,
      color: formData.color,
      description: formData.description.trim() || undefined,
    };

    onSubmit(submitData);
  };

  const isFormValid = formData.name.trim().length > 0 && Object.keys(errors).length === 0;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-gray-900/95 backdrop-blur-sm border-white/10">
        <DialogHeader>
          <DialogTitle className="text-white text-xl">
            {category ? 'Kategori Düzenle' : 'Yeni Kategori Ekle'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Category Name */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-white">Kategori Adı</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Kategori adını girin"
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
              maxLength={50}
            />
            {errors.name && (
              <p className="text-red-400 text-sm">{errors.name}</p>
            )}
          </div>

          {/* Emoji Picker */}
          <div className="space-y-2">
            <Label className="text-white">İkon</Label>
            <div className="grid grid-cols-6 gap-2 max-h-32 overflow-y-auto">
              {DEFAULT_EMOJIS.map((emoji) => (
                <motion.button
                  key={emoji}
                  type="button"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setFormData({ ...formData, emoji })}
                  className={`p-2 rounded-lg border-2 transition-colors text-xl ${
                    formData.emoji === emoji
                      ? 'border-blue-400 bg-blue-500/20'
                      : 'border-white/20 hover:border-white/40'
                  }`}
                >
                  {emoji}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Color Picker */}
          <div className="space-y-2">
            <Label className="text-white">Renk</Label>
            <div className="grid grid-cols-5 gap-2">
              {DEFAULT_COLORS.map((color) => (
                <motion.button
                  key={color}
                  type="button"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setFormData({ ...formData, color })}
                  className={`h-10 rounded-lg border-4 transition-transform ${
                    formData.color === color
                      ? 'border-white scale-110'
                      : 'border-white/30 hover:border-white/60'
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-white">Açıklama (Opsiyonel)</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Bu kategori hakkında not..."
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50 resize-none"
              rows={3}
              maxLength={200}
            />
            {errors.description && (
              <p className="text-red-400 text-sm">{errors.description}</p>
            )}
            <div className="text-right text-xs text-white/50">
              {formData.description.length}/200
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-4">
            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
              className="text-white hover:bg-white/10"
            >
              İptal
            </Button>
            <Button
              type="submit"
              disabled={!isFormValid || isLoading}
              className="planmaster-button"
            >
              {isLoading ? 'Kaydediliyor...' : category ? 'Güncelle' : 'Kategori Oluştur'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CategoryModal;
