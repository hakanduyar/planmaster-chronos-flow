
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Repeat, 
  Play, 
  Pause, 
  Edit, 
  Trash2, 
  MoreVertical,
  Calendar,
  Clock
} from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { usePatterns } from '@/hooks/usePatterns';
import { RecurrencePattern } from '@/types/pattern';
import PatternModal from './PatternModal';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';

const PatternList: React.FC = () => {
  const [editingPattern, setEditingPattern] = useState<RecurrencePattern | null>(null);
  const [showPatternModal, setShowPatternModal] = useState(false);
  
  const { 
    patterns, 
    isLoading, 
    updatePattern, 
    deletePattern, 
    generateInstances,
    isGenerating 
  } = usePatterns();

  const handleEditPattern = (pattern: RecurrencePattern) => {
    setEditingPattern(pattern);
    setShowPatternModal(true);
  };

  const handleDeletePattern = (patternId: string) => {
    if (confirm('Bu pattern\'ı silmek istediğinizden emin misiniz?')) {
      deletePattern(patternId);
    }
  };

  const handleTogglePattern = (pattern: RecurrencePattern) => {
    updatePattern({ 
      id: pattern.id, 
      data: { is_active: !pattern.is_active } 
    });
  };

  const handleGenerateInstances = (patternId: string) => {
    generateInstances({ patternId, daysAhead: 30 });
  };

  const getRecurrenceText = (pattern: RecurrencePattern) => {
    const { recurrence_type, interval_value } = pattern;
    const typeText = {
      daily: interval_value === 1 ? 'Her gün' : `${interval_value} günde bir`,
      weekly: interval_value === 1 ? 'Her hafta' : `${interval_value} haftada bir`,
      monthly: interval_value === 1 ? 'Her ay' : `${interval_value} ayda bir`,
      yearly: interval_value === 1 ? 'Her yıl' : `${interval_value} yılda bir`,
    };
    return typeText[recurrence_type];
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500/20 text-red-400';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400';
      case 'low': return 'bg-green-500/20 text-green-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const handleAddPattern = () => {
    setEditingPattern(null);
    setShowPatternModal(true);
  };

  const handleCloseModal = () => {
    setShowPatternModal(false);
    setEditingPattern(null);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-white">Pattern'lar yükleniyor...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <Repeat className="h-6 w-6" />
          Tekrarlayan Görevler
        </h2>
        <Button 
          onClick={handleAddPattern}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          Yeni Pattern
        </Button>
      </div>

      {/* Pattern List */}
      <div className="space-y-3">
        {patterns.length === 0 ? (
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-8 text-center">
              <p className="text-white/70">Henüz tekrarlayan görev yok. İlk pattern'ını ekle!</p>
            </CardContent>
          </Card>
        ) : (
          patterns.map((pattern, index) => (
            <motion.div
              key={pattern.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className={`
                border-white/10 transition-colors
                ${pattern.is_active ? 'bg-white/5 hover:bg-white/10' : 'bg-white/2 opacity-60'}
              `}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 flex-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleTogglePattern(pattern)}
                        className="p-1 h-8 w-8"
                      >
                        {pattern.is_active ? (
                          <Pause className="h-4 w-4 text-yellow-400" />
                        ) : (
                          <Play className="h-4 w-4 text-green-400" />
                        )}
                      </Button>
                      
                      <div className="flex-1">
                        <h3 className="font-medium text-white">
                          {pattern.title}
                        </h3>
                        {pattern.description && (
                          <p className="text-sm text-white/60 mt-1">
                            {pattern.description}
                          </p>
                        )}
                        
                        <div className="flex items-center gap-2 mt-2 text-sm text-white/70">
                          <Repeat className="h-3 w-3" />
                          <span>{getRecurrenceText(pattern)}</span>
                          
                          <Calendar className="h-3 w-3 ml-2" />
                          <span>
                            {format(new Date(pattern.start_date), 'dd MMM', { locale: tr })} tarihinden başlayarak
                          </span>
                          
                          {pattern.estimated_time && (
                            <>
                              <Clock className="h-3 w-3 ml-2" />
                              <span>{pattern.estimated_time}dk</span>
                            </>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-2 mt-2">
                          {pattern.category && (
                            <Badge 
                              className="text-xs"
                              style={{ 
                                backgroundColor: `${pattern.category.color}20`,
                                color: pattern.category.color 
                              }}
                            >
                              {pattern.category.emoji} {pattern.category.name}
                            </Badge>
                          )}
                          
                          <Badge className={`text-xs ${getPriorityColor(pattern.priority)}`}>
                            {pattern.priority === 'high' ? 'Yüksek' : 
                             pattern.priority === 'medium' ? 'Orta' : 'Düşük'}
                          </Badge>
                          
                          {!pattern.is_active && (
                            <Badge className="text-xs bg-gray-500/20 text-gray-400">
                              Duraklatıldı
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleGenerateInstances(pattern.id)}
                        disabled={isGenerating || !pattern.is_active}
                        className="bg-blue-600/20 border-blue-500/30 text-blue-400 hover:bg-blue-600/30"
                      >
                        {isGenerating ? 'Oluşturuluyor...' : 'Görevleri Oluştur'}
                      </Button>
                      
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="p-1 h-8 w-8">
                            <MoreVertical className="h-4 w-4 text-white/60" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="bg-gray-900 border-white/20">
                          <DropdownMenuItem 
                            onClick={() => handleEditPattern(pattern)}
                            className="text-white hover:bg-white/10 cursor-pointer"
                          >
                            <Edit className="h-4 w-4 mr-2" />
                            Düzenle
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handleDeletePattern(pattern.id)}
                            className="text-red-400 hover:bg-red-500/10 cursor-pointer"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Sil
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))
        )}
      </div>

      {/* Pattern Modal */}
      <PatternModal
        isOpen={showPatternModal}
        onClose={handleCloseModal}
        pattern={editingPattern}
      />
    </div>
  );
};

export default PatternList;
