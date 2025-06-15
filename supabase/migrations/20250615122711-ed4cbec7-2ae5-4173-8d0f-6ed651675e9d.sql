
-- Categories table for user-specific categories
CREATE TABLE public.categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  name VARCHAR(50) NOT NULL,
  emoji VARCHAR(10) NOT NULL DEFAULT '📌',
  color VARCHAR(7) NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  
  -- Ensure unique category names per user
  UNIQUE(user_id, name)
);

-- Enable RLS for categories
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

-- RLS policies for categories
CREATE POLICY "Users can view their own categories" 
  ON public.categories 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own categories" 
  ON public.categories 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own categories" 
  ON public.categories 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own categories" 
  ON public.categories 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- Function to create default categories for new users
CREATE OR REPLACE FUNCTION public.create_default_categories()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO public.categories (user_id, name, emoji, color, description) VALUES
    (NEW.id, 'Spor & Fitness', '🏃‍♂️', '#EF4444', 'Spor ve fitness aktiviteleri'),
    (NEW.id, 'İş & Kariyer', '💼', '#3B82F6', 'İş ve kariyer hedefleri'),
    (NEW.id, 'Yazılım & Teknoloji', '💻', '#8B5CF6', 'Yazılım ve teknoloji projeleri'),
    (NEW.id, 'Eğitim & Öğrenme', '📚', '#F59E0B', 'Eğitim ve öğrenme faaliyetleri'),
    (NEW.id, 'Sağlık & Tıbbi', '🏥', '#10B981', 'Sağlık ve tıbbi işlemler'),
    (NEW.id, 'Aile & İlişkiler', '👨‍👩‍👧‍👦', '#EC4899', 'Aile ve ilişki aktiviteleri'),
    (NEW.id, 'Finansal & Yatırım', '💰', '#059669', 'Finansal ve yatırım konuları'),
    (NEW.id, 'Hobi & Sanat', '🎨', '#7C3AED', 'Hobi ve sanat aktiviteleri'),
    (NEW.id, 'Ev İşleri', '🏠', '#DC2626', 'Ev işleri ve temizlik'),
    (NEW.id, 'Sosyal Aktiviteler', '🎉', '#06B6D4', 'Sosyal aktiviteler ve etkinlikler'),
    (NEW.id, 'Seyahat & Tatil', '✈️', '#84CC16', 'Seyahat ve tatil planları'),
    (NEW.id, 'Alışveriş', '🛒', '#F97316', 'Alışveriş listeleri'),
    (NEW.id, 'Kişisel Gelişim', '🌱', '#6366F1', 'Kişisel gelişim aktiviteleri'),
    (NEW.id, 'Proje Yönetimi', '📊', '#0891B2', 'Proje yönetimi ve planlama'),
    (NEW.id, 'Okuma & Araştırma', '📖', '#7C2D12', 'Okuma ve araştırma faaliyetleri'),
    (NEW.id, 'Müzik & Eğlence', '🎵', '#BE185D', 'Müzik ve eğlence aktiviteleri'),
    (NEW.id, 'Gönüllülük & Yardım', '🤝', '#16A34A', 'Gönüllülük ve yardım faaliyetleri'),
    (NEW.id, 'Araç & Ulaşım', '🚗', '#374151', 'Araç bakım ve ulaşım'),
    (NEW.id, 'Beslenme & Yemek', '🍽️', '#CA8A04', 'Beslenme ve yemek planları'),
    (NEW.id, 'Diğer', '📌', '#6B7280', 'Diğer kategoriler');
  
  RETURN NEW;
END;
$$;

-- Trigger to create default categories when a new user signs up
CREATE TRIGGER on_auth_user_created_categories
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.create_default_categories();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to update updated_at on categories
CREATE TRIGGER update_categories_updated_at 
  BEFORE UPDATE ON public.categories
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
