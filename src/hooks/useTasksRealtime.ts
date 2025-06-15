
import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export const useTasksRealtime = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    let channel: any = null;

    const setupRealtimeSubscription = async () => {
      try {
        channel = supabase
          .channel(`tasks-changes-${Math.random()}`) // Her hook instance için unique channel name
          .on(
            'postgres_changes',
            {
              event: '*',
              schema: 'public',
              table: 'tasks'
            },
            () => {
              console.log('Tasks table changed, invalidating queries');
              queryClient.invalidateQueries({ queryKey: ['tasks'] });
            }
          )
          .subscribe((status) => {
            console.log('Subscription status:', status);
          });
      } catch (error) {
        console.error('Real-time subscription error:', error);
      }
    };

    setupRealtimeSubscription();

    return () => {
      if (channel) {
        console.log('Unsubscribing from channel');
        supabase.removeChannel(channel);
      }
    };
  }, []); // Empty dependency array to run only once
};
