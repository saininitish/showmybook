export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      venues: {
        Row: {
          id: string
          name: string
          address: string | null
          city: string
          capacity: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          address?: string | null
          city: string
          capacity?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          address?: string | null
          city?: string
          capacity?: number | null
          created_at?: string
          updated_at?: string
        }
      }
      events: {
        Row: {
          id: string
          venue_id: string
          title: string
          description: string | null
          type: 'movie' | 'concert' | 'comedy' | 'festival'
          genre: string | null
          event_date: string
          event_time: string
          image_url: string | null
          featured: boolean | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          venue_id: string
          title: string
          description?: string | null
          type: 'movie' | 'concert' | 'comedy' | 'festival'
          genre?: string | null
          event_date: string
          event_time: string
          image_url?: string | null
          featured?: boolean | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          venue_id?: string
          title?: string
          description?: string | null
          type?: 'movie' | 'concert' | 'comedy' | 'festival'
          genre?: string | null
          event_date?: string
          event_time?: string
          image_url?: string | null
          featured?: boolean | null
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}
