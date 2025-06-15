
-- Tekrarlama türleri için enum oluştur
CREATE TYPE public.recurrence_type AS ENUM ('daily', 'weekly', 'monthly', 'yearly');

-- Tekrarlama pattern'ları için tablo
CREATE TABLE public.recurrence_patterns (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  category_id UUID REFERENCES public.categories(id) NOT NULL,
  priority TEXT NOT NULL DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high')),
  estimated_time INTEGER, -- minutes
  recurrence_type recurrence_type NOT NULL,
  interval_value INTEGER NOT NULL DEFAULT 1, -- her kaç gün/hafta/ay
  days_of_week INTEGER[], -- haftalık için: [1,2,3,4,5] (pazartesi-cuma)
  day_of_month INTEGER, -- aylık için: ayın kaçıncı günü
  start_date DATE NOT NULL,
  end_date DATE, -- null ise sonsuz
  max_occurrences INTEGER, -- null ise sonsuz
  is_active BOOLEAN NOT NULL DEFAULT true,
  tags TEXT[],
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Pattern'dan oluşturulan görev instance'ları için tablo
CREATE TABLE public.task_instances (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  pattern_id UUID REFERENCES public.recurrence_patterns(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  completed BOOLEAN NOT NULL DEFAULT false,
  priority TEXT NOT NULL DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high')),
  category_id UUID REFERENCES public.categories(id) NOT NULL,
  due_date TIMESTAMP WITH TIME ZONE NOT NULL,
  estimated_time INTEGER,
  actual_time INTEGER,
  tags TEXT[],
  notes TEXT,
  is_pattern_instance BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- RLS politikaları - recurrence_patterns
ALTER TABLE public.recurrence_patterns ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own patterns" 
  ON public.recurrence_patterns 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own patterns" 
  ON public.recurrence_patterns 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own patterns" 
  ON public.recurrence_patterns 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own patterns" 
  ON public.recurrence_patterns 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- RLS politikaları - task_instances
ALTER TABLE public.task_instances ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own task instances" 
  ON public.task_instances 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own task instances" 
  ON public.task_instances 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own task instances" 
  ON public.task_instances 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own task instances" 
  ON public.task_instances 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- Updated_at otomatik güncellemesi için trigger'lar
CREATE TRIGGER update_recurrence_patterns_updated_at 
  BEFORE UPDATE ON public.recurrence_patterns
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_task_instances_updated_at 
  BEFORE UPDATE ON public.task_instances
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Real-time updates için gerekli ayarlar
ALTER TABLE public.recurrence_patterns REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.recurrence_patterns;

ALTER TABLE public.task_instances REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.task_instances;

-- Pattern'dan görev instance'ları oluşturan fonksiyon (değişken adları düzeltildi)
CREATE OR REPLACE FUNCTION public.generate_task_instances_for_pattern(pattern_id UUID, days_ahead INTEGER DEFAULT 30)
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  pattern_record public.recurrence_patterns%ROWTYPE;
  today_date DATE;
  end_calculation_date DATE;
  instance_date DATE;
  instances_created INTEGER := 0;
  occurrence_count INTEGER := 0;
  max_occurrences INTEGER;
BEGIN
  -- Pattern bilgilerini al
  SELECT * INTO pattern_record FROM public.recurrence_patterns WHERE id = pattern_id AND is_active = true;
  
  IF NOT FOUND THEN
    RETURN 0;
  END IF;
  
  today_date := CURRENT_DATE;
  end_calculation_date := today_date + days_ahead;
  max_occurrences := pattern_record.max_occurrences;
  
  -- Eğer pattern'ın bitiş tarihi varsa ve hesaplama tarihinden önce ise, onu kullan
  IF pattern_record.end_date IS NOT NULL AND pattern_record.end_date < end_calculation_date THEN
    end_calculation_date := pattern_record.end_date;
  END IF;
  
  -- Başlangıç tarihinden itibaren instance'lar oluştur
  instance_date := GREATEST(pattern_record.start_date, today_date);
  
  WHILE instance_date <= end_calculation_date LOOP
    -- Maksimum occurrence kontrolü
    IF max_occurrences IS NOT NULL AND occurrence_count >= max_occurrences THEN
      EXIT;
    END IF;
    
    -- Bu tarihte zaten instance var mı kontrol et
    IF NOT EXISTS (
      SELECT 1 FROM public.task_instances 
      WHERE pattern_id = pattern_record.id 
      AND DATE(due_date) = instance_date
    ) THEN
      -- Yeni instance oluştur
      INSERT INTO public.task_instances (
        pattern_id, user_id, title, description, priority, category_id,
        due_date, estimated_time, tags, notes
      ) VALUES (
        pattern_record.id,
        pattern_record.user_id,
        pattern_record.title,
        pattern_record.description,
        pattern_record.priority,
        pattern_record.category_id,
        instance_date::timestamp with time zone,
        pattern_record.estimated_time,
        pattern_record.tags,
        pattern_record.notes
      );
      
      instances_created := instances_created + 1;
      occurrence_count := occurrence_count + 1;
    END IF;
    
    -- Sonraki tarihi hesapla
    CASE pattern_record.recurrence_type
      WHEN 'daily' THEN
        instance_date := instance_date + (pattern_record.interval_value || ' days')::interval;
      WHEN 'weekly' THEN
        instance_date := instance_date + (pattern_record.interval_value * 7 || ' days')::interval;
      WHEN 'monthly' THEN
        instance_date := instance_date + (pattern_record.interval_value || ' months')::interval;
      WHEN 'yearly' THEN
        instance_date := instance_date + (pattern_record.interval_value || ' years')::interval;
    END CASE;
  END LOOP;
  
  RETURN instances_created;
END;
$$;
