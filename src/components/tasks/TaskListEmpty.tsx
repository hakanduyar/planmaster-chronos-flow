
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const TaskListEmpty: React.FC = () => {
  return (
    <Card className="bg-white/5 border-white/10">
      <CardContent className="p-8 text-center">
        <p className="text-white/70">Henüz görev yok. İlk görevini ekle!</p>
      </CardContent>
    </Card>
  );
};

export default TaskListEmpty;
