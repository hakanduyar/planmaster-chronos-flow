
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import {
  MoreHorizontal,
  Edit,
  Trash2,
  Clock,
  Calendar,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Card, CardContent } from '@/components/ui/card';
import { Task } from '@/types/task';
import { useTasks } from '@/hooks/useTasks';

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
  const isToday = task.due_date && 
    format(new Date(task.due_date), 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd');

  const handleToggle = () => {
    toggleTask(task);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-400 bg-red-500/20';
      case 'medium': return 'text-yellow-400 bg-yellow-500/20';
      case 'low': return 'text-green-400 bg-green-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return '🔴';
      case 'medium': return '🟡';
      case 'low': return '🟢';
      default: return '⚪';
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'high': return 'Yüksek';
      case 'medium': return 'Orta';
      case 'low': return 'Düşük';
      default: return priority;
    }
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
          {/* Header with checkbox and actions */}
          <div className="flex items-start justify-between">
            <div 
              className="flex items-start space-x-3 flex-1"
              onClick={(e) => e.stopPropagation()}
            >
              <Checkbox
                checked={task.completed}
                onCheckedChange={handleToggle}
                disabled={isToggling}
                className="mt-1 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
              />
              <div className="flex-1 min-w-0">
                <h3 className={`
                  font-semibold text-white transition-all duration-300
                  ${task.completed ? 'line-through text-white/60' : ''}
                `}>
                  {task.title}
                </h3>
                {task.description && (
                  <p className="text-white/70 text-sm mt-1 line-clamp-2">
                    {task.description}
                  </p>
                )}
              </div>
            </div>

            {/* Actions dropdown */}
            <div 
              className={`
                opacity-0 group-hover:opacity-100 transition-opacity duration-200
                ${isHovered ? 'opacity-100' : ''}
              `}
              onClick={(e) => e.stopPropagation()}
            >
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 text-white/50 hover:text-white hover:bg-white/10"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-gray-900 border-white/20">
                  <DropdownMenuItem 
                    onClick={() => onEdit(task)}
                    className="text-white hover:bg-white/10"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Düzenle
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => onDelete(task)}
                    className="text-red-400 hover:bg-red-500/20"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Sil
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Category and Priority */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {task.category && (
                <Badge 
                  className="text-xs"
                  style={{ 
                    backgroundColor: `${task.category.color}20`,
                    color: task.category.color,
                    border: `1px solid ${task.category.color}40`
                  }}
                >
                  {task.category.emoji} {task.category.name}
                </Badge>
              )}
            </div>

            <Badge className={`text-xs ${getPriorityColor(task.priority)}`}>
              {getPriorityIcon(task.priority)} {getPriorityLabel(task.priority)}
            </Badge>
          </div>

          {/* Time and Date info */}
          <div className="flex items-center justify-between text-sm text-white/60">
            <div className="flex items-center space-x-4">
              {task.estimated_time && (
                <div className="flex items-center space-x-1">
                  <Clock className="h-3 w-3" />
                  <span>
                    {task.estimated_time < 60 
                      ? `${task.estimated_time}dk` 
                      : `${Math.floor(task.estimated_time / 60)}sa`
                    }
                  </span>
                </div>
              )}

              {task.due_date && (
                <div className={`
                  flex items-center space-x-1
                  ${isOverdue ? 'text-red-400' : isToday ? 'text-blue-400' : ''}
                `}>
                  {isOverdue ? (
                    <AlertCircle className="h-3 w-3" />
                  ) : (
                    <Calendar className="h-3 w-3" />
                  )}
                  <span>
                    {format(new Date(task.due_date), 'dd MMM', { locale: tr })}
                  </span>
                </div>
              )}
            </div>

            {task.completed && (
              <div className="flex items-center space-x-1 text-green-400">
                <CheckCircle2 className="h-3 w-3" />
                <span className="text-xs">Tamamlandı</span>
              </div>
            )}
          </div>

          {/* Tags */}
          {task.tags && task.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {task.tags.slice(0, 3).map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="text-xs bg-white/5 border-white/20 text-white/70"
                >
                  {tag}
                </Badge>
              ))}
              {task.tags.length > 3 && (
                <Badge
                  variant="outline"
                  className="text-xs bg-white/5 border-white/20 text-white/50"
                >
                  +{task.tags.length - 3}
                </Badge>
              )}
            </div>
          )}

          {/* Progress Bar */}
          {task.estimated_time && task.actual_time && (
            <div className="w-full bg-white/10 rounded-full h-1">
              <div
                className="bg-blue-400 h-1 rounded-full transition-all duration-300"
                style={{
                  width: `${Math.min((task.actual_time / task.estimated_time) * 100, 100)}%`
                }}
              />
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default TaskCard;
