
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
        <TabsList className="grid w-full grid-cols-3 mb-6 bg-white/10 backdrop-blur-sm">
          <TabsTrigger 
            value="all-tasks" 
            className="flex items-center gap-2 text-white data-[state=active]:bg-white/20 data-[state=active]:text-white"
          >
            <CheckSquare className="h-4 w-4" />
            Tüm Görevler
          </TabsTrigger>
          <TabsTrigger 
            value="patterns" 
            className="flex items-center gap-2 text-white data-[state=active]:bg-white/20 data-[state=active]:text-white"
          >
            <Repeat className="h-4 w-4" />
            Tekrarlayan Görevler
          </TabsTrigger>
          <TabsTrigger 
            value="today" 
            className="flex items-center gap-2 text-white data-[state=active]:bg-white/20 data-[state=active]:text-white"
          >
            <Calendar className="h-4 w-4" />
            Bugün ({todayTasks.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all-tasks" className="space-y-4">
          <TaskList 
            tasks={[...regularTasks, ...taskInstances]} 
            isLoading={isLoadingTasks || isLoadingInstances}
            showPatternInstances={true}
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
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TaskTabs;
