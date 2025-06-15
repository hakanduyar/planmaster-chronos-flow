
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Grid, List, Calendar, Filter, Search, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import TaskCard from './TaskCard';
import TaskModal from './TaskModal';
import { useTasks } from '@/hooks/useTasks';
import { useCategories } from '@/hooks/useCategories';
import { Task, TaskFilters, TaskSort, TaskStatus, TaskPriority } from '@/types/task';

type ViewMode = 'grid' | 'list' | 'kanban';

const TaskList: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [filters, setFilters] = useState<TaskFilters>({
    status: 'all',
    categories: [],
    priorities: [],
    search: '',
  });
  const [sort, setSort] = useState<TaskSort>({
    by: 'due_date',
    order: 'asc',
  });

  const { tasks, isLoading, deleteTask } = useTasks(filters, sort);
  const { categories } = useCategories();

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleDeleteTask = (task: Task) => {
    if (confirm('Bu görevi silmek istediğinizden emin misiniz?')) {
      deleteTask(task.id);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTask(null);
  };

  const handleFilterChange = (key: keyof TaskFilters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleSortChange = (by: string) => {
    const [field, order] = by.split('-');
    setSort({
      by: field as any,
      order: order as 'asc' | 'desc',
    });
  };

  const groupedTasks = React.useMemo(() => {
    if (viewMode !== 'kanban') return { all: tasks };

    return tasks.reduce((groups, task) => {
      const categoryName = task.category?.name || 'Kategorisiz';
      if (!groups[categoryName]) {
        groups[categoryName] = [];
      }
      groups[categoryName].push(task);
      return groups;
    }, {} as Record<string, Task[]>);
  }, [tasks, viewMode]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-white">Görevler yükleniyor...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header and Controls */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-white">Görevlerim</h2>
          <p className="text-white/70">
            {tasks.filter(t => !t.completed).length} aktif, {tasks.filter(t => t.completed).length} tamamlanmış görev
          </p>
        </div>

        <div className="flex items-center space-x-3">
          {/* View Mode Toggle */}
          <div className="flex items-center space-x-1 bg-white/5 rounded-lg p-1">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className="h-8 w-8 p-0"
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="h-8 w-8 p-0"
            >
              <List className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'kanban' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('kanban')}
              className="h-8 w-8 p-0"
            >
              <Calendar className="h-4 w-4" />
            </Button>
          </div>

          <Button 
            onClick={() => setIsModalOpen(true)}
            className="planmaster-button"
          >
            <Plus className="h-4 w-4 mr-2" />
            Yeni Görev
          </Button>
        </div>
      </div>

      {/* Filters and Search */}
      <Card className="glass-card">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/50" />
              <Input
                placeholder="Görev ara..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                className="pl-10 bg-white/5 border-white/20 text-white placeholder:text-white/50"
              />
            </div>

            {/* Status Filter */}
            <Select
              value={filters.status}
              onValueChange={(value: TaskStatus) => handleFilterChange('status', value)}
            >
              <SelectTrigger className="bg-white/5 border-white/20 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 border-white/20">
                <SelectItem value="all" className="text-white">Tüm Görevler</SelectItem>
                <SelectItem value="active" className="text-white">Aktif</SelectItem>
                <SelectItem value="completed" className="text-white">Tamamlanan</SelectItem>
                <SelectItem value="overdue" className="text-white">Geciken</SelectItem>
              </SelectContent>
            </Select>

            {/* Category Filter */}
            <Select
              value={filters.categories[0] || 'all'}
              onValueChange={(value) => 
                handleFilterChange('categories', value === 'all' ? [] : [value])
              }
            >
              <SelectTrigger className="bg-white/5 border-white/20 text-white">
                <SelectValue placeholder="Kategori" />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 border-white/20">
                <SelectItem value="all" className="text-white">Tüm Kategoriler</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id} className="text-white">
                    {category.emoji} {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Sort */}
            <Select
              value={`${sort.by}-${sort.order}`}
              onValueChange={handleSortChange}
            >
              <SelectTrigger className="bg-white/5 border-white/20 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 border-white/20">
                <SelectItem value="due_date-asc" className="text-white">Tarihe Göre (Yakın)</SelectItem>
                <SelectItem value="due_date-desc" className="text-white">Tarihe Göre (Uzak)</SelectItem>
                <SelectItem value="priority-desc" className="text-white">Önceliğe Göre</SelectItem>
                <SelectItem value="created_at-desc" className="text-white">En Yeni</SelectItem>
                <SelectItem value="title-asc" className="text-white">A-Z</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Task Display */}
      <AnimatePresence mode="wait">
        {viewMode === 'kanban' ? (
          <motion.div
            key="kanban"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {Object.entries(groupedTasks).map(([categoryName, categoryTasks]) => (
              <Card key={categoryName} className="glass-card">
                <CardHeader className="pb-3">
                  <CardTitle className="text-white text-lg flex items-center">
                    <span className="mr-2">
                      {categories.find(c => c.name === categoryName)?.emoji || '📌'}
                    </span>
                    {categoryName}
                    <span className="ml-auto text-sm text-white/60">
                      {categoryTasks.length}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <AnimatePresence>
                    {categoryTasks.map((task) => (
                      <TaskCard
                        key={task.id}
                        task={task}
                        onEdit={handleEditTask}
                        onDelete={handleDeleteTask}
                      />
                    ))}
                  </AnimatePresence>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key={viewMode}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                : 'space-y-4'
            }
          >
            <AnimatePresence>
              {tasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onEdit={handleEditTask}
                  onDelete={handleDeleteTask}
                  className={viewMode === 'list' ? 'max-w-none' : ''}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {tasks.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12"
        >
          <div className="text-white/50 text-lg mb-4">
            Henüz görev bulunmuyor
          </div>
          <Button 
            onClick={() => setIsModalOpen(true)}
            className="planmaster-button"
          >
            <Plus className="h-4 w-4 mr-2" />
            İlk Görevini Oluştur
          </Button>
        </motion.div>
      )}

      {/* Task Modal */}
      <TaskModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        task={editingTask}
      />
    </div>
  );
};

export default TaskList;
