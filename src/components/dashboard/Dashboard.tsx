
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
      bgColor: 'bg-blue-500/15',
      gradient: 'from-blue-500/20 to-blue-600/10'
    },
    {
      title: 'Tamamlanan',
      value: stats.completed,
      icon: CheckSquare,
      color: 'text-green-300',
      bgColor: 'bg-green-500/15',
      gradient: 'from-green-500/20 to-green-600/10'
    },
    {
      title: 'Bekleyen',
      value: stats.pending,
      icon: Clock,
      color: 'text-yellow-300',
      bgColor: 'bg-yellow-500/15',
      gradient: 'from-yellow-500/20 to-yellow-600/10'
    },
    {
      title: 'Bugün',
      value: stats.today,
      icon: Calendar,
      color: 'text-purple-300',
      bgColor: 'bg-purple-500/15',
      gradient: 'from-purple-500/20 to-purple-600/10'
    }
  ];

  return (
    <div className="h-full w-full p-3 md:p-6 pb-16 md:pb-20 space-y-4 md:space-y-6 overflow-y-auto">
      {/* Enhanced Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-4 md:py-6"
      >
        <h1 className="text-2xl md:text-4xl font-bold mb-2 md:mb-3 gradient-text">Dashboard</h1>
        <p className="text-sm md:text-base text-white/90">Görev yönetimi ve ilerleme takibi</p>
        <div className="flex items-center justify-center mt-3 md:mt-4 space-x-2">
          <Star className="h-4 w-4 md:h-5 md:w-5 text-yellow-400" />
          <span className="text-xs md:text-sm text-white/80">Günlük hedeflerinizi takip edin</span>
          <Star className="h-4 w-4 md:h-5 md:w-5 text-yellow-400" />
        </div>
      </motion.div>

      {/* Enhanced Stats Cards */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4"
      >
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.1 }}
            whileHover={{ scale: 1.02 }}
          >
            <Card className={`stat-card bg-gradient-to-br ${stat.gradient} border-white/15`}>
              <CardContent className="p-3 md:p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1 md:space-y-2">
                    <p className="text-xs md:text-sm text-white/80 font-medium">{stat.title}</p>
                    <p className="text-lg md:text-3xl font-bold text-white">{stat.value}</p>
                  </div>
                  <div className={`p-2 md:p-3 rounded-xl ${stat.bgColor} backdrop-blur-sm`}>
                    <stat.icon className={`h-4 w-4 md:h-6 md:w-6 ${stat.color}`} />
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
        <Card className="glass-card border-white/15">
          <CardHeader className="pb-2 md:pb-3 px-4 md:px-6">
            <CardTitle className="text-white flex items-center gap-2 md:gap-3 text-sm md:text-lg">
              <div className="p-1.5 md:p-2 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-lg">
                <TrendingUp className="h-4 w-4 md:h-5 md:w-5 text-green-300" />
              </div>
              Tamamlanma Oranı
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 md:space-y-4 px-4 md:px-6 pb-4 md:pb-6">
            <div className="space-y-2 md:space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs md:text-sm text-white/80">İlerleme Durumu</span>
                <span className="text-white font-bold text-base md:text-lg">{stats.completionRate}%</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2 md:h-3 overflow-hidden">
                <motion.div 
                  className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 h-2 md:h-3 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${stats.completionRate}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0">
                <p className="text-xs md:text-sm text-white/80">
                  <span className="font-semibold text-green-300">{stats.completed}</span> / {stats.total} görev tamamlandı
                </p>
                {stats.overdue > 0 && (
                  <p className="text-red-300 text-xs md:text-sm font-medium">
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
  );
};

export default Dashboard;
