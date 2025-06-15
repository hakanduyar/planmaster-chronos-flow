
import React from 'react';
import { View } from 'react-big-calendar';
import moment from 'moment';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';

interface CalendarHeaderProps {
  view: View;
  date: Date;
  onNavigate: (date: Date) => void;
  onViewChange: (view: View) => void;
  onAddTask: () => void;
}

const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  view,
  date,
  onNavigate,
  onViewChange,
  onAddTask,
}) => {
  const handlePrevious = () => {
    const unit = view === 'month' ? 'month' : view === 'week' ? 'week' : 'day';
    onNavigate(moment(date).subtract(1, unit).toDate());
  };

  const handleNext = () => {
    const unit = view === 'month' ? 'month' : view === 'week' ? 'week' : 'day';
    onNavigate(moment(date).add(1, unit).toDate());
  };

  const handleToday = () => {
    onNavigate(new Date());
  };

  const getDateFormat = () => {
    switch (view) {
      case 'month':
        return 'MMMM YYYY';
      case 'week':
      case 'day':
        return 'DD MMMM YYYY';
      default:
        return 'MMMM YYYY';
    }
  };

  return (
    <Card className="bg-white/5 border-white/10">
      <CardContent className="p-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          {/* Navigation */}
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrevious}
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={handleToday}
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              Bugün
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={handleNext}
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            
            <h2 className="text-xl font-semibold text-white ml-4">
              {moment(date).format(getDateFormat())}
            </h2>
          </div>

          {/* View Controls and Add Task Button */}
          <div className="flex items-center space-x-2">
            <div className="flex bg-white/10 rounded-lg p-1">
              {(['month', 'week', 'day'] as View[]).map((v) => (
                <Button
                  key={v}
                  variant={view === v ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => onViewChange(v)}
                  className={`${
                    view === v 
                      ? 'bg-blue-600 text-white' 
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  } text-xs`}
                >
                  {v === 'month' ? 'Ay' : v === 'week' ? 'Hafta' : 'Gün'}
                </Button>
              ))}
            </div>
            
            <Button
              onClick={onAddTask}
              className="bg-blue-600 hover:bg-blue-700 text-white"
              size="sm"
            >
              <Plus className="h-4 w-4 mr-2" />
              Görev Ekle
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CalendarHeader;
