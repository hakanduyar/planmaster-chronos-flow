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
  autoFocus = true, 
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
      createTask({
        title: title.trim(),
        priority: 'medium',
        category_id: defaultCategory.id,
        estimated_time: 30,
        due_date: new Date().toISOString(),
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
    textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px'; // Max 3 lines
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-3"
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
            min-h-[2.5rem] max-h-[120px] resize-none transition-all duration-300
            bg-white/5 border-white/20 text-white placeholder:text-white/50
            focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20
            ${isSuccess ? 'border-green-400 ring-2 ring-green-400/20' : ''}
          `}
          disabled={isCreating}
        />
        
        {isCreating && (
          <div className="absolute right-3 top-3">
            <Loader2 className="h-4 w-4 animate-spin text-white/50" />
          </div>
        )}
      </div>

      <div className="flex justify-between items-center text-xs text-white/50">
        <span>
          {title.length > 0 && (
            <>
              Enter: Ekle • Shift+Enter: Yeni satır
            </>
          )}
        </span>
        <span>{title.length}/100</span>
      </div>

      {/* Mobile submit button */}
      <div className="block sm:hidden">
        <Button
          type="submit"
          disabled={!title.trim() || isCreating}
          className="w-full planmaster-button"
        >
          {isCreating ? (
            <Loader2 className="h-4 w-4 animate-spin mr-2" />
          ) : (
            <Plus className="h-4 w-4 mr-2" />
          )}
          Görev Ekle
        </Button>
      </div>
    </motion.form>
  );
};

export default QuickTaskInput;
