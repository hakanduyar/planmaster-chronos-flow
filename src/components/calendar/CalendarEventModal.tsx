
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, Edit, Trash2, Calendar as CalendarIcon } from 'lucide-react';
import { useTasks } from '@/hooks/useTasks';
import { Task } from '@/types/task';
import TaskModal from '@/components/tasks/TaskModal';
import moment from 'moment';

interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  task: Task;
  resource?: any;
}

interface CalendarEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: CalendarEvent;
}

const CalendarEventModal: React.FC<CalendarEventModalProps> = ({
  isOpen,
  onClose,
  event,
}) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const { toggleTask, deleteTask } = useTasks();

  const handleToggleComplete = () => {
    toggleTask(event.task);
    onClose();
  };

  const handleDelete = () => {
    if (confirm('Bu görevi silmek istediğinizden emin misiniz?')) {
      deleteTask(event.task.id);
      onClose();
    }
  };

  const handleEdit = () => {
    setShowEditModal(true);
    onClose();
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500/20 text-red-400';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400';
      case 'low': return 'bg-green-500/20 text-green-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case 'high': return 'Yüksek';
      case 'medium': return 'Orta';
      case 'low': return 'Düşük';
      default: return 'Orta';
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="bg-gray-900/95 backdrop-blur-sm border-white/10 max-w-md">
          <DialogHeader>
            <DialogTitle className="text-white text-lg">
              Görev Detayları
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            {/* Görev Başlığı */}
            <div>
              <h3 className={`text-xl font-semibold ${
                event.task.completed 
                  ? 'text-white/60 line-through' 
                  : 'text-white'
              }`}>
                {event.task.title}
              </h3>
              {event.task.description && (
                <p className="text-white/70 mt-2">
                  {event.task.description}
                </p>
              )}
            </div>

            {/* Durum ve Özellikler */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-white/70">Durum:</span>
                <Badge className={event.task.completed ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'}>
                  {event.task.completed ? 'Tamamlandı' : 'Bekliyor'}
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-white/70">Öncelik:</span>
                <Badge className={getPriorityColor(event.task.priority)}>
                  {getPriorityText(event.task.priority)}
                </Badge>
              </div>

              {event.task.category && (
                <div className="flex items-center justify-between">
                  <span className="text-white/70">Kategori:</span>
                  <Badge 
                    style={{ 
                      backgroundColor: `${event.task.category.color}20`,
                      color: event.task.category.color 
                    }}
                  >
                    {event.task.category.emoji} {event.task.category.name}
                  </Badge>
                </div>
              )}

              <div className="flex items-center justify-between">
                <span className="text-white/70">Tarih:</span>
                <div className="flex items-center text-white/90">
                  <CalendarIcon className="h-4 w-4 mr-2" />
                  {moment(event.start).format('DD MMMM YYYY, HH:mm')}
                </div>
              </div>

              {event.task.estimated_time && (
                <div className="flex items-center justify-between">
                  <span className="text-white/70">Tahmini Süre:</span>
                  <div className="flex items-center text-white/90">
                    <Clock className="h-4 w-4 mr-2" />
                    {event.task.estimated_time} dakika
                  </div>
                </div>
              )}
            </div>

            {/* Notlar */}
            {event.task.notes && (
              <div>
                <h4 className="text-white/70 text-sm font-medium mb-2">Notlar:</h4>
                <p className="text-white/80 text-sm bg-white/5 p-3 rounded-lg">
                  {event.task.notes}
                </p>
              </div>
            )}

            {/* Eylem Butonları */}
            <div className="flex space-x-2 pt-4">
              <Button
                onClick={handleToggleComplete}
                className={`flex-1 ${
                  event.task.completed
                    ? 'bg-yellow-600 hover:bg-yellow-700'
                    : 'bg-green-600 hover:bg-green-700'
                } text-white`}
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                {event.task.completed ? 'Tekrar Aktif Et' : 'Tamamla'}
              </Button>
              
              <Button
                onClick={handleEdit}
                variant="outline"
                className="bg-white/10 text-white hover:bg-white/20 border-white/20"
              >
                <Edit className="h-4 w-4" />
              </Button>
              
              <Button
                onClick={handleDelete}
                variant="outline"
                className="bg-red-500/10 text-red-400 hover:bg-red-500/20 border-red-500/20"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Task Modal */}
      <TaskModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        task={event.task}
      />
    </>
  );
};

export default CalendarEventModal;
