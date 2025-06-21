
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
    <div className="flex flex-col gap-3 sm:gap-4">
      <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white">Görevlerim</h2>
      <TaskListFilters filters={filters} onFiltersChange={onFiltersChange} />
    </div>
  );
};

export default TaskListHeader;
