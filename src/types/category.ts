
export interface Category {
  id: string;
  user_id: string;
  name: string;
  emoji: string;
  color: string;
  description?: string;
  created_at: string;
  updated_at: string;
  task_count?: number;
}

export interface CreateCategoryData {
  name: string;
  emoji: string;
  color: string;
  description?: string;
}

export interface UpdateCategoryData {
  name?: string;
  emoji?: string;
  color?: string;
  description?: string;
}

export const DEFAULT_COLORS = [
  '#EF4444', '#3B82F6', '#8B5CF6', '#F59E0B', '#10B981',
  '#EC4899', '#059669', '#7C3AED', '#DC2626', '#06B6D4',
  '#84CC16', '#F97316', '#6366F1', '#0891B2', '#7C2D12',
  '#BE185D', '#16A34A', '#374151', '#CA8A04', '#6B7280'
];

export const DEFAULT_EMOJIS = [
  '📌', '🎯', '⭐', '🔥', '💡', '🚀', '⚡', '🌟', '💎', '🎨',
  '📚', '💻', '🎵', '🏃‍♂️', '💼', '🏠', '🍽️', '🛒', '✈️', '🎉',
  '💰', '🏥', '🚗', '🌱', '📊', '🤝', '📖', '🎮', '🏆', '🎪'
];
