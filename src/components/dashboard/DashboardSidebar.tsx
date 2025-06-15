
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Target } from 'lucide-react';
import QuickTaskInput from '@/components/tasks/QuickTaskInput';

const DashboardSidebar: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      {/* Quick Task Add */}
      <Card className="glass-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-white flex items-center text-lg">
            <Plus className="w-5 h-5 mr-2 text-blue-400" />
            Hızlı Görev Ekle
          </CardTitle>
        </CardHeader>
        <CardContent>
          <QuickTaskInput />
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <Card className="glass-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-white flex items-center text-lg">
            <Target className="w-5 h-5 mr-2 text-green-400" />
            Günlük Hedef
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">5/8</div>
            <div className="text-white/70 text-sm">Görev Tamamlandı</div>
            <div className="w-full bg-white/10 rounded-full h-2 mt-3">
              <div 
                className="bg-green-400 h-2 rounded-full transition-all duration-300"
                style={{ width: '62.5%' }}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default DashboardSidebar;
