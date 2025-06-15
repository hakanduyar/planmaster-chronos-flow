export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      categories: {
        Row: {
          color: string
          created_at: string
          description: string | null
          emoji: string
          id: string
          name: string
          updated_at: string
          user_id: string
        }
        Insert: {
          color: string
          created_at?: string
          description?: string | null
          emoji?: string
          id?: string
          name: string
          updated_at?: string
          user_id: string
        }
        Update: {
          color?: string
          created_at?: string
          description?: string | null
          emoji?: string
          id?: string
          name?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      recurrence_patterns: {
        Row: {
          category_id: string
          created_at: string
          day_of_month: number | null
          days_of_week: number[] | null
          description: string | null
          end_date: string | null
          estimated_time: number | null
          id: string
          interval_value: number
          is_active: boolean
          max_occurrences: number | null
          notes: string | null
          priority: string
          recurrence_type: Database["public"]["Enums"]["recurrence_type"]
          start_date: string
          tags: string[] | null
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          category_id: string
          created_at?: string
          day_of_month?: number | null
          days_of_week?: number[] | null
          description?: string | null
          end_date?: string | null
          estimated_time?: number | null
          id?: string
          interval_value?: number
          is_active?: boolean
          max_occurrences?: number | null
          notes?: string | null
          priority?: string
          recurrence_type: Database["public"]["Enums"]["recurrence_type"]
          start_date: string
          tags?: string[] | null
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          category_id?: string
          created_at?: string
          day_of_month?: number | null
          days_of_week?: number[] | null
          description?: string | null
          end_date?: string | null
          estimated_time?: number | null
          id?: string
          interval_value?: number
          is_active?: boolean
          max_occurrences?: number | null
          notes?: string | null
          priority?: string
          recurrence_type?: Database["public"]["Enums"]["recurrence_type"]
          start_date?: string
          tags?: string[] | null
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "recurrence_patterns_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      task_instances: {
        Row: {
          actual_time: number | null
          category_id: string
          completed: boolean
          created_at: string
          description: string | null
          due_date: string
          estimated_time: number | null
          id: string
          is_pattern_instance: boolean
          notes: string | null
          pattern_id: string
          priority: string
          tags: string[] | null
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          actual_time?: number | null
          category_id: string
          completed?: boolean
          created_at?: string
          description?: string | null
          due_date: string
          estimated_time?: number | null
          id?: string
          is_pattern_instance?: boolean
          notes?: string | null
          pattern_id: string
          priority?: string
          tags?: string[] | null
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          actual_time?: number | null
          category_id?: string
          completed?: boolean
          created_at?: string
          description?: string | null
          due_date?: string
          estimated_time?: number | null
          id?: string
          is_pattern_instance?: boolean
          notes?: string | null
          pattern_id?: string
          priority?: string
          tags?: string[] | null
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "task_instances_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "task_instances_pattern_id_fkey"
            columns: ["pattern_id"]
            isOneToOne: false
            referencedRelation: "recurrence_patterns"
            referencedColumns: ["id"]
          },
        ]
      }
      tasks: {
        Row: {
          actual_time: number | null
          category_id: string
          completed: boolean
          created_at: string
          description: string | null
          due_date: string | null
          estimated_time: number | null
          id: string
          notes: string | null
          priority: string
          tags: string[] | null
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          actual_time?: number | null
          category_id: string
          completed?: boolean
          created_at?: string
          description?: string | null
          due_date?: string | null
          estimated_time?: number | null
          id?: string
          notes?: string | null
          priority?: string
          tags?: string[] | null
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          actual_time?: number | null
          category_id?: string
          completed?: boolean
          created_at?: string
          description?: string | null
          due_date?: string | null
          estimated_time?: number | null
          id?: string
          notes?: string | null
          priority?: string
          tags?: string[] | null
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "tasks_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      generate_task_instances_for_pattern: {
        Args: { pattern_id: string; days_ahead?: number }
        Returns: number
      }
    }
    Enums: {
      recurrence_type: "daily" | "weekly" | "monthly" | "yearly"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      recurrence_type: ["daily", "weekly", "monthly", "yearly"],
    },
  },
} as const
