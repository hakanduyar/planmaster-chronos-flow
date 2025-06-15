
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Clock, Repeat } from 'lucide-react';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { usePatterns } from '@/hooks/usePatterns';
import { useCategories } from '@/hooks/useCategories';
import { RecurrencePattern, RecurrenceType } from '@/types/pattern';

const patternSchema = z.object({
  title: z.string().min(1, 'Pattern başlığı gereklidir'),
  description: z.string().optional(),
  category_id: z.string().min(1, 'Kategori seçilmelidir'),
  priority: z.enum(['low', 'medium', 'high']),
  estimated_time: z.number().min(1, 'Tahmini süre en az 1 dakika olmalıdır').optional(),
  recurrence_type: z.enum(['daily', 'weekly', 'monthly', 'yearly']),
  interval_value: z.number().min(1, 'Aralık değeri en az 1 olmalıdır'),
  start_date: z.date(),
  end_date: z.date().optional(),
  max_occurrences: z.number().min(1).optional(),
  notes: z.string().optional(),
});

type PatternFormData = z.infer<typeof patternSchema>;

interface PatternModalProps {
  isOpen: boolean;
  onClose: () => void;
  pattern?: RecurrencePattern | null;
}

const PatternModal: React.FC<PatternModalProps> = ({
  isOpen,
  onClose,
  pattern,
}) => {
  const { createPattern, updatePattern, isCreating, isUpdating } = usePatterns();
  const { categories } = useCategories();
  const isEditing = !!pattern;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<PatternFormData>({
    resolver: zodResolver(patternSchema),
    defaultValues: {
      title: '',
      description: '',
      category_id: '',
      priority: 'medium',
      estimated_time: 60,
      recurrence_type: 'daily',
      interval_value: 1,
      start_date: new Date(),
      end_date: undefined,
      max_occurrences: undefined,
      notes: '',
    },
  });

  const startDate = watch('start_date');
  const endDate = watch('end_date');
  const recurrenceType = watch('recurrence_type');

  useEffect(() => {
    if (pattern) {
      reset({
        title: pattern.title,
        description: pattern.description || '',
        category_id: pattern.category_id,
        priority: pattern.priority,
        estimated_time: pattern.estimated_time || 60,
        recurrence_type: pattern.recurrence_type,
        interval_value: pattern.interval_value,
        start_date: new Date(pattern.start_date),
        end_date: pattern.end_date ? new Date(pattern.end_date) : undefined,
        max_occurrences: pattern.max_occurrences || undefined,
        notes: pattern.notes || '',
      });
    } else {
      reset({
        title: '',
        description: '',
        category_id: categories[0]?.id || '',
        priority: 'medium',
        estimated_time: 60,
        recurrence_type: 'daily',
        interval_value: 1,
        start_date: new Date(),
        end_date: undefined,
        max_occurrences: undefined,
        notes: '',
      });
    }
  }, [pattern, reset, categories]);

  const onSubmit = (data: PatternFormData) => {
    const patternData = {
      title: data.title,
      description: data.description,
      category_id: data.category_id,
      priority: data.priority,
      estimated_time: data.estimated_time,
      recurrence_type: data.recurrence_type,
      interval_value: data.interval_value,
      start_date: data.start_date.toISOString().split('T')[0],
      end_date: data.end_date?.toISOString().split('T')[0],
      max_occurrences: data.max_occurrences,
      notes: data.notes,
    };

    if (isEditing && pattern) {
      updatePattern({ id: pattern.id, data: patternData });
    } else {
      createPattern(patternData);
    }
    onClose();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const getRecurrenceLabel = (type: RecurrenceType) => {
    switch (type) {
      case 'daily': return 'Günlük';
      case 'weekly': return 'Haftalık';
      case 'monthly': return 'Aylık';
      case 'yearly': return 'Yıllık';
      default: return type;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-gray-900/95 backdrop-blur-sm border-white/10 max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-white flex items-center gap-2">
            <Repeat className="h-5 w-5" />
            {isEditing ? 'Pattern Düzenle' : 'Yeni Tekrarlayan Görev'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title" className="text-white">Görev Başlığı</Label>
            <Input
              id="title"
              {...register('title')}
              placeholder="Tekrarlayan görev başlığı"
              className="bg-white/10 border-white/20 text-white placeholder-white/50"
            />
            {errors.title && (
              <p className="text-red-400 text-sm">{errors.title.message}</p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-white">Açıklama (İsteğe bağlı)</Label>
            <Textarea
              id="description"
              {...register('description')}
              placeholder="Görev açıklaması"
              className="bg-white/10 border-white/20 text-white placeholder-white/50 resize-none"
              rows={3}
            />
          </div>

          {/* Category & Priority */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label className="text-white">Kategori</Label>
              <Select onValueChange={(value) => setValue('category_id', value)} value={watch('category_id')}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Kategori seçin" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-white/20">
                  {categories.map((category) => (
                    <SelectItem 
                      key={category.id} 
                      value={category.id}
                      className="text-white hover:bg-white/10"
                    >
                      <div className="flex items-center space-x-2">
                        <span>{category.emoji}</span>
                        <span>{category.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-white">Öncelik</Label>
              <Select onValueChange={(value) => setValue('priority', value as 'low' | 'medium' | 'high')} value={watch('priority')}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-white/20">
                  <SelectItem value="low" className="text-white hover:bg-white/10">Düşük</SelectItem>
                  <SelectItem value="medium" className="text-white hover:bg-white/10">Orta</SelectItem>
                  <SelectItem value="high" className="text-white hover:bg-white/10">Yüksek</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Recurrence Settings */}
          <div className="space-y-3 border border-white/10 rounded-lg p-3">
            <Label className="text-white font-medium">Tekrarlama Ayarları</Label>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label className="text-white">Tür</Label>
                <Select onValueChange={(value) => setValue('recurrence_type', value as RecurrenceType)} value={recurrenceType}>
                  <SelectTrigger className="bg-white/10 border-white/20 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-white/20">
                    <SelectItem value="daily" className="text-white hover:bg-white/10">Günlük</SelectItem>
                    <SelectItem value="weekly" className="text-white hover:bg-white/10">Haftalık</SelectItem>
                    <SelectItem value="monthly" className="text-white hover:bg-white/10">Aylık</SelectItem>
                    <SelectItem value="yearly" className="text-white hover:bg-white/10">Yıllık</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-white">Her</Label>
                <Input
                  type="number"
                  {...register('interval_value', { valueAsNumber: true })}
                  min="1"
                  className="bg-white/10 border-white/20 text-white"
                />
              </div>
            </div>
          </div>

          {/* Start Date */}
          <div className="space-y-2">
            <Label className="text-white">Başlangıç Tarihi</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal bg-white/10 border-white/20 text-white hover:bg-white/20",
                    !startDate && "text-white/50"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {startDate ? format(startDate, "dd MMMM yyyy", { locale: tr }) : "Tarih seçin"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-gray-900 border-white/20" align="start">
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={(date) => setValue('start_date', date || new Date())}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Estimated Time */}
          <div className="space-y-2">
            <Label htmlFor="estimated_time" className="text-white">Tahmini Süre (dakika)</Label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 h-4 w-4" />
              <Input
                id="estimated_time"
                type="number"
                {...register('estimated_time', { valueAsNumber: true })}
                placeholder="60"
                className="pl-10 bg-white/10 border-white/20 text-white placeholder-white/50"
              />
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

export default PatternModal;
