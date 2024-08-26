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
      blogs: {
        Row: {
          content: Json | null
          created_at: string
          id: number
        }
        Insert: {
          content?: Json | null
          created_at?: string
          id?: number
        }
        Update: {
          content?: Json | null
          created_at?: string
          id?: number
        }
        Relationships: []
      }
      devices: {
        Row: {
          device_type: string
          id: string
          mac_address: string
          subscription_id: string | null
        }
        Insert: {
          device_type: string
          id?: string
          mac_address: string
          subscription_id?: string | null
        }
        Update: {
          device_type?: string
          id?: string
          mac_address?: string
          subscription_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "devices_subscription_id_fkey"
            columns: ["subscription_id"]
            isOneToOne: false
            referencedRelation: "subscriptions"
            referencedColumns: ["id"]
          },
        ]
      }
      subscriptions: {
        Row: {
          additional_info: string | null
          adult_content: boolean | null
          connections: string | null
          country_code: string | null
          created_at: string | null
          id: string
          order_number: number
          payement_email: string | null
          payement_full_name: string | null
          payement_order_id: string | null
          plan: Database["public"]["Enums"]["subscription_plan"]
          price: number
          quick_delivery: boolean | null
          status: string | null
          subscription_type: string | null
          user_email: string | null
          user_name: string | null
          user_phone: string | null
          vod: boolean | null
        }
        Insert: {
          additional_info?: string | null
          adult_content?: boolean | null
          connections?: string | null
          country_code?: string | null
          created_at?: string | null
          id?: string
          order_number?: never
          payement_email?: string | null
          payement_full_name?: string | null
          payement_order_id?: string | null
          plan: Database["public"]["Enums"]["subscription_plan"]
          price: number
          quick_delivery?: boolean | null
          status?: string | null
          subscription_type?: string | null
          user_email?: string | null
          user_name?: string | null
          user_phone?: string | null
          vod?: boolean | null
        }
        Update: {
          additional_info?: string | null
          adult_content?: boolean | null
          connections?: string | null
          country_code?: string | null
          created_at?: string | null
          id?: string
          order_number?: never
          payement_email?: string | null
          payement_full_name?: string | null
          payement_order_id?: string | null
          plan?: Database["public"]["Enums"]["subscription_plan"]
          price?: number
          quick_delivery?: boolean | null
          status?: string | null
          subscription_type?: string | null
          user_email?: string | null
          user_name?: string | null
          user_phone?: string | null
          vod?: boolean | null
        }
        Relationships: []
      }
      user_data: {
        Row: {
          created_at: string | null
          email: string
          id: number
          user_id: string
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: never
          user_id: string
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: never
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_most_occurring_country_codes: {
        Args: {
          limit_num: number
        }
        Returns: {
          country_code: string
          occurrences: number
        }[]
      }
      most_selling_plan: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      most_selling_plans: {
        Args: Record<PropertyKey, never>
        Returns: {
          plan_name: string
          count: number
        }[]
      }
      total_payments_over_days: {
        Args: {
          num_days: number
        }
        Returns: {
          payment_date: string
          total_payments: number
        }[]
      }
      total_sales_overall: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      total_sales_today: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      total_users: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
    }
    Enums: {
      subscription_plan: "monthly" | "quarterly" | "semi-annual" | "annual"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
