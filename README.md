# Digital Growth Ecosystem Platform

Premium enterprise-grade digital marketing website with no-code CMS, OTP Super Admin, CRM, analytics, blog, media library, and SEO/AEO/GEO controls.

## Tech Stack

- **Frontend:** Next.js 15, React 19, TypeScript, Tailwind CSS, Framer Motion, GSAP, ShadCN UI
- **Backend:** Next.js Server Actions, PostgreSQL, Prisma ORM
- **Auth:** NextAuth v5 with Email OTP (no public registration)
- **Storage:** Cloudinary
- **Email:** Resend + custom SMTP profiles
- **Deploy:** Vercel

## Getting Started

### Prerequisites

- Node.js 20+ and npm
- PostgreSQL — **easiest:** Docker Desktop (see below), or [Neon](https://neon.tech) / [Supabase](https://supabase.com) cloud URL

### Setup

#### Windows PowerShell: `npm` script blocked?

If you see *"running scripts is disabled on this system"* for `npm.ps1`, use any of these:

**Option A — use `npm.cmd` (quickest):**
```powershell
cd "C:\Users\Vishnu\Desktop\brand project"
& "C:\Program Files\nodejs\npm.cmd" install
& "C:\Program Files\nodejs\npm.cmd" run dev
```

**Option B — allow scripts for your user only (one-time):**
```powershell
Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
```
Then close and reopen PowerShell and run `npm install` normally.

**Option C — use Command Prompt or the batch helpers:**
```text
scripts\install.bat
scripts\dev.bat
```

1. Install dependencies:

```bash
npm install
```

2. Copy environment variables:

```bash
cp .env.example .env
```

3. Start PostgreSQL (pick one):

**Docker (recommended on Windows):**
```powershell
# Start Docker Desktop first, then:
scripts\start-db.bat
# or: npm run db:up
```

**Cloud:** Create a free Postgres DB on Neon/Supabase and paste the connection string into `.env`.

4. Configure `.env`:

```powershell
copy .env.example .env
```

- `DATABASE_URL` — use the value from `.env.example` for Docker, or your cloud URL
- `AUTH_SECRET` — `openssl rand -base64 32`
- `ENCRYPTION_KEY` — 64-char hex (32 bytes) for SMTP encryption
- `ADMIN_PRIMARY_EMAIL` / `ADMIN_BACKUP_EMAIL` — Super Admin emails
- `RESEND_API_KEY` — For OTP and transactional email
- Cloudinary credentials (optional for dev — uses placeholders)

5. Push database schema and seed:

```bash
npm run db:push
npm run db:seed
```

6. Build the static marketing site (copies `static/` → `public/`):

```bash
npm run static:build
```

7. Start development server:

```bash
npm run dev
```

- **Website:** http://localhost:3000 (vanilla HTML/CSS/JS from `static/`, APIs on Next.js)
- **Admin:** http://localhost:3000/admin/login

## Static marketing site

Public pages are **vanilla HTML, CSS, and JavaScript** in [`static/`](static/). Edit files there, then run:

```bash
npm run static:css    # compile Tailwind → static/css/main.css
npm run static:build  # CSS + copy to public/
```

| Path | File |
|------|------|
| Home | `static/index.html` |
| About | `static/about.html` |
| Services | `static/services.html` |
| Contact | `static/contact.html` |
| Blog | `static/blog/index.html`, `static/blog/post.html` |

**Public APIs** (used by static JS): `/api/public/contact`, `/api/public/settings`, `/api/public/services`, `/api/public/pages/[slug]`, `/api/public/blog`, `/api/public/blog/[slug]`, `/api/public/faqs`, `/api/public/stats`, `/api/analytics/collect`.

CMS-managed page content can override fallbacks via `data-cms-slug` on `#page-content` and `static/js/cms-render.js`.

**404 on `/`?** Run `npm run static:build`, restart `npm run dev`, then open http://localhost:3000 (the App Router needs rewrites in `next.config.ts` to serve `public/index.html` at `/`).

### Intasia Branding design system

The public marketing site uses a unified **Intasia** visual language (lime/black neo-brutalist, marquees, stagger animations):

| Asset | Path |
|-------|------|
| Tokens & themes | `static/css/intasia-tokens.css` |
| Components (header, buttons, cards) | `static/css/intasia-components.css` |
| Page sections | `static/css/intasia-sections.css` |
| Motion keyframes | `static/css/animations.css` |
| Layout & motion JS | `static/js/layout.js`, `static/js/motion.js` |

Class prefix: `ib-*` (e.g. `ib-btn`, `ib-card`, `ib-section--lime`). CMS block renderers in `static/js/blocks/` output the same classes so admin-published pages match the static fallbacks.

## Admin Features

| Module | Path |
|--------|------|
| Dashboard | `/admin` |
| Page Builder (CMS) | `/admin/content/pages` |
| Services | `/admin/content/services` |
| Blog | `/admin/content/blog` |
| Media Library | `/admin/media` |
| CRM / Leads | `/admin/crm/leads` |
| Analytics | `/admin/analytics` |
| SEO / AEO / GEO | `/admin/seo` |
| SMTP / Email | `/admin/email/smtp` |
| Security Logs | `/admin/security` |
| Settings | `/admin/settings` |

## Deployment (Vercel)

1. Connect repo to Vercel
2. Add all env vars from `.env.example`
3. Set build command: `npm run build`
4. Run migrations: `npx prisma migrate deploy`
5. Seed production: `npm run db:seed`
6. Add Vercel Cron for `/api/cron/publish` with `CRON_SECRET` header

## Security

- OTP login (5 min expiry, 5 max attempts)
- Rate limiting on OTP requests
- HttpOnly session cookies
- CSRF via NextAuth
- XSS sanitization (DOMPurify)
- AES-256-GCM encrypted SMTP passwords
- Audit logs and login history

## License

Private — All rights reserved.
