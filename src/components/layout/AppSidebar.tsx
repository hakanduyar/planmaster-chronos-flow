
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  CheckSquare, 
  Clock, 
  Filter, 
  Plus, 
  Settings,
  Home,
  FolderOpen,
  BarChart3,
  Repeat
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import QuickTaskInput from '../tasks/QuickTaskInput';
import { useTasks } from '@/hooks/useTasks';

const AppSidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { tasks } = useTasks();

  // Calculate today's stats
  const todayStats = React.useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    const todayTasks = tasks.filter(task => 
      task.due_date && task.due_date.startsWith(today)
    );
    
    return {
      total: todayTasks.length,
      completed: todayTasks.filter(task => task.completed).length,
      remaining: todayTasks.filter(task => !task.completed).length
    };
  }, [tasks]);

  const menuItems = [
    {
      title: 'Dashboard',
      url: '/',
      icon: Home,
    },
    {
      title: 'Tekrarlayan Görevler',
      url: '/patterns',
      icon: Repeat,
    },
    {
      title: 'Kategoriler',
      url: '/categories',
      icon: FolderOpen,
    },
    {
      title: 'Takvim',
      url: '/calendar',
      icon: Calendar,
    },
    {
      title: 'Raporlar',
      url: '/reports',
      icon: BarChart3,
    }
  ];

  const quickActions = [
    { label: 'Yeni Görev', icon: <Plus className="h-4 w-4" />, action: () => {}, color: 'text-blue-400' },
    { label: 'Takvim', icon: <Calendar className="h-4 w-4" />, action: () => navigate('/calendar'), color: 'text-green-400' },
    { label: 'Filtreler', icon: <Filter className="h-4 w-4" />, action: () => {}, color: 'text-purple-400' },
    { label: 'Ayarlar', icon: <Settings className="h-4 w-4" />, action: () => {}, color: 'text-gray-400' },
  ];

  return (
    <Sidebar className="bg-gray-900/80 backdrop-blur-sm border-r border-white/10 h-full">
      <SidebarHeader className="p-4 border-b border-white/10">
        <div className="flex items-center space-x-2">
          <CheckSquare className="h-6 w-6 text-blue-400" />
          <span className="text-lg font-bold text-white">PlanMaster</span>
        </div>
      </SidebarHeader>

      <SidebarContent className="p-4 space-y-4 h-full overflow-y-auto">
        {/* Navigation Menu */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-white/70">Navigasyon</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={location.pathname === item.url}
                    className="text-white hover:bg-white/10"
                  >
                    <button onClick={() => navigate(item.url)}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Quick Task Input */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="glass-card bg-white/5 border-white/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-white flex items-center text-sm">
                <CheckSquare className="h-4 w-4 mr-2 text-blue-400" />
                Hızlı Görev Ekle
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <QuickTaskInput />
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="glass-card bg-white/5 border-white/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-white flex items-center text-sm">
                <Clock className="h-4 w-4 mr-2 text-blue-400" />
                Hızlı İşlemler
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-1 pt-0">
              {quickActions.map((action, index) => (
                <Button
                  key={action.label}
                  variant="ghost"
                  className="w-full justify-start text-white hover:bg-white/10 h-8 text-sm"
                  onClick={action.action}
                >
                  <span className={action.color}>{action.icon}</span>
                  <span className="ml-2">{action.label}</span>
                </Button>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Today's Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="glass-card bg-white/5 border-white/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-white flex items-center text-sm">
                <Calendar className="h-4 w-4 mr-2 text-blue-400" />
                Bugün
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-2 text-sm text-white/70">
                <div className="flex justify-between">
                  <span>Toplam görev:</span>
                  <span className="text-white font-semibold">{todayStats.total}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tamamlanan:</span>
                  <span className="text-green-400 font-semibold">{todayStats.completed}</span>
                </div>
                <div className="flex justify-between">
                  <span>Kalan:</span>
                  <span className="text-yellow-400 font-semibold">{todayStats.remaining}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-white/10">
        <div className="text-xs text-white/50 text-center">
          PlanMaster Pro v1.0
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
