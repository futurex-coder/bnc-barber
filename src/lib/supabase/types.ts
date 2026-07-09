/**
 * Database types — generated from the Supabase schema.
 * Regenerate after schema changes (Supabase MCP `generate_typescript_types`
 * or `supabase gen types typescript`).
 */
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      about_settings: {
        Row: {
          body: string | null
          eyebrow: string | null
          id: number
          image_url: string | null
          lead: string | null
          title: string | null
          updated_at: string
          values: Json
        }
        Insert: {
          body?: string | null
          eyebrow?: string | null
          id?: number
          image_url?: string | null
          lead?: string | null
          title?: string | null
          updated_at?: string
          values?: Json
        }
        Update: {
          body?: string | null
          eyebrow?: string | null
          id?: number
          image_url?: string | null
          lead?: string | null
          title?: string | null
          updated_at?: string
          values?: Json
        }
        Relationships: []
      }
      academy_images: {
        Row: {
          alt: string | null
          created_at: string
          id: string
          sort_order: number
          url: string
        }
        Insert: {
          alt?: string | null
          created_at?: string
          id?: string
          sort_order?: number
          url: string
        }
        Update: {
          alt?: string | null
          created_at?: string
          id?: string
          sort_order?: number
          url?: string
        }
        Relationships: []
      }
      academy_modules: {
        Row: {
          created_at: string
          id: string
          number: string | null
          points: string[]
          sort_order: number
          summary: string | null
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          number?: string | null
          points?: string[]
          sort_order?: number
          summary?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          number?: string | null
          points?: string[]
          sort_order?: number
          summary?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      academy_settings: {
        Row: {
          cta_label: string | null
          cta_url: string | null
          description: string | null
          duration: string | null
          eyebrow: string | null
          id: number
          lead: string | null
          price_note: string | null
          start_dates: Json
          title: string | null
          updated_at: string
        }
        Insert: {
          cta_label?: string | null
          cta_url?: string | null
          description?: string | null
          duration?: string | null
          eyebrow?: string | null
          id?: number
          lead?: string | null
          price_note?: string | null
          start_dates?: Json
          title?: string | null
          updated_at?: string
        }
        Update: {
          cta_label?: string | null
          cta_url?: string | null
          description?: string | null
          duration?: string | null
          eyebrow?: string | null
          id?: number
          lead?: string | null
          price_note?: string | null
          start_dates?: Json
          title?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      admin_users: {
        Row: {
          created_at: string
          email: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          email?: string | null
          user_id?: string
        }
        Relationships: []
      }
      barber_images: {
        Row: {
          alt: string | null
          barber_id: string
          created_at: string
          id: string
          sort_order: number
          url: string
        }
        Insert: {
          alt?: string | null
          barber_id: string
          created_at?: string
          id?: string
          sort_order?: number
          url: string
        }
        Update: {
          alt?: string | null
          barber_id?: string
          created_at?: string
          id?: string
          sort_order?: number
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "barber_images_barber_id_fkey"
            columns: ["barber_id"]
            isOneToOne: false
            referencedRelation: "barbers"
            referencedColumns: ["id"]
          },
        ]
      }
      barbers: {
        Row: {
          avatar_url: string | null
          bio: string | null
          booking_url: string | null
          created_at: string
          id: string
          instagram_handle: string | null
          instagram_url: string | null
          is_placeholder: boolean
          location_id: string | null
          name: string
          role: string | null
          slug: string
          sort_order: number
          specialties: string[]
          tagline: string | null
          updated_at: string
          years_experience: number
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          booking_url?: string | null
          created_at?: string
          id?: string
          instagram_handle?: string | null
          instagram_url?: string | null
          is_placeholder?: boolean
          location_id?: string | null
          name: string
          role?: string | null
          slug: string
          sort_order?: number
          specialties?: string[]
          tagline?: string | null
          updated_at?: string
          years_experience?: number
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          booking_url?: string | null
          created_at?: string
          id?: string
          instagram_handle?: string | null
          instagram_url?: string | null
          is_placeholder?: boolean
          location_id?: string | null
          name?: string
          role?: string | null
          slug?: string
          sort_order?: number
          specialties?: string[]
          tagline?: string | null
          updated_at?: string
          years_experience?: number
        }
        Relationships: [
          {
            foreignKeyName: "barbers_location_id_fkey"
            columns: ["location_id"]
            isOneToOne: false
            referencedRelation: "locations"
            referencedColumns: ["id"]
          },
        ]
      }
      events: {
        Row: {
          created_at: string
          date: string
          href: string | null
          id: string
          label: string | null
          sort_order: number
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          date: string
          href?: string | null
          id?: string
          label?: string | null
          sort_order?: number
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          date?: string
          href?: string | null
          id?: string
          label?: string | null
          sort_order?: number
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      gallery: {
        Row: {
          alt: string | null
          created_at: string
          id: string
          sort_order: number
          tall: boolean
          updated_at: string
          url: string
        }
        Insert: {
          alt?: string | null
          created_at?: string
          id?: string
          sort_order?: number
          tall?: boolean
          updated_at?: string
          url: string
        }
        Update: {
          alt?: string | null
          created_at?: string
          id?: string
          sort_order?: number
          tall?: boolean
          updated_at?: string
          url?: string
        }
        Relationships: []
      }
      guests: {
        Row: {
          bio: string | null
          created_at: string
          discipline: string | null
          featured: boolean
          from_date: string | null
          id: string
          image_url: string | null
          instagram_handle: string | null
          instagram_url: string | null
          is_placeholder: boolean
          location_id: string | null
          name: string
          slug: string
          sort_order: number
          specialties: string[]
          style: string | null
          to_date: string | null
          updated_at: string
        }
        Insert: {
          bio?: string | null
          created_at?: string
          discipline?: string | null
          featured?: boolean
          from_date?: string | null
          id?: string
          image_url?: string | null
          instagram_handle?: string | null
          instagram_url?: string | null
          is_placeholder?: boolean
          location_id?: string | null
          name: string
          slug: string
          sort_order?: number
          specialties?: string[]
          style?: string | null
          to_date?: string | null
          updated_at?: string
        }
        Update: {
          bio?: string | null
          created_at?: string
          discipline?: string | null
          featured?: boolean
          from_date?: string | null
          id?: string
          image_url?: string | null
          instagram_handle?: string | null
          instagram_url?: string | null
          is_placeholder?: boolean
          location_id?: string | null
          name?: string
          slug?: string
          sort_order?: number
          specialties?: string[]
          style?: string | null
          to_date?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "guests_location_id_fkey"
            columns: ["location_id"]
            isOneToOne: false
            referencedRelation: "locations"
            referencedColumns: ["id"]
          },
        ]
      }
      location_images: {
        Row: {
          alt: string | null
          created_at: string
          id: string
          location_id: string
          sort_order: number
          url: string
        }
        Insert: {
          alt?: string | null
          created_at?: string
          id?: string
          location_id: string
          sort_order?: number
          url: string
        }
        Update: {
          alt?: string | null
          created_at?: string
          id?: string
          location_id?: string
          sort_order?: number
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "location_images_location_id_fkey"
            columns: ["location_id"]
            isOneToOne: false
            referencedRelation: "locations"
            referencedColumns: ["id"]
          },
        ]
      }
      locations: {
        Row: {
          address_line: string | null
          blurb: string | null
          city: string | null
          created_at: string
          description: string | null
          district: string | null
          email: string | null
          fresha_url: string | null
          hours: Json
          id: string
          lat: number | null
          lng: number | null
          map_embed_query: string | null
          name: string
          phone: string | null
          postal_code: string | null
          price_range: string | null
          slug: string
          sort_order: number
          status: string
          updated_at: string
        }
        Insert: {
          address_line?: string | null
          blurb?: string | null
          city?: string | null
          created_at?: string
          description?: string | null
          district?: string | null
          email?: string | null
          fresha_url?: string | null
          hours?: Json
          id?: string
          lat?: number | null
          lng?: number | null
          map_embed_query?: string | null
          name: string
          phone?: string | null
          postal_code?: string | null
          price_range?: string | null
          slug: string
          sort_order?: number
          status?: string
          updated_at?: string
        }
        Update: {
          address_line?: string | null
          blurb?: string | null
          city?: string | null
          created_at?: string
          description?: string | null
          district?: string | null
          email?: string | null
          fresha_url?: string | null
          hours?: Json
          id?: string
          lat?: number | null
          lng?: number | null
          map_embed_query?: string | null
          name?: string
          phone?: string | null
          postal_code?: string | null
          price_range?: string | null
          slug?: string
          sort_order?: number
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      services: {
        Row: {
          booking_url: string | null
          category: string | null
          created_at: string
          description: string | null
          duration_min: number
          id: string
          name: string
          popular: boolean
          price: number
          sort_order: number
          tags: string[]
          updated_at: string
        }
        Insert: {
          booking_url?: string | null
          category?: string | null
          created_at?: string
          description?: string | null
          duration_min?: number
          id?: string
          name: string
          popular?: boolean
          price?: number
          sort_order?: number
          tags?: string[]
          updated_at?: string
        }
        Update: {
          booking_url?: string | null
          category?: string | null
          created_at?: string
          description?: string | null
          duration_min?: number
          id?: string
          name?: string
          popular?: boolean
          price?: number
          sort_order?: number
          tags?: string[]
          updated_at?: string
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          business_name: string
          calcom_url: string | null
          city: string
          contacts_intro: string | null
          default_fresha_url: string | null
          email: string
          id: number
          instagram_barber_handle: string | null
          instagram_barber_url: string | null
          instagram_shop_handle: string | null
          instagram_shop_url: string | null
          phone: string
          tagline: string
          updated_at: string
        }
        Insert: {
          business_name?: string
          calcom_url?: string | null
          city?: string
          contacts_intro?: string | null
          default_fresha_url?: string | null
          email?: string
          id?: number
          instagram_barber_handle?: string | null
          instagram_barber_url?: string | null
          instagram_shop_handle?: string | null
          instagram_shop_url?: string | null
          phone?: string
          tagline?: string
          updated_at?: string
        }
        Update: {
          business_name?: string
          calcom_url?: string | null
          city?: string
          contacts_intro?: string | null
          default_fresha_url?: string | null
          email?: string
          id?: number
          instagram_barber_handle?: string | null
          instagram_barber_url?: string | null
          instagram_shop_handle?: string | null
          instagram_shop_url?: string | null
          phone?: string
          tagline?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_admin: { Args: Record<string, never>; Returns: boolean }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database["public"]

export type Tables<T extends keyof PublicSchema["Tables"]> =
  PublicSchema["Tables"][T]["Row"]
export type TablesInsert<T extends keyof PublicSchema["Tables"]> =
  PublicSchema["Tables"][T]["Insert"]
export type TablesUpdate<T extends keyof PublicSchema["Tables"]> =
  PublicSchema["Tables"][T]["Update"]
