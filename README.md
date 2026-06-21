# Tretrip Football Platform

Tretrip Football Platform is a bilingual `Next.js` App Router application for football news, editorial workflows, user engagement, and internal/public competitions. The project includes secure session-based authentication, role-based access control, Prisma + PostgreSQL persistence, a lightweight CMS, competition registration, comments, likes, and an admin/editor dashboard.

## Features

- Bilingual routing with `next-intl` under `/en` and `/ar`
- Secure cookie-based authentication with `bcryptjs` + `jose`
- Role and user-type controls for `admin`, `editor`, and `user`
- CMS flow for categories and articles with draft/published states
- Competition engine with public/internal visibility and duplicate registration protection
- Public comments with moderation controls
- Polymorphic likes for blogs and comments
- Responsive public UI with dark/light mode
- Prisma seed data for local development

## Tech Stack

- Next.js 16 App Router
- TypeScript
- Tailwind CSS 4
- Prisma ORM
- PostgreSQL
- next-intl
- Zod
- bcryptjs
- jose

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Copy the environment file and update values for your machine:

```bash
copy .env.example .env
```

3. Start a local PostgreSQL source.

Option A: standard PostgreSQL

- Set:
  `DATABASE_URL` to your pooled/runtime URL
  `DIRECT_URL` to a direct Postgres URL for Prisma CLI commands
  `SHADOW_DATABASE_URL` to a separate shadow database

Option B: Prisma local Postgres

```bash
npx prisma dev -d
```

- Copy:
  the Prisma ORM `DATABASE_URL`
  the direct TCP URL into `DIRECT_URL`
  the shadow TCP URL into `SHADOW_DATABASE_URL`

4. Run the schema migration:

```bash
npx prisma migrate dev --name tretrip_platform_rebuild
```

5. Seed development data:

```bash
npx prisma db seed
```

6. Start the app:

```bash
npm run dev
```

7. Build for production verification:

```bash
npm run build
```

## Environment Variables

```env
DATABASE_URL=
DIRECT_URL=
SHADOW_DATABASE_URL=
SESSION_SECRET=
NEXT_PUBLIC_APP_URL=
INTERNAL_EMAIL_DOMAINS=
```

## Seeded Users

All seeded users use the password:

```txt
Password123!
```

- `admin@tretrip.com` — Admin / Internal
- `editor@tretrip.com` — Editor / Internal
- `member@tretrip.com` — User / Internal
- `supporter@example.com` — User / External

## Useful Commands

```bash
npm install
npx prisma validate
npx prisma migrate dev --name tretrip_platform_rebuild
npx prisma db seed
npm run lint
npm run build
npm run dev
```

## Folder Structure

```txt
src/
  app/
    [locale]/
    api/
  components/
    auth/
    comments/
    competitions/
    layout/
    likes/
    news/
    ui/
  i18n/
  lib/
  types/
prisma/
  migrations/
  schema.prisma
  seed.ts
messages/
```

## Deployment Notes

- Use a production PostgreSQL database and separate shadow database.
- Set a strong `SESSION_SECRET`.
- Serve the app behind HTTPS so session cookies can stay secure.
- Run `npx prisma migrate deploy` during deployment.
- Seed only in development or controlled staging environments.
