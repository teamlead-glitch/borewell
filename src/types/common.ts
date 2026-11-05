// Every Laravel API answer: { status, message?, data, errors? }
export type CmsJson<T> = {
  status: boolean;
  message?: string;
  data?: T;
  errors?: Record<string, string[]>;
};

// Browser fetch wrapper result; components check `success`
export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
  // Laravel validation errors (422), field -> messages
  errors?: Record<string, string[]>;
};

export interface PageContent {
  id: number;
  title: string;
  short_description?: string | null;
  content: string | null;
  image_url?: string | null;
  is_active: number | string;
  updated_at?: string;
  seo_detail?: SeoDetails | null;
}

export interface SeoDetails {
  id: number;
  slug: string;
  short_slug?: string;
  meta_title: string;
  meta_description: string;
  meta_keywords?: string | null;
  canonical_url?: string | null;
  og_title?: string | null;
  og_description?: string | null;
  twitter_title?: string | null;
  twitter_description?: string | null;
  schema_markup?: string | null;
  is_indexed: number;
  is_followed: number;
  og_image_url?: string | null;
  twitter_image_url?: string | null;
}
