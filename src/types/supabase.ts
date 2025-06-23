export type Database = {
  public: {
    Tables: {
      schools: {
        Row: {
          id: string
          name: string
          code: string
          logo_url: string | null
          address: string | null
          contact_email: string | null
          contact_phone: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          code: string
          logo_url?: string | null
          address?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          code?: string
          logo_url?: string | null
          address?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      users: {
        Row: {
          id: string
          school_id: string | null
          email: string | null
          phone: string | null
          role: string
          first_name: string | null
          last_name: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          school_id?: string
          email?: string
          phone?: string
          role: string
          first_name?: string
          last_name?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          school_id?: string
          email?: string
          phone?: string
          role?: string
          first_name?: string
          last_name?: string
          created_at?: string
          updated_at?: string
        }
      }
      // Add other table types as needed...
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
  }
}