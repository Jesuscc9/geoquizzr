export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      country: {
        Row: {
          id: number
          capital: string
          capitalInfo: Json
          car: Json
          cca2: string
          continents: string[]
          flag: string
          flags: Json
          latlng: number[]
          maps: Json | null
          name: Json
          population: number
        }
        Insert: {
          id?: number
          capital?: string
          capitalInfo: Json
          car: Json
          cca2: string
          continents: string[]
          flag: string
          flags: Json
          latlng: number[]
          maps?: Json | null
          name: Json
          population: number
        }
        Update: {
          id?: number
          capital?: string
          capitalInfo?: Json
          car?: Json
          cca2?: string
          continents?: string[]
          flag?: string
          flags?: Json
          latlng?: number[]
          maps?: Json | null
          name?: Json
          population?: number
        }
      }
      guess: {
        Row: {
          id: number
          round_id: number
          latlng: number[] | null
          country_cca2: string | null
          created_at: string | null
          timed_out: boolean | null
          consumed_seconds: number | null
          score: number | null
          is_correct: boolean
        }
        Insert: {
          id?: number
          round_id: number
          latlng?: number[] | null
          country_cca2?: string | null
          created_at?: string | null
          timed_out?: boolean | null
          consumed_seconds?: number | null
          score?: number | null
          is_correct: boolean
        }
        Update: {
          id?: number
          round_id?: number
          latlng?: number[] | null
          country_cca2?: string | null
          created_at?: string | null
          timed_out?: boolean | null
          consumed_seconds?: number | null
          score?: number | null
          is_correct?: boolean
        }
      }
      profiles: {
        Row: {
          id: string
          updated_at: string | null
          username: string | null
          avatar_url: string | null
          email: string | null
        }
        Insert: {
          id: string
          updated_at?: string | null
          username?: string | null
          avatar_url?: string | null
          email?: string | null
        }
        Update: {
          id?: string
          updated_at?: string | null
          username?: string | null
          avatar_url?: string | null
          email?: string | null
        }
      }
      quizzes: {
        Row: {
          id: number
          total_seconds: number | null
          created_by: string
          created_at: string
          uuid: string
          total_rounds: number
          finished: boolean | null
        }
        Insert: {
          id?: number
          total_seconds?: number | null
          created_by?: string
          created_at?: string
          uuid?: string
          total_rounds?: number
          finished?: boolean | null
        }
        Update: {
          id?: number
          total_seconds?: number | null
          created_by?: string
          created_at?: string
          uuid?: string
          total_rounds?: number
          finished?: boolean | null
        }
      }
      rounds: {
        Row: {
          id: number
          created_at: string | null
          consumed_seconds: number | null
          solved: boolean
          ended_at: string | null
          static_image_latlng: number[]
          country_cca2: string
          quizz_uuid: string
        }
        Insert: {
          id?: number
          created_at?: string | null
          consumed_seconds?: number | null
          solved?: boolean
          ended_at?: string | null
          static_image_latlng: number[]
          country_cca2: string
          quizz_uuid: string
        }
        Update: {
          id?: number
          created_at?: string | null
          consumed_seconds?: number | null
          solved?: boolean
          ended_at?: string | null
          static_image_latlng?: number[]
          country_cca2?: string
          quizz_uuid?: string
        }
      }
    }
    Views: {
      random_countries: {
        Row: {
          id: number | null
          capital: string | null
          capitalInfo: Json | null
          car: Json | null
          cca2: string | null
          continents: string[] | null
          flag: string | null
          flags: Json | null
          latlng: number[] | null
          maps: Json | null
          name: Json | null
          population: number | null
        }
        Insert: {
          id?: number | null
          capital?: string | null
          capitalInfo?: Json | null
          car?: Json | null
          cca2?: string | null
          continents?: string[] | null
          flag?: string | null
          flags?: Json | null
          latlng?: number[] | null
          maps?: Json | null
          name?: Json | null
          population?: number | null
        }
        Update: {
          id?: number | null
          capital?: string | null
          capitalInfo?: Json | null
          car?: Json | null
          cca2?: string | null
          continents?: string[] | null
          flag?: string | null
          flags?: Json | null
          latlng?: number[] | null
          maps?: Json | null
          name?: Json | null
          population?: number | null
        }
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
