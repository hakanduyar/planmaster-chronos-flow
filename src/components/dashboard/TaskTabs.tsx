
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckSquare, Repeat, Calendar } from 'lucide-react';
import TaskList from '@/components/tasks/TaskList';
import PatternList from '@/components/patterns/PatternList';
import { useTasks } from '@/hooks/useTasks';
import { useTaskInstances } from '@/hooks/useTaskInstances';

const TaskTabs: React.FC = () => {
  const { tasks: regularTasks, isLoading: isLoadingTasks } = useTasks();
  const { taskInstances, isLoading: isLoadingInstances } = useTaskInstances();

  // Bugünkü görevleri filtrele
  const today = new Date().toISOString().split('T')[0];
  const todayTasks = [...regularTasks, ...taskInstances].filter(task => 
    task.due_date && task.due_date.startsWith(today)
  );

  return (
    <div className="w-full">
      <Tabs defaultValue="all-tasks" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-4 sm:mb-6 bg-white/10 backdrop-blur-sm h-auto p-1">
          <TabsTrigger 
            value="all-tasks" 
            className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 text-white data-[state=active]:bg-white/20 data-[state=active]:text-white py-2 px-1 sm:px-3 text-xs sm:text-sm"
          >
            <CheckSquare className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Tüm Görevler</span>
            <span className="sm:hidden">Tümü</span>
          </TabsTrigger>
          <TabsTrigger 
            value="patterns" 
            className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 text-white data-[state=active]:bg-white/20 data-[state=active]:text-white py-2 px-1 sm:px-3 text-xs sm:text-sm"
          >
            <Repeat className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Tekrarlayan Görevler</span>
            <span className="sm:hidden">Tekrar</span>
          </TabsTrigger>
          <TabsTrigger 
            value="today" 
            className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 text-white data-[state=active]:bg-white/20 data-[state=active]:text-white py-2 px-1 sm:px-3 text-xs sm:text-sm"
          >
            <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Bugün ({todayTasks.length})</span>
            <span className="sm:hidden">Bugün ({todayTasks.length})</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all-tasks" className="space-y-4">
          <TaskList 
            tasks={[...regularTasks, ...taskInstances]} 
            isLoading={isLoadingTasks || isLoadingInstances}
            showPatternInstances={true}
            hideFilters={true}
          />
        </TabsContent>

        <TabsContent value="patterns" className="space-y-4">
          <PatternList />
        </TabsContent>

        <TabsContent value="today" className="space-y-4">
          <TaskList 
            tasks={todayTasks} 
            isLoading={isLoadingTasks || isLoadingInstances}
            showPatternInstances={true}
            hideFilters={true}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TaskTabs;
