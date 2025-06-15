
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CheckCircle, Clock, Search, Filter, MoreVertical } from 'lucide-react';
import { useTasks } from '@/hooks/useTasks';
import { Task, TaskFilters } from '@/types/task';

const TaskList: React.FC = () => {
  const [filters, setFilters] = useState<TaskFilters>({
    status: 'all',
    categories: [],
    priorities: [],
    search: '',
  });

  const { tasks, isLoading, toggleTask } = useTasks(filters);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({ ...prev, search: e.target.value }));
  };

  const handleStatusFilter = (status: string) => {
    setFilters(prev => ({ ...prev, status: status as TaskFilters['status'] }));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500/20 text-red-400';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400';
      case 'low': return 'bg-green-500/20 text-green-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-white">Görevler yükleniyor...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Görevlerim</h2>
        
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 h-4 w-4" />
            <Input
              placeholder="Görev ara..."
              value={filters.search}
              onChange={handleSearchChange}
              className="pl-10 bg-white/10 border-white/20 text-white placeholder-white/50"
            />
          </div>
          
          <Select onValueChange={handleStatusFilter} defaultValue="all">
            <SelectTrigger className="bg-white/10 border-white/20 text-white">
              <SelectValue placeholder="Durum filtrele" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tümü</SelectItem>
              <SelectItem value="active">Aktif</SelectItem>
              <SelectItem value="completed">Tamamlanan</SelectItem>
              <SelectItem value="overdue">Geciken</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Task List */}
      <div className="space-y-3">
        {tasks.length === 0 ? (
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-8 text-center">
              <p className="text-white/70">Henüz görev yok. İlk görevini ekle!</p>
            </CardContent>
          </Card>
        ) : (
          tasks.map((task, index) => (
            <motion.div
              key={task.id}
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
                        onClick={() => toggleTask(task)}
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
                        <h3 className={`font-medium ${
                          task.completed 
                            ? 'text-white/60 line-through' 
                            : 'text-white'
                        }`}>
                          {task.title}
                        </h3>
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
                    
                    <Button variant="ghost" size="sm" className="p-1 h-8 w-8">
                      <MoreVertical className="h-4 w-4 text-white/60" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default TaskList;
