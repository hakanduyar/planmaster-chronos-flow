
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, Clock, Save, X, FileText } from 'lucide-react';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import { useTasks } from '@/hooks/useTasks';
import { useCategories } from '@/hooks/useCategories';
import { Task, CreateTaskData, UpdateTaskData } from '@/types/task';

const taskSchema = z.object({
  title: z.string().min(1, 'Görev başlığı gerekli').max(100, 'Maksimum 100 karakter'),
  description: z.string().max(500, 'Maksimum 500 karakter').optional(),
  category_id: z.string().min(1, 'Kategori seçimi gerekli'),
  priority: z.enum(['low', 'medium', 'high']),
  due_date: z.date().optional(),
  estimated_time: z.number().min(15).max(480),
  notes: z.string().max(1000, 'Maksimum 1000 karakter').optional(),
});

type TaskFormData = z.infer<typeof taskSchema>;

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  task?: Task | null;
}

const TaskModal: React.FC<TaskModalProps> = ({ isOpen, onClose, task }) => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [customTag, setCustomTag] = useState('');
  const { createTask, updateTask, isCreating, isUpdating } = useTasks();
  const { categories } = useCategories();
  
  const isEditing = !!task;
  const isLoading = isCreating || isUpdating;

  const defaultCategory = categories.find(cat => cat.name === 'Diğer') || categories[0];

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isValid },
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: '',
      description: '',
      category_id: defaultCategory?.id || '',
      priority: 'medium',
      estimated_time: 30,
      notes: '',
    },
  });

  const watchedEstimatedTime = watch('estimated_time');
  const watchedDueDate = watch('due_date');

  // Reset form when task changes
  useEffect(() => {
    if (isOpen) {
      if (task) {
        reset({
          title: task.title,
          description: task.description || '',
          category_id: task.category_id,
          priority: task.priority,
          due_date: task.due_date ? new Date(task.due_date) : undefined,
          estimated_time: task.estimated_time || 30,
          notes: task.notes || '',
        });
        setSelectedTags(task.tags || []);
      } else {
        reset({
          title: '',
          description: '',
          category_id: defaultCategory?.id || '',
          priority: 'medium',
          estimated_time: 30,
          notes: '',
        });
        setSelectedTags([]);
      }
    }
  }, [isOpen, task, reset, defaultCategory]);

  const onSubmit = (data: TaskFormData) => {
    const taskData = {
      ...data,
      due_date: data.due_date?.toISOString(),
      tags: selectedTags.length > 0 ? selectedTags : undefined,
    };

    if (isEditing && task) {
      updateTask({ id: task.id, data: taskData as UpdateTaskData });
    } else {
      createTask(taskData as CreateTaskData);
    }
    
    onClose();
  };

  const addTag = () => {
    if (customTag.trim() && !selectedTags.includes(customTag.trim())) {
      setSelectedTags([...selectedTags, customTag.trim()]);
      setCustomTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setSelectedTags(selectedTags.filter(tag => tag !== tagToRemove));
  };

  const formatDuration = (minutes: number) => {
    if (minutes < 60) return `${minutes} dakika`;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}sa ${remainingMinutes > 0 ? `${remainingMinutes}dk` : ''}`;
  };

  const quickTimeOptions = [15, 30, 60, 120, 240];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-900/95 backdrop-blur-sm border-white/10 max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-white flex items-center">
            <FileText className="w-5 h-5 mr-2 text-blue-400" />
            {isEditing ? 'Görev Düzenle' : 'Yeni Görev'}
          </DialogTitle>
          <DialogDescription className="text-white/70">
            {isEditing ? 'Görev bilgilerini güncelleyin' : 'Detaylı görev bilgilerini girin'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title" className="text-white">
              Görev Başlığı <span className="text-red-400">*</span>
            </Label>
            <Input
              id="title"
              {...register('title')}
              placeholder="Görevinizi yazın..."
              className="bg-white/5 border-white/20 text-white placeholder:text-white/50"
              maxLength={100}
            />
            {errors.title && (
              <p className="text-red-400 text-sm">{errors.title.message}</p>
            )}
            <div className="text-right text-xs text-white/50">
              {watch('title')?.length || 0}/100
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-white">Açıklama</Label>
            <Textarea
              id="description"
              {...register('description')}
              placeholder="Görev detayları..."
              className="bg-white/5 border-white/20 text-white placeholder:text-white/50 min-h-[80px]"
              maxLength={500}
            />
            {errors.description && (
              <p className="text-red-400 text-sm">{errors.description.message}</p>
            )}
            <div className="text-right text-xs text-white/50">
              {watch('description')?.length || 0}/500
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Category */}
            <div className="space-y-2">
              <Label className="text-white">
                Kategori <span className="text-red-400">*</span>
              </Label>
              <Select
                value={watch('category_id')}
                onValueChange={(value) => setValue('category_id', value)}
              >
                <SelectTrigger className="bg-white/5 border-white/20 text-white">
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
                        <div 
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: category.color }}
                        />
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
              <Select
                value={watch('priority')}
                onValueChange={(value: 'low' | 'medium' | 'high') => setValue('priority', value)}
              >
                <SelectTrigger className="bg-white/5 border-white/20 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-white/20">
                  <SelectItem value="high" className="text-white hover:bg-white/10">
                    <div className="flex items-center space-x-2">
                      <span className="text-red-400">🔴</span>
                      <span>Yüksek</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="medium" className="text-white hover:bg-white/10">
                    <div className="flex items-center space-x-2">
                      <span className="text-yellow-400">🟡</span>
                      <span>Orta</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="low" className="text-white hover:bg-white/10">
                    <div className="flex items-center space-x-2">
                      <span className="text-green-400">🟢</span>
                      <span>Düşük</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Due Date */}
          <div className="space-y-2">
            <Label className="text-white">Tarih</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start bg-white/5 border-white/20 text-white hover:bg-white/10"
                >
                  <CalendarDays className="mr-2 h-4 w-4" />
                  {watchedDueDate ? (
                    format(watchedDueDate, 'dd MMMM yyyy', { locale: tr })
                  ) : (
                    'Tarih seçin'
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-gray-900 border-white/20">
                <Calendar
                  mode="single"
                  selected={watchedDueDate}
                  onSelect={(date) => setValue('due_date', date)}
                  locale={tr}
                  className="text-white"
                />
              </PopoverContent>
            </Popover>
            <div className="flex space-x-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setValue('due_date', new Date())}
                className="text-xs bg-white/5 border-white/20 text-white hover:bg-white/10"
              >
                Bugün
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setValue('due_date', new Date(Date.now() + 24 * 60 * 60 * 1000))}
                className="text-xs bg-white/5 border-white/20 text-white hover:bg-white/10"
              >
                Yarın
              </Button>
            </div>
          </div>

          {/* Estimated Time */}
          <div className="space-y-4">
            <Label className="text-white flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              Tahmini Süre: {formatDuration(watchedEstimatedTime)}
            </Label>
            <Slider
              value={[watchedEstimatedTime]}
              onValueChange={(value) => setValue('estimated_time', value[0])}
              max={480}
              min={15}
              step={15}
              className="w-full"
            />
            <div className="flex space-x-2">
              {quickTimeOptions.map((minutes) => (
                <Button
                  key={minutes}
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setValue('estimated_time', minutes)}
                  className="text-xs bg-white/5 border-white/20 text-white hover:bg-white/10"
                >
                  {formatDuration(minutes)}
                </Button>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <Label className="text-white">Etiketler</Label>
            <div className="flex space-x-2">
              <Input
                value={customTag}
                onChange={(e) => setCustomTag(e.target.value)}
                placeholder="Etiket ekle..."
                className="bg-white/5 border-white/20 text-white placeholder:text-white/50"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addTag();
                  }
                }}
              />
              <Button
                type="button"
                onClick={addTag}
                variant="outline"
                className="bg-white/5 border-white/20 text-white hover:bg-white/10"
              >
                Ekle
              </Button>
            </div>
            {selectedTags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {selectedTags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 cursor-pointer"
                    onClick={() => removeTag(tag)}
                  >
                    {tag} <X className="w-3 h-3 ml-1" />
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes" className="text-white">Notlar</Label>
            <Textarea
              id="notes"
              {...register('notes')}
              placeholder="Serbest notlar..."
              className="bg-white/5 border-white/20 text-white placeholder:text-white/50 min-h-[100px]"
              maxLength={1000}
            />
            <div className="text-right text-xs text-white/50">
              {watch('notes')?.length || 0}/1000
            </div>
          </div>

          <DialogFooter className="space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="bg-white/5 border-white/20 text-white hover:bg-white/10"
            >
              İptal
            </Button>
            <Button
              type="submit"
              disabled={!isValid || isLoading}
              className="planmaster-button"
            >
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                />
              ) : (
                <Save className="w-4 h-4 mr-2" />
              )}
              {isEditing ? 'Güncelle' : 'Oluştur'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TaskModal;
