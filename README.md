# Nwene Onyedika David — Portfolio + CMS (Next.js 15)

A full-stack developer & AI/ML engineer portfolio with a built-in CMS dashboard.

## Stack

- **Next.js 15** (App Router)
- **TypeScript**
-  
- **CSS Modules** (zero Tailwind dependency)

## Getting started

```bash
# 1. Install
npm install

# 2. Run dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the portfolio.  
Open [http://localhost:3000/dashboard](http://localhost:3000/dashboard) for the CMS.

## Project structure

```
app/
  page.tsx                  → Public portfolio
  layout.tsx
  globals.css
  dashboard/
    layout.tsx              → Dashboard shell (nav + sidebar)
    page.tsx                → Overview stats
    projects/page.tsx       → CRUD for projects
    skills/page.tsx         → Add/remove skills
    experience/page.tsx     → Work & education timeline
    profile/page.tsx        → Personal info + avatar colour
    sections/page.tsx       → Show/hide portfolio sections

components/
  portfolio/                → Hero, Nav, Skills, Projects, Experience, Contact, Footer
  dashboard/                → DashNav, Sidebar

lib/
  store.ts                  → Zustand store (persisted to localStorage)

types/
  index.ts                  → Shared TypeScript interfaces
```

## Adding a database (optional)

Replace Zustand persistence with a real backend:

```bash
npm install prisma @prisma/client
npx prisma init
```

Then wire the dashboard page forms to Next.js Route Handlers under `app/api/`.
