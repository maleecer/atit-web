import { createClient, SupabaseClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    "[Supabase] Missing env vars:",
    !supabaseUrl ? "NEXT_PUBLIC_SUPABASE_URL" : "",
    !supabaseAnonKey ? "NEXT_PUBLIC_SUPABASE_ANON_KEY" : ""
  )
}

export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey)

// Admin client with service role (server-side only) - always available if env vars set
export const supabaseAdmin: SupabaseClient = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY
  ? createClient(supabaseUrl, process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })
  : supabase // Fallback to anon client if service key not set (will need RLS policies)

// Types
export interface Author {
  id: string
  name: string
  bio: string | null
  avatar_url: string | null
  linkedin_url: string | null
  github_url: string | null
  student_id: string | null
  created_at: string
}

export interface Tag {
  id: string
  name: string
  category: string
}

export interface ArticleImage {
  id: string
  article_id: string
  url: string
  caption: string | null
  position: "hero" | "inline-left" | "inline-right" | "gallery" | "full-width"
  sort_order: number
}

export interface Article {
  id: string
  slug: string
  title: string
  excerpt: string | null
  content: string
  pattern_type: "standard" | "tutorial" | "casestudy"
  read_time_minutes: number
  status: "draft" | "review" | "published"
  author_id: string | null
  published_at: string | null
  created_at: string
  updated_at: string
  author?: Author | null
  tags?: Tag[]
  images?: ArticleImage[]
}

export interface ArticleWithRelations extends Article {
  author: Author
  tags: Tag[]
  images: ArticleImage[]
}

// Admin types
export interface ArticleInput {
  slug: string
  title: string
  excerpt?: string
  content: string
  pattern_type?: "standard" | "tutorial" | "casestudy"
  read_time_minutes?: number
  status?: "draft" | "review" | "published"
  author_id?: string
  published_at?: string
  tag_ids?: string[]
  images?: Omit<ArticleImage, "id" | "article_id">[]
}

export interface AuthorInput {
  name: string
  bio?: string
  avatar_url?: string
  linkedin_url?: string
  github_url?: string
  student_id?: string
}