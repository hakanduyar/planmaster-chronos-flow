
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Plus, Calendar, CheckCircle, Clock, AlertCircle, TrendingUp } from 'lucide-react';
import { mockTasks, mockCategories, getMockStats } from '@/lib/mockData';
import { DashboardStats } from '@/types';

const Dashboard = () => {
  const stats = getMockStats(mockTasks);
  const completionRate = Math.round((stats.completedTasks / stats.totalTasks) * 100);

  const statCards = [
    { title: 'Toplam Görev', value: stats.totalTasks, icon: CheckCircle, color: 'text-blue-400' },
    { title: 'Tamamlanan', value: stats.completedTasks, icon: CheckCircle, color: 'text-green-400' },
    { title: 'Bekleyen', value: stats.pendingTasks, icon: Clock, color: 'text-yellow-400' },
    { title: 'Geciken', value: stats.overdueTasks, icon: AlertCircle, color: 'text-red-400' },
  ];

  return (
    <div className="min-h-screen p-6 space-y-8">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center"
      >
        <div>
          <h1 className="text-4xl font-bold gradient-text mb-2">PlanMaster Pro</h1>
          <p className="text-white/70 text-lg">Günlük planlarınızı takip edin ve hedeflerinize ulaşın</p>
        </div>
        <Button className="planmaster-button group">
          <Plus className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform duration-300" />
          Yeni Görev
        </Button>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="glass-card hover:scale-105 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/70 text-sm font-medium">{stat.title}</p>
                    <p className="text-3xl font-bold text-white mt-2">{stat.value}</p>
                  </div>
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Progress Overview */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-1"
        >
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-green-400" />
                İlerleme Özeti
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-white/80">Tamamlanma Oranı</span>
                  <span className="text-white font-semibold">{completionRate}%</span>
                </div>
                <Progress value={completionRate} className="h-3" />
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-white/80">Bugün</span>
                  <span className="text-blue-400 font-semibold">{stats.todayTasks} görev</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/80">Bu Hafta</span>
                  <span className="text-green-400 font-semibold">{stats.weekTasks} görev</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/80">Bu Ay</span>
                  <span className="text-purple-400 font-semibold">{stats.monthTasks} görev</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Tasks */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2"
        >
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-blue-400" />
                Son Görevler
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockTasks.slice(0, 5).map((task, index) => (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="task-card group cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${task.completed ? 'bg-green-400' : 'bg-yellow-400'}`} />
                        <div>
                          <h3 className={`font-semibold ${task.completed ? 'line-through text-white/60' : 'text-white'}`}>
                            {task.title}
                          </h3>
                          <p className="text-white/60 text-sm">{task.category.name}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          task.priority === 'high' ? 'bg-red-500/20 text-red-400' :
                          task.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-green-500/20 text-green-400'
                        }`}>
                          {task.priority === 'high' ? 'Yüksek' : task.priority === 'medium' ? 'Orta' : 'Düşük'}
                        </span>
                        <span className="text-white/50 text-sm">
                          {task.dueDate ? new Date(task.dueDate).toLocaleDateString('tr-TR') : ''}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Categories Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-white">Kategoriler</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {mockCategories.map((category, index) => {
                const categoryTasks = mockTasks.filter(t => t.category.id === category.id);
                const completedCount = categoryTasks.filter(t => t.completed).length;
                
                return (
                  <motion.div
                    key={category.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    className="task-card text-center group cursor-pointer hover:scale-105"
                  >
                    <div className="text-2xl mb-2">{category.icon}</div>
                    <h3 className="font-semibold text-white mb-1">{category.name}</h3>
                    <p className="text-white/60 text-sm">
                      {completedCount}/{categoryTasks.length} tamamlandı
                    </p>
                    <div className="w-full bg-white/10 rounded-full h-2 mt-2">
                      <div
                        className="h-2 rounded-full transition-all duration-300"
                        style={{
                          width: `${categoryTasks.length > 0 ? (completedCount / categoryTasks.length) * 100 : 0}%`,
                          backgroundColor: category.color
                        }}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Dashboard;
