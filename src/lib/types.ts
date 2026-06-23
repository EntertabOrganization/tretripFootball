export type Locale = "en" | "ar";

export type Role = "ADMIN" | "EDITOR" | "USER";

export type PublishStatus = "DRAFT" | "PUBLISHED";

export type LocalizedText = {
  en: string;
  ar: string;
};

export type Profile = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string | null;
  role: Role;
  locale_preference?: Locale | null;
};

export type NewsCategory = {
  id: string;
  slug: string;
  title_en: string;
  title_ar: string;
  description_en: string;
  description_ar: string;
};

export type NewsArticle = {
  id: string;
  slug: string;
  category_id: string;
  author_id: string | null;
  title_en: string;
  title_ar: string;
  summary_en: string;
  summary_ar: string;
  content_en: string;
  content_ar: string;
  cover_image_url: string | null;
  status: PublishStatus;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  category?: NewsCategory;
  author?: Profile | null;
  likes_count?: number;
  comments_count?: number;
};

export type Competition = {
  id: string;
  slug: string;
  title_en: string;
  title_ar: string;
  description_en: string;
  description_ar: string;
  cover_image_url: string | null;
  start_date: string;
  end_date: string;
  created_at: string;
  updated_at: string;
  registrations_count?: number;
  winners_count?: number;
};

export type CommentRecord = {
  id: string;
  user_id: string;
  news_id: string;
  comment_text: string;
  is_hidden: boolean;
  created_at: string;
  updated_at: string;
  author?: Profile | null;
  likes_count?: number;
};

export type LeaderboardEntry = {
  user_id: string;
  full_name: string;
  wins: number;
  participations: number;
};

export type PaginatedResult<T> = {
  items: T[];
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
};
