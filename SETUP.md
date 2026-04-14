# ASCEND360 — Development & Deployment Guide

## Quick Start (Local Development)

### Prerequisites
- Node.js 20+
- PostgreSQL 15+ (local) or a Supabase/Vercel Postgres project
- npm 9+

### 1. Install dependencies
```bash
npm install
```

### 2. Configure environment
```bash
cp .env.example .env
```

Edit `.env` with your actual values. At minimum:
- `DATABASE_URL` — your PostgreSQL connection string
- `JWT_SECRET` — generate with `openssl rand -base64 32`
- `REFRESH_SECRET` — generate with `openssl rand -base64 32` (different from JWT_SECRET)

### 3. Set up the database

**Option A — Standard PostgreSQL (local or cloud):**
```bash
npm run db:migrate    # Runs prisma migrate dev
npm run db:seed       # Seeds with initial data
```

**Option B — Prisma Postgres (managed):**
```bash
npx prisma dev        # Starts local Prisma Postgres
npm run db:seed
```

### 4. Start dev server
```bash
npm run dev
```

Site: http://localhost:3000  
Admin: http://localhost:3000/admin  

### 5. Admin login (after seeding)
```
Email:    admin@ascend360.org
Password: Ascend360@Admin!
```
⚠️ **Change this password immediately after first login.**

---

## Deployment (Vercel)

### Step 1: Database
Recommended: [Supabase](https://supabase.com) (free tier available)
1. Create a new Supabase project
2. Copy the `postgresql://...` connection string (connection pooler > Transaction mode)
3. Set `DATABASE_URL` in Vercel environment variables

### Step 2: Deploy to Vercel
```bash
npx vercel --prod
```

Or connect via GitHub → Vercel dashboard → Import Project

### Step 3: Environment variables
Add all values from `.env.example` in the Vercel dashboard under:
Project → Settings → Environment Variables

Required for production:
- `DATABASE_URL`
- `JWT_SECRET`
- `REFRESH_SECRET`
- `NEXT_PUBLIC_SITE_URL`

### Step 4: Run migrations on production database
```bash
DATABASE_URL="your-prod-url" npx prisma migrate deploy
DATABASE_URL="your-prod-url" npm run db:seed
```

### Step 5: Custom domains
- `ascend360.org` → points to Vercel deployment
- The admin portal runs at `/admin` on the same app (not a subdomain, to avoid CORS complexity)
  - If you want `portal.ascend360.org`, add it as an alias in Vercel and configure accordingly

---

## Project Structure

```
ascend360/
├── app/
│   ├── (public)/          ← Public website (Header + Footer layout)
│   │   ├── page.tsx       ← Homepage
│   │   ├── about/         ← About page
│   │   ├── projects/      ← Projects index + Xcel360 detail
│   │   ├── blog/          ← Blog index + post pages
│   │   ├── impact/        ← Impact page
│   │   ├── team/          ← Team page
│   │   ├── get-involved/  ← Get Involved page
│   │   └── contact/       ← Contact form
│   ├── (admin)/           ← Admin portal (protected by middleware)
│   │   ├── login/         ← Login page (only public admin page)
│   │   ├── page.tsx       ← Dashboard
│   │   ├── blog/          ← Blog management
│   │   ├── team/          ← Team management
│   │   ├── impact/        ← Impact stories management
│   │   └── submissions/   ← Contact form submissions
│   └── api/               ← API routes
├── components/
│   ├── layout/            ← Header, Footer, AdminSidebar
│   ├── sections/          ← Reusable page sections
│   └── forms/             ← Form components
├── lib/
│   ├── prisma.ts          ← Database client
│   ├── auth.ts            ← JWT utilities
│   ├── utils.ts           ← Helpers
│   └── validations.ts     ← Zod schemas
├── prisma/
│   ├── schema.prisma      ← Database schema
│   └── seed.ts            ← Initial data
└── middleware.ts          ← Admin route protection
```

---

## Phase 2 Pages (Next Sprint)

Still to build:
- `/projects` — Projects index
- `/projects/xcel360` — Xcel360 detail
- `/blog` — Blog index with search + filters
- `/blog/[slug]` — Blog post page
- `/impact` — Impact page
- `/team` — Team page
- `/get-involved` — Get Involved page
- `/contact` — Contact form
- `/admin/blog` — Blog management CRUD
- `/admin/team` — Team management
- `/admin/impact` — Impact stories CRUD
- `/admin/submissions` — Submissions viewer

---

## Security Notes

1. The admin portal is **not linked** from any public page
2. All admin routes require a valid JWT access token (checked by middleware)
3. Rate limiting is applied to login (5/15min) and contact (3/hr) endpoints
4. Passwords must be 12+ chars with uppercase, number, and special char
5. JWTs are stored in `httpOnly` cookies (not accessible via JavaScript)
6. Input is validated with Zod on both client and server
