
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
import { CalendarIcon, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { useTasks } from '@/hooks/useTasks';
import { useCategories } from '@/hooks/useCategories';
import { Task } from '@/types/task';

const taskSchema = z.object({
  title: z.string().min(1, 'Görev başlığı gereklidir'),
  description: z.string().optional(),
  category_id: z.string().min(1, 'Kategori seçilmelidir'),
  priority: z.enum(['low', 'medium', 'high']),
  due_date: z.date().optional(),
  estimated_time: z.number().min(1, 'Tahmini süre en az 1 dakika olmalıdır').optional(),
  notes: z.string().optional(),
});

type TaskFormData = z.infer<typeof taskSchema>;

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  task?: Task | null;
  initialDueDate?: Date;
}

const TaskModal: React.FC<TaskModalProps> = ({
  isOpen,
  onClose,
  task,
  initialDueDate,
}) => {
  const { createTask, updateTask, isCreating, isUpdating } = useTasks();
  const { categories } = useCategories();
  const isEditing = !!task;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: '',
      description: '',
      category_id: '',
      priority: 'medium',
      due_date: initialDueDate || undefined,
      estimated_time: 60,
      notes: '',
    },
  });

  const dueDate = watch('due_date');

  useEffect(() => {
    if (task) {
      reset({
        title: task.title,
        description: task.description || '',
        category_id: task.category_id,
        priority: task.priority,
        due_date: task.due_date ? new Date(task.due_date) : undefined,
        estimated_time: task.estimated_time || 60,
        notes: task.notes || '',
      });
    } else {
      reset({
        title: '',
        description: '',
        category_id: categories[0]?.id || '',
        priority: 'medium',
        due_date: initialDueDate || undefined,
        estimated_time: 60,
        notes: '',
      });
    }
  }, [task, reset, categories, initialDueDate]);

  const onSubmit = (data: TaskFormData) => {
    const taskData = {
      title: data.title,
      description: data.description,
      category_id: data.category_id,
      priority: data.priority,
      due_date: data.due_date?.toISOString(),
      estimated_time: data.estimated_time,
      notes: data.notes,
    };

    if (isEditing && task) {
      updateTask({ id: task.id, data: taskData });
    } else {
      createTask(taskData);
    }
    onClose();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-gray-900/95 backdrop-blur-sm border-white/10 max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-white">
            {isEditing ? 'Görevi Düzenle' : 'Yeni Görev Oluştur'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title" className="text-white">Görev Başlığı</Label>
            <Input
              id="title"
              {...register('title')}
              placeholder="Görev başlığını girin"
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

          {/* Category */}
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
            {errors.category_id && (
              <p className="text-red-400 text-sm">{errors.category_id.message}</p>
            )}
          </div>

          {/* Priority */}
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

          {/* Due Date */}
          <div className="space-y-2">
            <Label className="text-white">Bitiş Tarihi (İsteğe bağlı)</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal bg-white/10 border-white/20 text-white hover:bg-white/20",
                    !dueDate && "text-white/50"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dueDate ? format(dueDate, "dd MMMM yyyy", { locale: tr }) : "Tarih seçin"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-gray-900 border-white/20" align="start">
                <Calendar
                  mode="single"
                  selected={dueDate}
                  onSelect={(date) => setValue('due_date', date)}
                  initialFocus
                  className="pointer-events-auto"
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
            {errors.estimated_time && (
              <p className="text-red-400 text-sm">{errors.estimated_time.message}</p>
            )}
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes" className="text-white">Notlar (İsteğe bağlı)</Label>
            <Textarea
              id="notes"
              {...register('notes')}
              placeholder="Ek notlar"
              className="bg-white/10 border-white/20 text-white placeholder-white/50 resize-none"
              rows={3}
            />
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

export default TaskModal;
