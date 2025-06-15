
import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Calendar, Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Category } from '@/types/category';

interface CategoryStatsProps {
  categories: Category[];
}

const CategoryStats: React.FC<CategoryStatsProps> = ({ categories }) => {
  const totalCategories = categories.length;
  const totalTasks = categories.reduce((sum, cat) => sum + (cat.task_count || 0), 0);
  
  // En aktif kategori
  const mostActiveCategory = categories.reduce((prev, current) => 
    (current.task_count || 0) > (prev.task_count || 0) ? current : prev
  , categories[0]);

  // Bu hafta en çok kullanılan (şimdilik en çok görevli ilk 3)
  const topCategories = [...categories]
    .sort((a, b) => (b.task_count || 0) - (a.task_count || 0))
    .slice(0, 3);

  // Renk dağılımı
  const colorDistribution = categories.reduce((acc, cat) => {
    acc[cat.color] = (acc[cat.color] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-6">
      {/* Genel İstatistikler */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <BarChart3 className="w-5 h-5 mr-2 text-blue-400" />
              Genel Bakış
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-white/80">Toplam Kategori</span>
              <span className="text-white font-semibold text-lg">{totalCategories}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-white/80">Toplam Görev</span>
              <span className="text-blue-400 font-semibold text-lg">{totalTasks}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-white/80">Ortalama Görev</span>
              <span className="text-green-400 font-semibold text-lg">
                {totalCategories > 0 ? Math.round(totalTasks / totalCategories) : 0}
              </span>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* En Aktif Kategori */}
      {mostActiveCategory && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-green-400" />
                En Aktif Kategori
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-3">
                <div className="text-2xl">{mostActiveCategory.emoji}</div>
                <div>
                  <div className="text-white font-semibold">{mostActiveCategory.name}</div>
                  <div className="text-green-400 text-sm">
                    {mostActiveCategory.task_count || 0} görev
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Top 3 Kategori */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Target className="w-5 h-5 mr-2 text-purple-400" />
              Popüler Kategoriler
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {topCategories.map((category, index) => (
              <div key={category.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-white/50 text-sm">#{index + 1}</span>
                  <span className="text-lg">{category.emoji}</span>
                  <span className="text-white text-sm truncate">{category.name}</span>
                </div>
                <span className="text-purple-400 text-sm font-semibold">
                  {category.task_count || 0}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>
      </motion.div>

      {/* Renk Dağılımı */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-orange-400" />
              Renk Dağılımı
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 gap-2">
              {Object.entries(colorDistribution).slice(0, 8).map(([color, count]) => (
                <div key={color} className="flex flex-col items-center space-y-1">
                  <div
                    className="w-6 h-6 rounded-full border border-white/30"
                    style={{ backgroundColor: color }}
                  />
                  <span className="text-white/70 text-xs">{count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default CategoryStats;
