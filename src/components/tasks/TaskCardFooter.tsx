
import React from 'react';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import {
  Clock,
  Calendar,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Task } from '@/types/task';

interface TaskCardFooterProps {
  task: Task;
}

const TaskCardFooter: React.FC<TaskCardFooterProps> = ({ task }) => {
  const isOverdue = task.due_date && new Date(task.due_date) < new Date() && !task.completed;
  const isToday = task.due_date && 
    format(new Date(task.due_date), 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd');

  return (
    <div className="space-y-3">
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
    </div>
  );
};

export default TaskCardFooter;
