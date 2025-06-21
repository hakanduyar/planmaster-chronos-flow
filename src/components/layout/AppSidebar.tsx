
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
  Repeat,
  Sparkles,
  LogOut
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import QuickTaskInput from '../tasks/QuickTaskInput';
import { useTasks } from '@/hooks/useTasks';
import { useAuth } from '@/hooks/useAuth';

const AppSidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { tasks } = useTasks();
  const { signOut, user } = useAuth();

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

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

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
    { label: 'Yeni Görev', icon: <Plus className="h-3 w-3 md:h-4 md:w-4" />, action: () => {}, color: 'text-blue-300' },
    { label: 'Takvim', icon: <Calendar className="h-3 w-3 md:h-4 md:w-4" />, action: () => navigate('/calendar'), color: 'text-green-300' },
    { label: 'Filtreler', icon: <Filter className="h-3 w-3 md:h-4 md:w-4" />, action: () => {}, color: 'text-purple-300' },
    { label: 'Ayarlar', icon: <Settings className="h-3 w-3 md:h-4 md:w-4" />, action: () => {}, color: 'text-gray-300' },
  ];

  return (
    <Sidebar className="bg-gray-900/90 backdrop-blur-md border-r border-white/15 h-full">
      <SidebarHeader className="p-3 md:p-4 border-b border-white/10">
        <div className="flex items-center space-x-2 md:space-x-3">
          <div className="p-1.5 md:p-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg">
            <CheckSquare className="h-4 w-4 md:h-5 md:w-5 text-blue-300" />
          </div>
          <span className="text-sm md:text-lg font-bold gradient-text truncate">PlanMaster</span>
        </div>
      </SidebarHeader>

      <SidebarContent className="p-3 md:p-4 space-y-3 md:space-y-4 flex-1 overflow-y-auto">
        {/* Navigation Menu */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-white/70 text-xs md:text-sm font-medium flex items-center gap-2">
            <Sparkles className="h-3 w-3 md:h-4 md:w-4" />
            Navigasyon
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={location.pathname === item.url}
                    className="text-white hover:bg-white/10 h-8 md:h-10 text-xs md:text-base transition-colors"
                  >
                    <button onClick={() => navigate(item.url)}>
                      <item.icon className="h-4 w-4 md:h-5 md:w-5" />
                      <span className="truncate">{item.title}</span>
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
          <Card className="glass-card border-white/15">
            <CardHeader className="pb-2 px-3 md:px-4 pt-3 md:pt-4">
              <CardTitle className="text-white flex items-center text-xs md:text-sm font-medium">
                <CheckSquare className="h-3 w-3 md:h-4 md:w-4 mr-2 text-blue-300" />
                Hızlı Görev Ekle
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0 px-3 md:px-4 pb-3 md:pb-4">
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
          <Card className="glass-card border-white/15">
            <CardHeader className="pb-2 px-3 md:px-4 pt-3 md:pt-4">
              <CardTitle className="text-white flex items-center text-xs md:text-sm font-medium">
                <Clock className="h-3 w-3 md:h-4 md:w-4 mr-2 text-blue-300" />
                Hızlı İşlemler
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-1 md:space-y-2 pt-0 px-3 md:px-4 pb-3 md:pb-4">
              {quickActions.map((action, index) => (
                <Button
                  key={action.label}
                  variant="ghost"
                  className="w-full justify-start text-white hover:bg-white/10 h-7 md:h-9 text-xs md:text-sm transition-colors"
                  onClick={action.action}
                >
                  <span className={action.color}>{action.icon}</span>
                  <span className="ml-2 truncate">{action.label}</span>
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
          <Card className="glass-card border-white/15">
            <CardHeader className="pb-2 px-3 md:px-4 pt-3 md:pt-4">
              <CardTitle className="text-white flex items-center text-xs md:text-sm font-medium">
                <Calendar className="h-3 w-3 md:h-4 md:w-4 mr-2 text-blue-300" />
                Bugün
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0 px-3 md:px-4 pb-3 md:pb-4">
              <div className="space-y-1.5 md:space-y-2 text-xs md:text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-white/70">Toplam görev:</span>
                  <span className="text-white font-semibold">{todayStats.total}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/70">Tamamlanan:</span>
                  <span className="text-green-300 font-semibold">{todayStats.completed}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/70">Kalan:</span>
                  <span className="text-yellow-300 font-semibold">{todayStats.remaining}</span>
                </div>
                {todayStats.total > 0 && (
                  <div className="mt-2 md:mt-3">
                    <div className="w-full bg-white/10 rounded-full h-1.5 md:h-2">
                      <div 
                        className="bg-gradient-to-r from-green-400 to-blue-500 h-1.5 md:h-2 rounded-full transition-all duration-500"
                        style={{ width: `${todayStats.total > 0 ? (todayStats.completed / todayStats.total) * 100 : 0}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </SidebarContent>

      <SidebarFooter className="p-3 md:p-4 border-t border-white/10 space-y-2 md:space-y-3">
        {/* User Info */}
        {user && (
          <div className="flex items-center space-x-2 md:space-x-3 px-1 md:px-2">
            <div className="w-6 h-6 md:w-8 md:h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs md:text-sm font-semibold">
                {user.email?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-xs md:text-sm font-medium truncate">
                {user.email}
              </p>
            </div>
          </div>
        )}

        {/* Logout Button */}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="ghost"
              className="w-full justify-start text-red-300 hover:text-red-200 hover:bg-red-500/10 h-8 md:h-10 text-xs md:text-sm transition-colors border border-red-500/20 hover:border-red-500/40"
            >
              <LogOut className="h-3 w-3 md:h-4 md:w-4 mr-2" />
              <span>Çıkış Yap</span>
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-gray-900 border-white/15 max-w-sm md:max-w-md mx-auto">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-white text-sm md:text-base">Çıkış yapmak istediğinizden emin misiniz?</AlertDialogTitle>
              <AlertDialogDescription className="text-white/70 text-xs md:text-sm">
                Bu işlem sizi uygulamadan çıkaracak ve giriş sayfasına yönlendirecektir.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex-col sm:flex-row gap-2">
              <AlertDialogCancel className="bg-white/10 text-white border-white/20 hover:bg-white/20 text-xs md:text-sm">
                İptal
              </AlertDialogCancel>
              <AlertDialogAction 
                onClick={handleSignOut}
                className="bg-red-600 hover:bg-red-700 text-white text-xs md:text-sm"
              >
                Çıkış Yap
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* App Version */}
        <div className="text-xs md:text-sm text-white/50 text-center">
          <span className="gradient-text font-medium">PlanMaster Pro</span>
          <span className="block text-xs mt-1">v1.0</span>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
