import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckSquare, Clock, Calendar, TrendingUp, Star, Target } from 'lucide-react';
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
      icon: Target,
      color: 'text-blue-300',
      bgColor: 'bg-blue-500/20',
      gradient: 'from-blue-500/15 to-blue-600/5'
    },
    {
      title: 'Tamamlanan',
      value: stats.completed,
      icon: CheckSquare,
      color: 'text-emerald-300',
      bgColor: 'bg-emerald-500/20',
      gradient: 'from-emerald-500/15 to-emerald-600/5'
    },
    {
      title: 'Bekleyen',
      value: stats.pending,
      icon: Clock,
      color: 'text-amber-300',
      bgColor: 'bg-amber-500/20',
      gradient: 'from-amber-500/15 to-amber-600/5'
    },
    {
      title: 'Bugün',
      value: stats.today,
      icon: Calendar,
      color: 'text-purple-300',
      bgColor: 'bg-purple-500/20',
      gradient: 'from-purple-500/15 to-purple-600/5'
    }
  ];

  return (
    <div className="w-full min-h-full">
      <div className="p-4 sm:p-6 space-y-4 sm:space-y-6 pb-8">
        {/* Enhanced Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-4 sm:py-6"
        >
          <h1 className="heading-large mb-3 gradient-text">Dashboard</h1>
          <p className="text-body">Görev yönetimi ve ilerleme takibi</p>
          <div className="flex items-center justify-center mt-4 space-x-2">
            <Star className="h-5 w-5 text-yellow-400" />
            <span className="text-caption">Günlük hedeflerinizi takip edin</span>
            <Star className="h-5 w-5 text-yellow-400" />
          </div>
        </motion.div>

        {/* Enhanced Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {statCards.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <Card className={`stat-card bg-gradient-to-br ${stat.gradient} border-white/10 hover:border-purple-400/30`}>
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <p className="text-caption font-medium">{stat.title}</p>
                      <p className="text-2xl sm:text-3xl font-bold text-white">{stat.value}</p>
                    </div>
                    <div className={`p-3 rounded-xl ${stat.bgColor} backdrop-blur-sm`}>
                      <stat.icon className={`h-5 w-5 sm:h-6 sm:w-6 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced Completion Rate */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="bg-glass-strong border-white/10 hover:border-purple-400/30 transition-all duration-300">
            <CardHeader className="pb-3">
              <CardTitle className="text-white flex items-center gap-3 heading-small">
                <div className="p-2 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-lg backdrop-blur-sm">
                  <TrendingUp className="h-5 w-5 text-emerald-300" />
                </div>
                Tamamlanma Oranı
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-body">İlerleme Durumu</span>
                  <span className="text-white font-bold text-lg">{stats.completionRate}%</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden backdrop-blur-sm">
                  <motion.div 
                    className="bg-gradient-to-r from-emerald-400 via-blue-500 to-purple-500 h-3 rounded-full shadow-lg"
                    initial={{ width: 0 }}
                    animate={{ width: `${stats.completionRate}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                </div>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <p className="text-caption">
                    <span className="font-semibold text-emerald-300">{stats.completed}</span> / {stats.total} görev tamamlandı
                  </p>
                  {stats.overdue > 0 && (
                    <p className="text-red-300 text-caption font-medium">
                      {stats.overdue} gecikmiş görev
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Enhanced Task Tabs */}
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
