
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, CheckSquare, Clock, Filter, Plus, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import QuickTaskInput from '../tasks/QuickTaskInput';

const DashboardSidebar: React.FC = () => {
  const quickActions = [
    { label: 'Yeni Görev', icon: <Plus className="h-4 w-4" />, action: () => {}, color: 'text-blue-400' },
    { label: 'Takvim', icon: <Calendar className="h-4 w-4" />, action: () => {}, color: 'text-green-400' },
    { label: 'Filtreler', icon: <Filter className="h-4 w-4" />, action: () => {}, color: 'text-purple-400' },
    { label: 'Ayarlar', icon: <Settings className="h-4 w-4" />, action: () => {}, color: 'text-gray-400' },
  ];

  return (
    <div className="w-80 h-full bg-gray-900/50 backdrop-blur-sm border-r border-white/10 p-6 space-y-6">
      {/* Quick Task Input */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="glass-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-white flex items-center">
              <CheckSquare className="h-5 w-5 mr-2 text-blue-400" />
              Hızlı Görev Ekle
            </CardTitle>
          </CardHeader>
          <CardContent>
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
        <Card className="glass-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-white flex items-center">
              <Clock className="h-5 w-5 mr-2 text-blue-400" />
              Hızlı İşlemler
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {quickActions.map((action, index) => (
              <Button
                key={action.label}
                variant="ghost"
                className="w-full justify-start text-white hover:bg-white/10"
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
        <Card className="glass-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-white flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-blue-400" />
              Bugün
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm text-white/70">
              <div className="flex justify-between">
                <span>Toplam görev:</span>
                <span className="text-white font-semibold">0</span>
              </div>
              <div className="flex justify-between">
                <span>Tamamlanan:</span>
                <span className="text-green-400 font-semibold">0</span>
              </div>
              <div className="flex justify-between">
                <span>Kalan:</span>
                <span className="text-yellow-400 font-semibold">0</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default DashboardSidebar;
