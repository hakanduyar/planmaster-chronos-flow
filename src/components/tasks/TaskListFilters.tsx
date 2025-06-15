
import React from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search } from 'lucide-react';
import { TaskFilters } from '@/types/task';

interface TaskListFiltersProps {
  filters: TaskFilters;
  onFiltersChange: (filters: TaskFilters) => void;
}

const TaskListFilters: React.FC<TaskListFiltersProps> = ({
  filters,
  onFiltersChange,
}) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFiltersChange({ ...filters, search: e.target.value });
  };

  const handleStatusFilter = (status: string) => {
    onFiltersChange({ ...filters, status: status as TaskFilters['status'] });
  };

  return (
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
  );
};

export default TaskListFilters;
