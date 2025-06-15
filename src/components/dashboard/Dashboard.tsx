
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Clock, Calendar, TrendingUp } from 'lucide-react';
import { Task as DatabaseTask } from '@/types/task';
import { useTasks } from '@/hooks/useTasks';
import TaskList from '../tasks/TaskList';

const Dashboard: React.FC = () => {
  const { tasks, isLoading } = useTasks();

  // Calculate stats from tasks
  const stats = React.useMemo(() => {
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.completed).length;
    const pendingTasks = tasks.filter(task => !task.completed).length;
    const todayTasks = tasks.filter(task => 
      task.due_date && task.due_date.startsWith(todayStr)
    ).length;
    const overdueTasks = tasks.filter(task => 
      !task.completed && task.due_date && new Date(task.due_date) < today
    ).length;

    return {
      totalTasks,
      completedTasks,
      pendingTasks,
      todayTasks,
      overdueTasks,
      completionRate: totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0
    };
  }, [tasks]);

  const statsCards = [
    {
      title: 'Toplam Görev',
      value: stats.totalTasks,
      icon: <Calendar className="h-6 w-6 text-blue-400" />,
      color: 'from-blue-500/20 to-blue-600/20'
    },
    {
      title: 'Tamamlanan',
      value: stats.completedTasks,
      icon: <CheckCircle className="h-6 w-6 text-green-400" />,
      color: 'from-green-500/20 to-green-600/20'
    },
    {
      title: 'Bekleyen',
      value: stats.pendingTasks,
      icon: <Clock className="h-6 w-6 text-yellow-400" />,
      color: 'from-yellow-500/20 to-yellow-600/20'
    },
    {
      title: 'Başarı Oranı',
      value: `${stats.completionRate}%`,
      icon: <TrendingUp className="h-6 w-6 text-purple-400" />,
      color: 'from-purple-500/20 to-purple-600/20'
    }
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-white">Dashboard yükleniyor...</div>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-white/70">Görev durumun ve istatistiklerin</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className={`glass-card bg-gradient-to-br ${stat.color}`}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-white/80">
                  {stat.title}
                </CardTitle>
                {stat.icon}
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-white">
                  {stat.value}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Quick Insights */}
      {stats.overdueTasks > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-500/20 border border-red-500/30 rounded-lg p-4"
        >
          <div className="flex items-center space-x-2 text-red-400">
            <Clock className="h-5 w-5" />
            <span className="font-semibold">
              {stats.overdueTasks} görevin süresi geçmiş!
            </span>
          </div>
        </motion.div>
      )}

      {/* Task List */}
      <TaskList />
    </div>
  );
};

export default Dashboard;
