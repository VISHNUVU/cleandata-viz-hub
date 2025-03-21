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
      column_stats: {
        Row: {
          column_name: string
          created_at: string
          file_id: string
          id: string
          max: number | null
          mean: number | null
          median: number | null
          min: number | null
          null_count: number
          unique_count: number
        }
        Insert: {
          column_name: string
          created_at?: string
          file_id: string
          id?: string
          max?: number | null
          mean?: number | null
          median?: number | null
          min?: number | null
          null_count?: number
          unique_count?: number
        }
        Update: {
          column_name?: string
          created_at?: string
          file_id?: string
          id?: string
          max?: number | null
          mean?: number | null
          median?: number | null
          min?: number | null
          null_count?: number
          unique_count?: number
        }
        Relationships: [
          {
            foreignKeyName: "column_stats_file_id_fkey"
            columns: ["file_id"]
            isOneToOne: false
            referencedRelation: "uploaded_files"
            referencedColumns: ["id"]
          },
        ]
      }
      data_issues: {
        Row: {
          affected_column: string
          created_at: string
          description: string
          file_id: string
          id: string
          suggested_fix: string
          type: string
        }
        Insert: {
          affected_column: string
          created_at?: string
          description: string
          file_id: string
          id?: string
          suggested_fix: string
          type: string
        }
        Update: {
          affected_column?: string
          created_at?: string
          description?: string
          file_id?: string
          id?: string
          suggested_fix?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "data_issues_file_id_fkey"
            columns: ["file_id"]
            isOneToOne: false
            referencedRelation: "uploaded_files"
            referencedColumns: ["id"]
          },
        ]
      }
      file_data: {
        Row: {
          columns: Json
          created_at: string
          file_id: string
          id: string
          quality_score: number
          rows: Json
          total_issues: number
          updated_at: string
        }
        Insert: {
          columns: Json
          created_at?: string
          file_id: string
          id?: string
          quality_score?: number
          rows: Json
          total_issues?: number
          updated_at?: string
        }
        Update: {
          columns?: Json
          created_at?: string
          file_id?: string
          id?: string
          quality_score?: number
          rows?: Json
          total_issues?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "file_data_file_id_fkey"
            columns: ["file_id"]
            isOneToOne: false
            referencedRelation: "uploaded_files"
            referencedColumns: ["id"]
          },
        ]
      }
      uploaded_files: {
        Row: {
          created_at: string
          filename: string
          id: string
          metadata: Json | null
          size: number
          status: string
          type: string
          updated_at: string
          url: string
        }
        Insert: {
          created_at?: string
          filename: string
          id?: string
          metadata?: Json | null
          size: number
          status: string
          type: string
          updated_at?: string
          url: string
        }
        Update: {
          created_at?: string
          filename?: string
          id?: string
          metadata?: Json | null
          size?: number
          status?: string
          type?: string
          updated_at?: string
          url?: string
        }
        Relationships: []
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

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
