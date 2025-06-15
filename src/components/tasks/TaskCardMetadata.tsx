
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Task } from '@/types/task';

interface TaskCardMetadataProps {
  task: Task;
}

const TaskCardMetadata: React.FC<TaskCardMetadataProps> = ({ task }) => {
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
  );
};

export default TaskCardMetadata;
