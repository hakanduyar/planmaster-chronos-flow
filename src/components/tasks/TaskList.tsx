
import React, { useState } from 'react';
import { useTasks } from '@/hooks/useTasks';
import { Task, TaskFilters } from '@/types/task';
import { TaskInstance } from '@/types/pattern';
import TaskModal from './TaskModal';
import TaskListHeader from './TaskListHeader';
import TaskListItem from './TaskListItem';
import TaskListEmpty from './TaskListEmpty';

interface TaskListProps {
  tasks?: (Task | TaskInstance)[];
  isLoading?: boolean;
  showPatternInstances?: boolean;
  hideFilters?: boolean;
}

const TaskList: React.FC<TaskListProps> = ({ 
  tasks: propTasks, 
  isLoading: propIsLoading, 
  showPatternInstances = false,
  hideFilters = false
}) => {
  const [filters, setFilters] = useState<TaskFilters>({
    status: 'all',
    categories: [],
    priorities: [],
    search: '',
  });

  const [editingTask, setEditingTask] = useState<Task | null>(null);
  
  // Use hooks only if no props are provided
  const { tasks: hookTasks, isLoading: hookIsLoading, toggleTask, deleteTask } = useTasks(
    propTasks ? undefined : filters
  );
  
  // Determine which data to use
  const tasks = propTasks || hookTasks;
  const isLoading = propIsLoading !== undefined ? propIsLoading : hookIsLoading;

  const handleEditTask = (task: Task | TaskInstance) => {
    // Only allow editing of regular tasks, not pattern instances
    if ('pattern_id' in task) return;
    setEditingTask(task as Task);
  };

  const handleDeleteTask = (taskId: string) => {
    if (confirm('Bu görevi silmek istediğinizden emin misiniz?')) {
      deleteTask(taskId);
    }
  };

  const handleToggleTask = (task: Task | TaskInstance) => {
    toggleTask(task);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-6 sm:p-8">
        <div className="text-white text-sm sm:text-base">Görevler yükleniyor...</div>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <TaskListHeader 
        hideFilters={hideFilters}
        filters={filters}
        onFiltersChange={setFilters}
      />

      {/* Task List */}
      <div className="space-y-2 sm:space-y-3">
        {tasks.length === 0 ? (
          <TaskListEmpty />
        ) : (
          tasks.map((task, index) => (
            <TaskListItem
              key={task.id}
              task={task}
              index={index}
              onToggle={handleToggleTask}
              onEdit={handleEditTask}
              onDelete={handleDeleteTask}
            />
          ))
        )}
      </div>

      {/* Edit Task Modal */}
      <TaskModal
        isOpen={!!editingTask}
        onClose={() => setEditingTask(null)}
        task={editingTask}
      />
    </div>
  );
};

export default TaskList;
