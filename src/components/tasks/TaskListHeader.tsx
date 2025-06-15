
import React from 'react';
import TaskListFilters from './TaskListFilters';
import { TaskFilters } from '@/types/task';

interface TaskListHeaderProps {
  hideFilters?: boolean;
  filters: TaskFilters;
  onFiltersChange: (filters: TaskFilters) => void;
}

const TaskListHeader: React.FC<TaskListHeaderProps> = ({
  hideFilters = false,
  filters,
  onFiltersChange,
}) => {
  if (hideFilters) {
    return null;
  }

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
      <h2 className="text-2xl font-bold text-white">Görevlerim</h2>
      <TaskListFilters filters={filters} onFiltersChange={onFiltersChange} />
    </div>
  );
};

export default TaskListHeader;
