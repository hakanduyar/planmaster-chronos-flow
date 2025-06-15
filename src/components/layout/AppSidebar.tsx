
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
    { label: 'Ayarlar', icon: <Settings className="h-4 w-4" />, action: () => {}, color: 'text-slate-600' },
  ];

  return (
    <Sidebar className="bg-white/95 backdrop-blur-sm border-r border-slate-200/60 h-full shadow-lg">
      <SidebarHeader className="p-4 border-b border-slate-200/60">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-r from-blue-500/10 to-blue-600/10 rounded-lg">
            <CheckSquare className="h-5 w-5 text-blue-600" />
          </div>
          <span className="text-lg font-bold gradient-text">PlanMaster</span>
        </div>
      </SidebarHeader>

      <SidebarContent className="p-4 space-y-4 flex-1">
        <SidebarGroup>
          <SidebarGroupLabel className="text-slate-600 text-sm font-medium flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            Navigasyon
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={location.pathname === item.url}
                    className="text-slate-700 hover:bg-slate-100 h-10 text-base transition-colors data-[active=true]:bg-blue-50 data-[active=true]:text-blue-700 data-[active=true]:border-blue-200"
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="glass-card border-slate-200/60">
            <CardHeader className="pb-2 px-4 pt-4">
              <CardTitle className="text-slate-700 flex items-center text-sm font-medium">
                <CheckSquare className="h-4 w-4 mr-2 text-blue-600" />
                Hızlı Görev Ekle
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0 px-4 pb-4">
              <QuickTaskInput />
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="glass-card border-slate-200/60">
            <CardHeader className="pb-2 px-4 pt-4">
              <CardTitle className="text-slate-700 flex items-center text-sm font-medium">
                <Clock className="h-4 w-4 mr-2 text-blue-600" />
                Hızlı İşlemler
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 pt-0 px-4 pb-4">
              {quickActions.map((action, index) => (
                <Button
                  key={action.label}
                  variant="ghost"
                  className="w-full justify-start text-slate-700 hover:bg-slate-100 h-9 text-sm transition-colors"
                  onClick={action.action}
                >
                  <span className={action.color}>{action.icon}</span>
                  <span className="ml-2">{action.label}</span>
                </Button>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="glass-card border-slate-200/60">
            <CardHeader className="pb-2 px-4 pt-4">
              <CardTitle className="text-slate-700 flex items-center text-sm font-medium">
                <Calendar className="h-4 w-4 mr-2 text-blue-600" />
                Bugün
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0 px-4 pb-4">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Toplam görev:</span>
                  <span className="text-slate-800 font-semibold">{todayStats.total}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Tamamlanan:</span>
                  <span className="text-green-600 font-semibold">{todayStats.completed}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Kalan:</span>
                  <span className="text-orange-600 font-semibold">{todayStats.remaining}</span>
                </div>
                {todayStats.total > 0 && (
                  <div className="mt-3">
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-500"
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

      <SidebarFooter className="p-4 border-t border-slate-200/60 space-y-3">
        {user && (
          <div className="flex items-center space-x-3 px-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-semibold">
                {user.email?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-slate-700 text-sm font-medium truncate">
                {user.email}
              </p>
            </div>
          </div>
        )}

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="ghost"
              className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 h-10 text-sm transition-colors border border-red-200 hover:border-red-300"
            >
              <LogOut className="h-4 w-4 mr-2" />
              <span>Çıkış Yap</span>
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-white border-slate-200">
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

        <div className="text-sm text-slate-500 text-center">
          <span className="gradient-text font-medium">PlanMaster Pro</span>
          <span className="block text-xs mt-1">v1.0</span>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
