
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
    { label: 'Yeni Görev', icon: <Plus className="h-4 w-4" />, action: () => {}, color: 'text-blue-600' },
    { label: 'Takvim', icon: <Calendar className="h-4 w-4" />, action: () => navigate('/calendar'), color: 'text-green-600' },
    { label: 'Filtreler', icon: <Filter className="h-4 w-4" />, action: () => {}, color: 'text-purple-600' },
    { label: 'Ayarlar', icon: <Settings className="h-4 w-4" />, action: () => {}, color: 'text-gray-600' },
  ];

  return (
    <Sidebar className="bg-white/95 backdrop-blur-sm border-r border-slate-200 h-full">
      <SidebarHeader className="p-6 border-b border-slate-100">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl shadow-lg">
            <CheckSquare className="h-6 w-6 text-white" />
          </div>
          <div>
            <span className="text-xl font-bold gradient-text">PlanMaster</span>
            <span className="block text-xs text-slate-500 font-medium">Pro</span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="p-4 space-y-6 flex-1">
        {/* Navigation Menu */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-slate-600 text-sm font-semibold flex items-center gap-2 mb-3">
            <Sparkles className="h-4 w-4 text-blue-500" />
            Navigasyon
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={location.pathname === item.url}
                    className="text-slate-700 hover:text-blue-600 hover:bg-blue-50 h-11 text-sm font-medium transition-all duration-200 rounded-lg mb-1"
                  >
                    <button onClick={() => navigate(item.url)}>
                      <item.icon className="h-5 w-5" />
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
          <Card className="bg-white/95 border border-slate-200 shadow-sm">
            <CardHeader className="pb-3 px-5 pt-5">
              <CardTitle className="text-slate-800 flex items-center text-sm font-semibold">
                <CheckSquare className="h-4 w-4 mr-2 text-blue-500" />
                Hızlı Görev Ekle
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0 px-5 pb-5">
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
          <Card className="bg-white/95 border border-slate-200 shadow-sm">
            <CardHeader className="pb-3 px-5 pt-5">
              <CardTitle className="text-slate-800 flex items-center text-sm font-semibold">
                <Clock className="h-4 w-4 mr-2 text-blue-500" />
                Hızlı İşlemler
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 pt-0 px-5 pb-5">
              {quickActions.map((action, index) => (
                <Button
                  key={action.label}
                  variant="ghost"
                  className="w-full justify-start text-slate-700 hover:text-blue-600 hover:bg-blue-50 h-10 text-sm font-medium transition-all duration-200 rounded-lg"
                  onClick={action.action}
                >
                  <span className={action.color}>{action.icon}</span>
                  <span className="ml-3">{action.label}</span>
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
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 shadow-sm">
            <CardHeader className="pb-3 px-5 pt-5">
              <CardTitle className="text-slate-800 flex items-center text-sm font-semibold">
                <Calendar className="h-4 w-4 mr-2 text-blue-600" />
                Bugünkü Durum
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0 px-5 pb-5">
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 font-medium">Toplam görev:</span>
                  <span className="text-slate-800 font-bold text-lg">{todayStats.total}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 font-medium">Tamamlanan:</span>
                  <span className="text-green-600 font-bold text-lg">{todayStats.completed}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 font-medium">Kalan:</span>
                  <span className="text-amber-600 font-bold text-lg">{todayStats.remaining}</span>
                </div>
                {todayStats.total > 0 && (
                  <div className="mt-4">
                    <div className="w-full bg-slate-200 rounded-full h-3">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-indigo-600 h-3 rounded-full transition-all duration-500 shadow-sm"
                        style={{ width: `${todayStats.total > 0 ? (todayStats.completed / todayStats.total) * 100 : 0}%` }}
                      />
                    </div>
                    <p className="text-xs text-slate-500 mt-2 text-center">
                      %{Math.round(todayStats.total > 0 ? (todayStats.completed / todayStats.total) * 100 : 0)} tamamlandı
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-slate-100 space-y-4">
        {/* User Info */}
        {user && (
          <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-xl">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-md">
              <span className="text-white text-sm font-bold">
                {user.email?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-slate-800 text-sm font-semibold truncate">
                {user.email}
              </p>
              <p className="text-slate-500 text-xs">Aktif kullanıcı</p>
            </div>
          </div>
        )}

        {/* Logout Button */}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="ghost"
              className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 h-11 text-sm font-medium transition-all duration-200 border border-red-200 hover:border-red-300 rounded-lg"
            >
              <LogOut className="h-4 w-4 mr-3" />
              <span>Güvenli Çıkış</span>
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-white border border-slate-200">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-slate-800">Çıkış yapmak istediğinizden emin misiniz?</AlertDialogTitle>
              <AlertDialogDescription className="text-slate-600">
                Bu işlem sizi uygulamadan çıkaracak ve giriş sayfasına yönlendirecektir.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200">
                İptal
              </AlertDialogCancel>
              <AlertDialogAction 
                onClick={handleSignOut}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                Çıkış Yap
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* App Version */}
        <div className="text-sm text-slate-400 text-center pt-2">
          <span className="gradient-text font-bold">PlanMaster Pro</span>
          <span className="block text-xs mt-1">Versiyon 1.0</span>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
