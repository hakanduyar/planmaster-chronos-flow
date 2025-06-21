
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useTasks } from '@/hooks/useTasks';
import { useCategories } from '@/hooks/useCategories';

interface QuickTaskInputProps {
  autoFocus?: boolean;
  onTaskCreated?: () => void;
}

const QuickTaskInput: React.FC<QuickTaskInputProps> = ({ 
  autoFocus = false, 
  onTaskCreated 
}) => {
  const [title, setTitle] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { createTask, isCreating } = useTasks();
  const { categories } = useCategories();

  // Find "Diğer" category as default
  const defaultCategory = categories.find(cat => cat.name === 'Diğer') || categories[0];

  useEffect(() => {
    if (autoFocus && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [autoFocus]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || isCreating || !defaultCategory) return;

    try {
      const today = new Date();
      today.setHours(23, 59, 59, 999); // End of today

      createTask({
        title: title.trim(),
        priority: 'medium',
        category_id: defaultCategory.id,
        estimated_time: 30,
        due_date: today.toISOString(),
      });

      // Success animation
      setIsSuccess(true);
      setTitle('');
      
      // Reset success state
      setTimeout(() => setIsSuccess(false), 500);
      
      // Keep focus
      if (textareaRef.current) {
        textareaRef.current.focus();
      }

      onTaskCreated?.();
    } catch (error) {
      console.error('Quick task creation failed:', error);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(e.target.value);
    
    // Auto-resize textarea
    const textarea = e.target;
    textarea.style.height = 'auto';
    textarea.style.height = Math.min(textarea.scrollHeight, 60) + 'px'; // Max 2.5 lines on mobile
  };

  if (!defaultCategory) {
    return (
      <div className="text-white/50 text-xs sm:text-sm">
        Kategori yükleniyor...
      </div>
    );
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-2 sm:space-y-3"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="relative">
        <Textarea
          ref={textareaRef}
          value={title}
          onChange={handleTextareaChange}
          onKeyDown={handleKeyDown}
          placeholder="Görev ekle ve Enter'a bas..."
          className={`
            min-h-[2rem] sm:min-h-[2.5rem] max-h-[60px] sm:max-h-[80px] resize-none transition-all duration-300 text-xs sm:text-sm
            bg-white/5 border-white/20 text-white placeholder:text-white/50
            focus:border-blue-400 focus:ring-1 focus:ring-blue-400/20
            ${isSuccess ? 'border-green-400 ring-1 ring-green-400/20' : ''}
          `}
          disabled={isCreating}
        />
        
        {isCreating && (
          <div className="absolute right-2 sm:right-3 top-2 sm:top-3">
            <Loader2 className="h-3 w-3 animate-spin text-white/50" />
          </div>
        )}
      </div>

      <div className="flex justify-between items-center text-xs text-white/50">
        <span className="truncate">
          {title.length > 0 && (
            <span className="hidden sm:inline">
              Enter: Ekle • Shift+Enter: Yeni satır
            </span>
          )}
        </span>
        <span className="flex-shrink-0">{title.length}/100</span>
      </div>

      {/* Always show submit button on mobile */}
      <div className="block">
        <Button
          type="submit"
          disabled={!title.trim() || isCreating}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm h-7 sm:h-8"
        >
          {isCreating ? (
            <Loader2 className="h-3 w-3 animate-spin mr-1 sm:mr-2" />
          ) : (
            <Plus className="h-3 w-3 mr-1 sm:mr-2" />
          )}
          Görev Ekle
        </Button>
      </div>
    </motion.form>
  );
};

export default QuickTaskInput;
