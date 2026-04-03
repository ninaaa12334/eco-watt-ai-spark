export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      alerts: {
        Row: {
          created_at: string
          device_id: string | null
          household_id: string
          id: string
          is_read: boolean | null
          message_en: string
          message_sq: string
          severity: string
          type: string
        }
        Insert: {
          created_at?: string
          device_id?: string | null
          household_id: string
          id?: string
          is_read?: boolean | null
          message_en: string
          message_sq: string
          severity?: string
          type?: string
        }
        Update: {
          created_at?: string
          device_id?: string | null
          household_id?: string
          id?: string
          is_read?: boolean | null
          message_en?: string
          message_sq?: string
          severity?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "alerts_device_id_fkey"
            columns: ["device_id"]
            isOneToOne: false
            referencedRelation: "devices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "alerts_household_id_fkey"
            columns: ["household_id"]
            isOneToOne: false
            referencedRelation: "households"
            referencedColumns: ["id"]
          },
        ]
      }
      automation_actions: {
        Row: {
          action_type: string
          created_at: string
          description_en: string
          description_sq: string
          eur_saved: number | null
          household_id: string
          id: string
          kwh_saved: number | null
        }
        Insert: {
          action_type: string
          created_at?: string
          description_en: string
          description_sq: string
          eur_saved?: number | null
          household_id: string
          id?: string
          kwh_saved?: number | null
        }
        Update: {
          action_type?: string
          created_at?: string
          description_en?: string
          description_sq?: string
          eur_saved?: number | null
          household_id?: string
          id?: string
          kwh_saved?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "automation_actions_household_id_fkey"
            columns: ["household_id"]
            isOneToOne: false
            referencedRelation: "households"
            referencedColumns: ["id"]
          },
        ]
      }
      bills: {
        Row: {
          anomaly_reason: string | null
          created_at: string
          day_cost_eur: number | null
          day_kwh: number | null
          file_url: string | null
          household_id: string
          id: string
          is_anomaly: boolean | null
          month: string
          night_cost_eur: number | null
          night_kwh: number | null
          total_cost_eur: number | null
          total_kwh: number | null
          year: number
        }
        Insert: {
          anomaly_reason?: string | null
          created_at?: string
          day_cost_eur?: number | null
          day_kwh?: number | null
          file_url?: string | null
          household_id: string
          id?: string
          is_anomaly?: boolean | null
          month: string
          night_cost_eur?: number | null
          night_kwh?: number | null
          total_cost_eur?: number | null
          total_kwh?: number | null
          year: number
        }
        Update: {
          anomaly_reason?: string | null
          created_at?: string
          day_cost_eur?: number | null
          day_kwh?: number | null
          file_url?: string | null
          household_id?: string
          id?: string
          is_anomaly?: boolean | null
          month?: string
          night_cost_eur?: number | null
          night_kwh?: number | null
          total_cost_eur?: number | null
          total_kwh?: number | null
          year?: number
        }
        Relationships: [
          {
            foreignKeyName: "bills_household_id_fkey"
            columns: ["household_id"]
            isOneToOne: false
            referencedRelation: "households"
            referencedColumns: ["id"]
          },
        ]
      }
      community_reports: {
        Row: {
          area: string
          city: string
          created_at: string
          description: string | null
          id: string
          report_type: string
          status: string
          user_id: string
        }
        Insert: {
          area: string
          city?: string
          created_at?: string
          description?: string | null
          id?: string
          report_type?: string
          status?: string
          user_id: string
        }
        Update: {
          area?: string
          city?: string
          created_at?: string
          description?: string | null
          id?: string
          report_type?: string
          status?: string
          user_id?: string
        }
        Relationships: []
      }
      devices: {
        Row: {
          brand: string | null
          category: string
          created_at: string
          daily_usage_hours: number | null
          household_id: string
          id: string
          is_on: boolean | null
          is_standby: boolean | null
          model: string | null
          name: string
          photo_url: string | null
          power_watts: number
          room: string | null
          standby_watts: number | null
          updated_at: string
          waste_detected: boolean | null
          waste_kwh: number | null
          waste_reason: string | null
        }
        Insert: {
          brand?: string | null
          category: string
          created_at?: string
          daily_usage_hours?: number | null
          household_id: string
          id?: string
          is_on?: boolean | null
          is_standby?: boolean | null
          model?: string | null
          name: string
          photo_url?: string | null
          power_watts?: number
          room?: string | null
          standby_watts?: number | null
          updated_at?: string
          waste_detected?: boolean | null
          waste_kwh?: number | null
          waste_reason?: string | null
        }
        Update: {
          brand?: string | null
          category?: string
          created_at?: string
          daily_usage_hours?: number | null
          household_id?: string
          id?: string
          is_on?: boolean | null
          is_standby?: boolean | null
          model?: string | null
          name?: string
          photo_url?: string | null
          power_watts?: number
          room?: string | null
          standby_watts?: number | null
          updated_at?: string
          waste_detected?: boolean | null
          waste_kwh?: number | null
          waste_reason?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "devices_household_id_fkey"
            columns: ["household_id"]
            isOneToOne: false
            referencedRelation: "households"
            referencedColumns: ["id"]
          },
        ]
      }
      energy_records: {
        Row: {
          co2_kg: number | null
          cost_eur: number | null
          created_at: string
          date: string
          day_kwh: number | null
          household_id: string
          id: string
          night_kwh: number | null
          total_kwh: number | null
          waste_kwh: number | null
        }
        Insert: {
          co2_kg?: number | null
          cost_eur?: number | null
          created_at?: string
          date: string
          day_kwh?: number | null
          household_id: string
          id?: string
          night_kwh?: number | null
          total_kwh?: number | null
          waste_kwh?: number | null
        }
        Update: {
          co2_kg?: number | null
          cost_eur?: number | null
          created_at?: string
          date?: string
          day_kwh?: number | null
          household_id?: string
          id?: string
          night_kwh?: number | null
          total_kwh?: number | null
          waste_kwh?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "energy_records_household_id_fkey"
            columns: ["household_id"]
            isOneToOne: false
            referencedRelation: "households"
            referencedColumns: ["id"]
          },
        ]
      }
      households: {
        Row: {
          city: string | null
          created_at: string
          eco_mode_active: boolean | null
          energy_score: number | null
          home_size_m2: number | null
          id: string
          meter_type: string | null
          monthly_bill_avg: number | null
          name: string
          num_members: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          city?: string | null
          created_at?: string
          eco_mode_active?: boolean | null
          energy_score?: number | null
          home_size_m2?: number | null
          id?: string
          meter_type?: string | null
          monthly_bill_avg?: number | null
          name?: string
          num_members?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          city?: string | null
          created_at?: string
          eco_mode_active?: boolean | null
          energy_score?: number | null
          home_size_m2?: number | null
          id?: string
          meter_type?: string | null
          monthly_bill_avg?: number | null
          name?: string
          num_members?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      recommendations: {
        Row: {
          created_at: string
          device_id: string | null
          estimated_savings_eur: number | null
          estimated_savings_kwh: number | null
          household_id: string
          id: string
          impact: string
          is_applied: boolean | null
          text_en: string
          text_sq: string
        }
        Insert: {
          created_at?: string
          device_id?: string | null
          estimated_savings_eur?: number | null
          estimated_savings_kwh?: number | null
          household_id: string
          id?: string
          impact?: string
          is_applied?: boolean | null
          text_en: string
          text_sq: string
        }
        Update: {
          created_at?: string
          device_id?: string | null
          estimated_savings_eur?: number | null
          estimated_savings_kwh?: number | null
          household_id?: string
          id?: string
          impact?: string
          is_applied?: boolean | null
          text_en?: string
          text_sq?: string
        }
        Relationships: [
          {
            foreignKeyName: "recommendations_device_id_fkey"
            columns: ["device_id"]
            isOneToOne: false
            referencedRelation: "devices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recommendations_household_id_fkey"
            columns: ["household_id"]
            isOneToOne: false
            referencedRelation: "households"
            referencedColumns: ["id"]
          },
        ]
      }
      tariff_checks: {
        Row: {
          actual_tariff: string
          check_date: string
          check_time: string
          created_at: string
          expected_tariff: string
          household_id: string
          id: string
          is_correct: boolean
        }
        Insert: {
          actual_tariff: string
          check_date?: string
          check_time: string
          created_at?: string
          expected_tariff: string
          household_id: string
          id?: string
          is_correct: boolean
        }
        Update: {
          actual_tariff?: string
          check_date?: string
          check_time?: string
          created_at?: string
          expected_tariff?: string
          household_id?: string
          id?: string
          is_correct?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "tariff_checks_household_id_fkey"
            columns: ["household_id"]
            isOneToOne: false
            referencedRelation: "households"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
