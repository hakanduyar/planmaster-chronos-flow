
import React from 'react';
import { motion } from 'framer-motion';
import { Edit, Trash2, Calendar } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Category } from '@/types/category';

interface CategoryCardProps {
  category: Category;
  onEdit: (category: Category) => void;
  onDelete: (category: Category) => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, onEdit, onDelete }) => {
  const taskCount = category.task_count || 0;
  const canDelete = category.name !== 'Diğer';

  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }}
      transition={{ duration: 0.2 }}
      className="group"
    >
      <Card className="glass-card h-full cursor-pointer overflow-hidden">
        <CardContent className="p-4 h-full flex flex-col">
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <div className="text-3xl">{category.emoji}</div>
            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                size="sm"
                variant="ghost"
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(category);
                }}
                className="h-8 w-8 p-0 hover:bg-white/20"
              >
                <Edit className="h-4 w-4 text-white/70" />
              </Button>
              {canDelete && (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(category);
                  }}
                  className="h-8 w-8 p-0 hover:bg-red-500/20"
                >
                  <Trash2 className="h-4 w-4 text-red-400" />
                </Button>
              )}
            </div>
          </div>

          {/* Category Name */}
          <h3 className="text-white font-semibold text-lg mb-2 line-clamp-2">
            {category.name}
          </h3>

          {/* Description */}
          {category.description && (
            <p className="text-white/60 text-sm mb-3 line-clamp-2 flex-1">
              {category.description}
            </p>
          )}

          {/* Color Bar */}
          <div 
            className="h-1 w-full rounded-full mb-3 group-hover:shadow-lg transition-shadow"
            style={{ backgroundColor: category.color }}
          />

          {/* Stats */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-white/70">Aktif Görev</span>
              <span className="text-white font-semibold">{taskCount}</span>
            </div>
            
            <div className="flex items-center text-xs text-white/50">
              <Calendar className="h-3 w-3 mr-1" />
              <span>
                {new Date(category.created_at).toLocaleDateString('tr-TR')}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default CategoryCard;
