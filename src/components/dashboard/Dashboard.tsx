
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckSquare, Clock, Calendar, TrendingUp } from 'lucide-react';
import { useTasks } from '@/hooks/useTasks';
import { useTaskInstances } from '@/hooks/useTaskInstances';
import TaskTabs from './TaskTabs';

const Dashboard: React.FC = () => {
  const { tasks: regularTasks } = useTasks();
  const { taskInstances } = useTaskInstances();

  // Tüm görevleri birleştir
  const allTasks = [...regularTasks, ...taskInstances];

  const stats = React.useMemo(() => {
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    
    const completedTasks = allTasks.filter(task => task.completed);
    const pendingTasks = allTasks.filter(task => !task.completed);
    const todayTasks = allTasks.filter(task => 
      task.due_date && task.due_date.startsWith(todayStr)
    );
    const overdueTasks = allTasks.filter(task => 
      !task.completed && task.due_date && new Date(task.due_date) < today
    );

    return {
      total: allTasks.length,
      completed: completedTasks.length,
      pending: pendingTasks.length,
      today: todayTasks.length,
      overdue: overdueTasks.length,
      completionRate: allTasks.length > 0 ? Math.round((completedTasks.length / allTasks.length) * 100) : 0
    };
  }, [allTasks]);

  const statCards = [
    {
      title: 'Toplam Görev',
      value: stats.total,
      icon: CheckSquare,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/20'
    },
    {
      title: 'Tamamlanan',
      value: stats.completed,
      icon: CheckSquare,
      color: 'text-green-400',
      bgColor: 'bg-green-500/20'
    },
    {
      title: 'Bekleyen',
      value: stats.pending,
      icon: Clock,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/20'
    },
    {
      title: 'Bugün',
      value: stats.today,
      icon: Calendar,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/20'
    }
  ];

  return (
    <div className="h-full w-full">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-4 px-4"
      >
        <h1 className="text-2xl font-bold text-white mb-1">Dashboard</h1>
        <p className="text-white/70 text-sm">Görev yönetimi ve ilerleme takibi</p>
      </motion.div>

      <div className="px-4 space-y-4 pb-4">
        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3"
        >
          {statCards.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.1 }}
            >
              <Card className="glass-card bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white/70 text-xs font-medium">{stat.title}</p>
                      <p className="text-xl font-bold text-white">{stat.value}</p>
                    </div>
                    <div className={`p-2 rounded-full ${stat.bgColor}`}>
                      <stat.icon className={`h-5 w-5 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Completion Rate */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="glass-card bg-white/5 border-white/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-white flex items-center gap-2 text-base">
                <TrendingUp className="h-4 w-4 text-green-400" />
                Tamamlanma Oranı
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-white/70">İlerleme</span>
                  <span className="text-white font-semibold">{stats.completionRate}%</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${stats.completionRate}%` }}
                  />
                </div>
                <p className="text-xs text-white/50">
                  {stats.completed} / {stats.total} görev tamamlandı
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Task Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <TaskTabs />
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
