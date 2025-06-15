
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { Card, CardContent } from '@/components/ui/card';
import { Task } from '@/types/task';
import { useTasks } from '@/hooks/useTasks';
import TaskCardHeader from './TaskCardHeader';
import TaskCardMetadata from './TaskCardMetadata';
import TaskCardFooter from './TaskCardFooter';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
  className?: string;
}

const TaskCard: React.FC<TaskCardProps> = ({ 
  task, 
  onEdit, 
  onDelete,
  className = '' 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const { toggleTask, isToggling } = useTasks();

  const isOverdue = task.due_date && new Date(task.due_date) < new Date() && !task.completed;

  const handleToggle = () => {
    toggleTask(task);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      layout
      className={className}
    >
      <Card
        className={`
          task-card group cursor-pointer transition-all duration-300
          ${task.completed ? 'opacity-60' : ''}
          ${isOverdue ? 'border-red-500/50' : 'border-white/10'}
          hover:scale-[1.02] hover:shadow-lg hover:shadow-black/20
        `}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => onEdit(task)}
      >
        <CardContent className="p-4 space-y-3">
          <TaskCardHeader
            task={task}
            isHovered={isHovered}
            isToggling={isToggling}
            onToggle={handleToggle}
            onEdit={onEdit}
            onDelete={onDelete}
          />

          <TaskCardMetadata task={task} />

          <TaskCardFooter task={task} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default TaskCard;
