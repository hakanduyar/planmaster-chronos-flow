
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
    <div className="flex flex-col gap-2 sm:gap-3 w-full">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 h-3 w-3 sm:h-4 sm:w-4" />
        <Input
          placeholder="Görev ara..."
          value={filters.search}
          onChange={handleSearchChange}
          className="pl-8 sm:pl-10 bg-white/10 border-white/20 text-white placeholder-white/50 text-sm h-9 sm:h-10"
        />
      </div>
      
      <Select onValueChange={handleStatusFilter} defaultValue="all">
        <SelectTrigger className="bg-white/10 border-white/20 text-white text-sm h-9 sm:h-10">
          <SelectValue placeholder="Durum filtrele" />
        </SelectTrigger>
        <SelectContent className="bg-gray-900 border-white/20">
          <SelectItem value="all" className="text-white hover:bg-white/10">Tümü</SelectItem>
          <SelectItem value="active" className="text-white hover:bg-white/10">Aktif</SelectItem>
          <SelectItem value="completed" className="text-white hover:bg-white/10">Tamamlanan</SelectItem>
          <SelectItem value="overdue" className="text-white hover:bg-white/10">Geciken</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default TaskListFilters;
