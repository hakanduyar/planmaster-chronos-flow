
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, MoreVertical, Edit, Trash2 } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Task } from '@/types/task';
import { TaskInstance } from '@/types/pattern';

interface TaskListItemProps {
  task: Task | TaskInstance;
  index: number;
  onToggle: (task: Task | TaskInstance) => void;
  onEdit: (task: Task | TaskInstance) => void;
  onDelete: (taskId: string) => void;
}

const TaskListItem: React.FC<TaskListItemProps> = ({
  task,
  index,
  onToggle,
  onEdit,
  onDelete,
}) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500/20 text-red-400';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400';
      case 'low': return 'bg-green-500/20 text-green-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const isPatternInstance = 'pattern_id' in task;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 flex-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onToggle(task)}
                className="p-1 h-8 w-8"
              >
                <CheckCircle 
                  className={`h-5 w-5 ${
                    task.completed 
                      ? 'text-green-400 fill-current' 
                      : 'text-white/40 hover:text-white/60'
                  }`} 
                />
              </Button>
              
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className={`font-medium ${
                    task.completed 
                      ? 'text-white/60 line-through' 
                      : 'text-white'
                  }`}>
                    {task.title}
                  </h3>
                  {isPatternInstance && (
                    <Badge className="text-xs bg-purple-500/20 text-purple-400">
                      Tekrarlayan
                    </Badge>
                  )}
                </div>
                {task.description && (
                  <p className="text-sm text-white/60 mt-1">
                    {task.description}
                  </p>
                )}
                
                <div className="flex items-center gap-2 mt-2">
                  {task.category && (
                    <Badge 
                      className="text-xs"
                      style={{ 
                        backgroundColor: `${task.category.color}20`,
                        color: task.category.color 
                      }}
                    >
                      {task.category.emoji} {task.category.name}
                    </Badge>
                  )}
                  
                  <Badge className={`text-xs ${getPriorityColor(task.priority)}`}>
                    {task.priority === 'high' ? 'Yüksek' : 
                     task.priority === 'medium' ? 'Orta' : 'Düşük'}
                  </Badge>
                  
                  {task.estimated_time && (
                    <div className="flex items-center text-xs text-white/60">
                      <Clock className="h-3 w-3 mr-1" />
                      {task.estimated_time}dk
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="p-1 h-8 w-8">
                  <MoreVertical className="h-4 w-4 text-white/60" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-gray-900 border-white/20">
                {!isPatternInstance && (
                  <DropdownMenuItem 
                    onClick={() => onEdit(task)}
                    className="text-white hover:bg-white/10 cursor-pointer"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Düzenle
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem 
                  onClick={() => onDelete(task.id)}
                  className="text-red-400 hover:bg-red-500/10 cursor-pointer"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Sil
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default TaskListItem;
