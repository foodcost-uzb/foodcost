# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Modern landing page + admin panel for FOODCOST — restaurant consulting company (HoReCa sector). Built with Next.js 16, TypeScript, Tailwind CSS 4, Framer Motion, and Supabase (PostgreSQL).

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Database**: Supabase (PostgreSQL)
- **Auth**: JWT (httpOnly cookies) + bcryptjs
- **Package Manager**: npm

## Commands

```bash
# Development
npm run dev       # Start dev server at http://localhost:3000

# Build
npm run build     # Production build
npm run start     # Start production server

# Linting
npm run lint      # Run ESLint
```

## Project Structure

```
src/
├── app/
│   ├── globals.css          # Global styles, CSS variables, animations
│   ├── layout.tsx           # Root layout with metadata
│   ├── page.tsx             # Home page (server component, fetches data from Supabase)
│   ├── admin/
│   │   ├── login/           # Admin login page (minimal layout)
│   │   └── (protected)/     # Auth-guarded admin pages
│   │       ├── page.tsx         # Dashboard (KPIs, chart, recent leads)
│   │       ├── content/         # CRUD for services, products, cases, testimonials
│   │       ├── leads/           # Lead management with filters
│   │       ├── analytics/       # Page views, events, conversion
│   │       └── settings/        # Site settings by groups
│   └── api/
│       ├── auth/            # Login, logout, session check
│       ├── content/         # CRUD: services, products, cases, testimonials
│       ├── leads/           # Lead submission (public) + management (admin)
│       ├── settings/        # Site settings + calculator settings
│       └── analytics/       # Track pageviews/events + aggregated stats
├── components/
│   ├── Header.tsx           # Navigation with mobile menu
│   ├── Hero.tsx             # Hero section (accepts settings prop)
│   ├── Services.tsx         # Bento grid services (accepts services prop)
│   ├── About.tsx            # Company info (accepts settings prop)
│   ├── Cases.tsx            # Case studies (accepts cases prop)
│   ├── Calculator.tsx       # Interactive food cost calculator
│   ├── Testimonials.tsx     # Client reviews carousel (accepts testimonials prop)
│   ├── Podcast.tsx          # Podcast section (accepts settings prop)
│   ├── ContactForm.tsx      # Contact form → POST /api/leads
│   ├── CallbackModal.tsx    # Callback modal → POST /api/leads
│   ├── Footer.tsx           # Site footer (accepts settings prop)
│   ├── FloatingButtons.tsx  # Fixed WhatsApp/Phone buttons
│   ├── AnalyticsTracker.tsx # Tracks page views (client component)
│   └── admin/
│       ├── AdminSidebar.tsx # Admin navigation
│       └── AdminHeader.tsx  # Admin top bar with breadcrumbs
├── lib/
│   ├── utils.ts             # Utility functions (cn for classnames)
│   ├── auth.ts              # JWT auth: verify, hash, cookies
│   ├── data.ts              # Server-side data fetching from Supabase
│   ├── analytics.ts         # Client-side trackPageView/trackEvent
│   ├── SettingsContext.tsx   # React context for site settings
│   └── supabase/
│       ├── client.ts        # Browser Supabase client
│       ├── server.ts        # Server Supabase client + admin client
│       └── types.ts         # TypeScript types for all DB tables
└── scripts/
    ├── schema.sql           # Database schema (10 tables + RLS + indexes)
    └── seed.sql             # Seed data from original hardcoded content
```

## Architecture

### Data Flow
- `page.tsx` is an async server component that fetches all content from Supabase via `src/lib/data.ts`
- Data is passed as props to client components (Hero, Services, Products, etc.)
- Components have hardcoded defaults as fallbacks when Supabase is not configured
- Site settings (contacts, social links) are shared via `SettingsProvider` React Context
- Admin mutations call API routes which use `revalidateTag('tag', 'max')` for cache invalidation

### Auth
- Admin login: username/password → bcryptjs verification → JWT in httpOnly cookie (`admin_session`, 24h)
- Protected layout (`admin/(protected)/layout.tsx`) calls `verifyAdmin()` server-side
- API routes check `verifyAdmin()` for admin-only operations; public GET routes use anon Supabase client

### Database (Supabase)
- 10 tables: `admin_users`, `services`, `products`, `cases`, `testimonials`, `leads`, `site_settings`, `calculator_settings`, `page_views`, `analytics_events`
- RLS: public SELECT for content, public INSERT for leads/analytics; admin operations use service role key
- Icons stored as string names in DB, mapped to Lucide components via `iconMap` in client components

## Design System

CSS variables defined in `globals.css`:
- `--primary`: #f97316 (orange)
- `--secondary`: #1e293b (slate)
- `--accent`: #fbbf24 (amber)

Brand colors: `#5838a8` (purple), `#c04880` (pink), `#1a1a2e` (dark)

Key classes:
- `.gradient-text` - Purple to pink gradient text
- `.glass` - Glassmorphism effect
- `.bento-item` - Animated card hover effect
- `.animate-float` - Floating animation
- `.animate-pulse-glow` - Glowing pulse effect

## Environment Variables

See `.env.example` for required variables:
- `NEXT_PUBLIC_SUPABASE_URL` — Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — Supabase anonymous key
- `SUPABASE_SERVICE_ROLE_KEY` — Supabase service role key (server-only)
- `JWT_SECRET` — Secret for signing admin JWT tokens

## Notes

- All public components use Framer Motion for scroll-triggered animations
- Components accept data via props but fall back to defaults when Supabase is unavailable
- Admin panel at `/admin/login` — default credentials in seed: admin / admin123
- Next.js 16: `revalidateTag` requires 2 args (`tag`, `profile`), use `'max'` for SWR behavior
- Next.js 16: route params are `Promise<{ id: string }>` and must be awaited
