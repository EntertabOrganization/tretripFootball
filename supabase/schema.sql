create extension if not exists pgcrypto;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  first_name text not null,
  last_name text not null,
  email text not null unique,
  phone_number text,
  role text not null default 'USER' check (role in ('ADMIN', 'EDITOR', 'USER')),
  locale_preference text check (locale_preference in ('en', 'ar')),
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.news_categories (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title_en text not null,
  title_ar text not null,
  description_en text not null,
  description_ar text not null,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.news (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  category_id uuid not null references public.news_categories (id) on delete restrict,
  author_id uuid references public.profiles (id) on delete set null,
  title_en text not null,
  title_ar text not null,
  summary_en text not null,
  summary_ar text not null,
  content_en text not null,
  content_ar text not null,
  cover_image_url text,
  status text not null default 'DRAFT' check (status in ('DRAFT', 'PUBLISHED')),
  published_at timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.competitions (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title_en text not null,
  title_ar text not null,
  description_en text not null,
  description_ar text not null,
  cover_image_url text,
  start_date timestamptz not null,
  end_date timestamptz not null,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.competition_registrations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  competition_id uuid not null references public.competitions (id) on delete cascade,
  is_winner boolean not null default false,
  created_at timestamptz not null default timezone('utc', now()),
  unique (user_id, competition_id)
);

create table if not exists public.comments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  news_id uuid not null references public.news (id) on delete cascade,
  comment_text text not null,
  is_hidden boolean not null default false,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.news_likes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  news_id uuid not null references public.news (id) on delete cascade,
  created_at timestamptz not null default timezone('utc', now()),
  unique (user_id, news_id)
);

create table if not exists public.comment_likes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  comment_id uuid not null references public.comments (id) on delete cascade,
  created_at timestamptz not null default timezone('utc', now()),
  unique (user_id, comment_id)
);

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at before update on public.profiles
for each row execute function public.set_updated_at();

drop trigger if exists news_categories_set_updated_at on public.news_categories;
create trigger news_categories_set_updated_at before update on public.news_categories
for each row execute function public.set_updated_at();

drop trigger if exists news_set_updated_at on public.news;
create trigger news_set_updated_at before update on public.news
for each row execute function public.set_updated_at();

drop trigger if exists competitions_set_updated_at on public.competitions;
create trigger competitions_set_updated_at before update on public.competitions
for each row execute function public.set_updated_at();

drop trigger if exists comments_set_updated_at on public.comments;
create trigger comments_set_updated_at before update on public.comments
for each row execute function public.set_updated_at();

create index if not exists idx_news_status_published_at on public.news (status, published_at desc);
create index if not exists idx_news_category on public.news (category_id);
create index if not exists idx_competitions_dates on public.competitions (start_date, end_date);
create index if not exists idx_comments_news on public.comments (news_id, is_hidden);
create index if not exists idx_competition_registrations_competition on public.competition_registrations (competition_id, is_winner);
