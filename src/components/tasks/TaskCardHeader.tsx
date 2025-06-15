
import React, { useState } from 'react';
import {
  MoreHorizontal,
  Edit,
  Trash2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Task } from '@/types/task';

interface TaskCardHeaderProps {
  task: Task;
  isHovered: boolean;
  isToggling: boolean;
  onToggle: () => void;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
}

const TaskCardHeader: React.FC<TaskCardHeaderProps> = ({
  task,
  isHovered,
  isToggling,
  onToggle,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="flex items-start justify-between">
      <div 
        className="flex items-start space-x-3 flex-1"
        onClick={(e) => e.stopPropagation()}
      >
        <Checkbox
          checked={task.completed}
          onCheckedChange={onToggle}
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
  );
};

export default TaskCardHeader;
