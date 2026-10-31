# NHFAS

**National Heavy Freight & Artisan System** — A dual-service marketplace and logistics coordination platform for Ethiopia. Connects clients with vetted artisans, skilled handymen, and heavy-haulage operators through jobs, live auctions, escrow-secured payments, real-time tracking, and multilingual messaging.

[![GitHub repo](https://img.shields.io/badge/GitHub-NHFAS/NHFAS-181718?logo=github)](https://github.com/NHFAS/NHFAS)
[![React](https://img.shields.io/badge/React-19-%2361DAFB?logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8-%23646CFF?logo=vite)](https://vitejs.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6-%233178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4-%2306B7EB?logo=tailwindcss)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-F92539?logo=supabase)](https://supabase.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Database Setup](#database-setup)
- [Scripts](#scripts)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Supabase Edge Functions](#supabase-edge-functions)
- [PWA & Offline Support](#pwa--offline-support)
- [Admin Console](#admin-console)
- [Internationalization (i18n)](#internationalization-i18n)
- [Development Notes](#development-notes)
- [License](#license)

---

## Overview

NHFAS is a full-stack marketplace platform built for the Ethiopian market. It brings together consumers and service providers across multiple sectors — from everyday home repairs and custom artisan work to heavy machinery transport and freight logistics.

The application provides:

- A **public marketplace** where clients browse services, post jobs, and discover providers on an interactive map.
- A **provider workspace** for artisans and operators to receive job offers, track earnings, manage fleets, and communicate with clients.
- An **admin console** for platform operators to manage users, organizations, jobs, payments, auctions, insurance, disputes, and trust/safety.
- **AI-powered tools** for cost estimation and an AI FAQ assistant.
- **Offline-first PWA** support so the app keeps working on unreliable networks, with background sync to reconcile later.
- **Multilingual** support for English, Amharic (አማርኛ), Afaan Oromo, and Kiswahili.

## Features

| Feature | Description |
|---|---|
| **Marketplace** | Browse services across four categories: Handyman, Skilled Artisans, Heavy Haulage, and Art Auctions. |
| **Service Auctions** | Discover and bid on unique artworks and custom furniture in live auction events. |
| **Job Board** | Post jobs with four booking modes: Instant, Fixed Rate, Quote, and Auction. Full job lifecycle from draft → posted → matching → offered → confirmed → en_route → in_progress → completed / cancelled / disputed. |
| **Provider Discovery** | Interactive Leaflet map with geolocation and a "Find Me" feature to discover nearby providers. |
| **Job Tracking** | Live GPS tracking with ETA calculation, multi-stop route support, and off-route deviation alerts (FR-21). |
| **Escrow Payments** | Funds held in escrow and released via OTP confirmation or digital signature. Mobile money support (Telebirr, M-Pesa). Includes SOS freeze for dispute protection (FR-25). |
| **Messaging** | Real-time chat with text messages, voice notes (MediaRecorder API), and text-to-speech playback (Web Speech API). Attachments stored in Supabase Storage. |
| **Cost Estimator** | AI-powered cost estimation using Gemini 2.5 Flash (via Edge Function) with Ethiopia-specific rates in ETB. Fallback calculator with default regional rates when AI is unavailable. |
| **Dynamic Pricing** | Surge pricing (FR-19) based on open demand in each service category, bounded to `[0.8, 1.5]` multiplier. |
| **Identity Verification** | Camera-based ID capture (Fayda ID) with fallback to file upload. KYC status tracking. |
| **Reviews & Ratings** | Provider rating system with average scores and review counts. |
| **Earnings Dashboard** | Providers track earnings, completed jobs, and ratings. |
| **Payments & Payouts** | Payment history and instant payout requests (FR-23). |
| **Insurance** | Insurance coverage management and claims tracking. |
| **Fleet Management** | Vehicle management with axle-load validation (FR-22), maintenance blocking, and status tracking. |
| **Emissions Tracking** | Carbon emissions reporting for logistics jobs. |
| **AI FAQ Assistant** | Chatbot answering questions about NHFAS services using Gemini 2.5 Flash, grounded in FAQ documents. |
| **Cookie Consent** | GDPR-compliant cookie consent banner. |
| **QR Code Support** | QR code generation for jobs, payments, and verification links. |

| Section | Description |
|---|---|
| **Overview** | Platform analytics and key metrics dashboard. |
| **Users** | Manage user accounts, roles, and statuses. |
| **Organizations** | Manage business organizations and memberships. |
| **Jobs** | View and manage all jobs across the lifecycle. |
| **Fleet** | Manage vehicles, classes, and axle-load compliance. |
| **Messages** | Monitor platform messaging. |
| **Payments** | Track all payment transactions. |
| **Finance** | Financial reporting and reconciliation. |
| **Auctions** | Manage auction events and bids. |
| **Insurance** | Manage insurance policies and claims. |
| **Pricing** | Configure service pricing and surge rules. |
| **Credentials** | Manage provider credentials and certifications. |
| **Disputes** | Handle customer/provider disputes. |
| **Verification Queue** | Review and approve identity/KYC submissions. |

## Tech Stack

### Frontend

| Category | Technology |
|---|---|
| **Framework** | React 19 |
| **Build Tool** | Vite 8 |
| **Language** | TypeScript 6 |
| **Styling** | Tailwind CSS 4 |
| **UI Icons** | Lucide React |
| **Maps** | Leaflet 1.9 + React Leaflet 5 (OpenStreetMap tiles) |
| **Routing** | React Router DOM 7 |
| **Class Utilities** | clsx + tailwind-merge |
| **QR Codes** | qrcode.react |
| **Auth** | Supabase Auth (email/password, password reset) |
| **State Management** | React Context (i18n) + component-level state |
| **Voice** | Web Speech API (TTS), MediaRecorder API (voice notes) |
| **Offline/PWA** | Service Worker, IndexedDB, Network Awareness API, Background Sync |

### Backend

| Category | Technology |
|---|---|
| **Backend-as-a-Service** | Supabase (PostgreSQL, Auth, Storage, Edge Functions) |
| **Database** | PostgreSQL (via Supabase) |
| **Storage** | Supabase Storage (voice notes, identity photos) |
| **Edge Functions** | Supabase Edge Functions (Deno) |
| **AI** | Google Gemini 2.5 Flash (cost estimation, FAQ assistant) |
| **Geocoding** | Nominatim (OpenStreetMap) for address lookups |

### Brand & Design

- **Color Palette**: Brand navy (`#0B2545`), green (`#00A651`), soft blue (`#F0F6FF`), orange (`#FF8A00`), purple (`#8B5CF6`)
- **Typography**: Inter (Google Fonts), custom heading styles
- **Custom UI**: Glass-morphism cards, slim scrollbars, soft shadows

## Prerequisites

- **Node.js** >= 20 (LTS recommended)
- **npm** >= 10 (bundled with Node.js)
- A **Supabase project** — create one at [supabase.com](https://supabase.com/)
- A **Google Gemini API key** (for AI features) — get one at [Google AI Studio](https://aistudio.google.com/)

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/NHFAS/NHFAS.git
cd NHFAS
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

```bash
cp .env.example .env.local
```

Edit `.env.local` and fill in your Supabase project credentials (see [Configuration](#configuration)).

### 4. (Optional) Deploy Supabase Edge Functions

```bash
# Install the Supabase CLI
npm install -g supabase

# Link to your project
supabase link --project-ref <your-project-ref>

# Deploy edge functions
supabase functions deploy faq-assistant
supabase functions deploy gemini-cost-estimator
```

### 5. Set up the database

```bash
# Open the SQL editor in your Supabase dashboard
# Run the schema file: src/schema/schema-supabase.sql
```

See [Database Setup](#database-setup) for details.

## Configuration

### Environment Variables

Create a `.env.local` file from the template:

```bash
cp .env.example .env.local
```

| Variable | Required | Description |
|---|---|---|
| `VITE_SUPABASE_URL` | Yes | Your Supabase project URL (e.g., `https://<ref>.supabase.co`) |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Yes | Your Supabase anon/public key |
| `GEMINI_API_KEY` | Yes (for Edge Functions) | Google Gemini API key for AI features |

> The `VITE_SUPABASE_*` variables are prefixed with `VITE_` so Vite exposes them to the client bundle. The public key is safe to expose — it is the anon key, **not** the service role key.

### Example `.env.local`

```env
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your_publishable_key
```

### Edge Function Secrets

The `GEMINI_API_KEY` must be set as a **secret** on your Supabase project, not in `.env.local`:

```bash
supabase secrets set GEMINI_API_KEY=your_gemini_api_key
```

### Vite Configuration

The project uses Vite with the following conventions:

- **Alias**: `@` maps to `src/` (configured in `vite.config.js`)
- **React plugin**: `@vitejs/plugin-react-swc` (uses SWC for fast compilation)
- **Environment**: Vite replaces `import.meta.env.VITE_*` at build time

### Tailwind Configuration

Custom Tailwind theme is defined in `tailwind.config.js` and `src/index.css`:

- **Brand colors**: `brand-navy`, `brand-green`, `brand-softBlue`, `brand-orange`, `brand-purple`
- **Font family**: Inter (loaded from Google Fonts in `index.html`)
- **Custom shadows**: `soft`, `hover`
- **Custom utility**: `.glass-card` for glass-morphism effects

The database schema is in `src/schema/schema-supabase.sql`. It defines:

### Custom Types (Enums)

| Type | Values |
|---|---|
| `user_role` | `client`, `service_provider`, `heavy_operator`, `fleet_manager`, `admin` |
| `account_status` | `pending`, `active`, `suspended`, `closed` |
| `job_type` | `artisan_service`, `haulage`, `custom_build` |
| `job_status` | `draft`, `posted`, `matching`, `offered`, `confirmed`, `en_route`, `in_progress`, `completed`, `cancelled`, `disputed` |
| `booking_mode` | `instant`, `fixed_rate`, `quote`, `auction` |
| `vehicle_status` | `active`, `inactive`, `maintenance`, `retired` |
| `offer_status` | `offered`, `accepted`, `declined`, `expired` |

### Key Tables

| Table | Description |
|---|---|
| `profiles` | User profiles linked to `auth.users` (name, email, phone, role, status, preferences) |
| `organizations` | Business organizations (logistics companies, artisan guilds) |
| `organization_members` | Many-to-many membership between users and organizations |
| `service_categories` | Service categories (artisan, haulage, custom_build, art) |
| `provider_profiles` | Provider info (bio, experience, KYC status, ratings, live location) |
| `vehicle_classes` | Vehicle type definitions (payload, GVW, axles) |
| `vehicles` | Registered vehicles linked to owners/organizations |
| `jobs` | Job postings with status, pricing, scheduling, and addresses |
| `job_stops` | Multi-stop route points for haulage jobs |
| `dispatch_offers` | Provider/operator offers for jobs with match scores |
| `job_status_history` | Audit trail of job status changes |
| `escrow_accounts` | Escrow balances linked to jobs |
| `job_tracking_points` | GPS tracking data for active jobs |
| `messages` | Chat messages between clients and providers |
| `payments` | Payment transactions and payouts |
| `auctions` | Auction events for art and custom furniture |
| `bids` | Bids placed on auction items |
| `reviews` | Provider reviews and ratings |
| `insurance_policies` | Insurance coverage records |
| `certificates` | Provider certifications and training records |
| `emissions_reports` | Carbon emissions tracking for logistics jobs |
| `fleet_maintenance` | Vehicle maintenance logs |

### Setup Instructions

1. Create a new project in the [Supabase Dashboard](https://app.supabase.com/).
2. Navigate to **SQL Editor**.
3. Create a new query and paste the contents of `src/schema/schema-supabase.sql`.
4. Run the query to create tables, types, and indexes.
5. Configure **Row Level Security (RLS)** policies via the Supabase Dashboard → Authentication → Policies. (RLS scripts may exist in `src/schema/` — apply them after the base schema.)
6. Set up **Storage buckets** — the app references `message_attachments` (for voice notes) and `identity_documents` (for verification photos).
7. Link your project locally: `supabase link --project-ref <your-project-ref>`

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the Vite development server at `http://localhost:5173` |
| `npm run build` | Build the production bundle to `dist/` |
| `npm run preview` | Preview the production build locally |

## Usage

### Development

Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`. Hot module replacement (HMR) is enabled via Vite.

### Building for Production

```bash
npm run build
```

The production build is output to `dist/`. To preview it locally:

```bash
npm run preview
```

### Production Deployment

NHFAS is designed for deployment on any static hosting provider that supports SPA routing. Recommended options:

| Provider | Notes |
|---|---|
| **Vercel** | Zero-config; auto-detects Vite. Set env vars in project settings. |
| **Netlify** | Drag-and-drop or Git deploy. Set env vars in site settings. |
| **GitHub Pages** | Use `npm run build` then deploy `dist/`. Configure for SPA fallback. |
| **Cloudflare Pages** | Supports Vite out of the box. |

For all platforms, configure a **SPA redirect** (rewrites all routes to `index.html`) so that React Router works correctly on refresh.

### Environment Variables in Production

Set the following environment variables on your hosting platform:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`

> Never commit `.env.local` to version control — it's already in `.gitignore`.

## Project Structure

```
NHFAS/
├── public/                          # Static assets served at root
│   ├── favicon.svg
│   ├── icons.svg
│   ├── manifest.webmanifest         # PWA manifest
│   ├── sw.js                        # Service worker (offline/PWA)
│   ├── worker.jpg
│   └── brand/ & illustrations/      # Logo, SVG illustrations
├── src/
│   ├── admin/                       # Admin console
│   │   ├── AdminLayout.jsx          # Admin layout with sidebar navigation
│   │   ├── AdminLogin.jsx           # Admin authentication
│   │   └── sections/                # Admin section components (12+ tabs)
│   ├── components/                  # Reusable UI components
│   │   ├── Button.jsx
│   │   ├── CookieConsentBanner.jsx
│   │   ├── IdentityCameraCapture.jsx
│   │   ├── ProviderMap.jsx
│   │   ├── dashboard/               # Dashboard widgets (Sidebar, StatCard, Topbar)
│   │   ├── job/                     # Job sub-components (Chat, Escrow, Milestones, Tracking)
│   │   ├── offline/                 # Offline sync status indicator
│   │   └── voice/                   # Voice messaging (recorder, TTS)
│   ├── data/                        # Static data (FAQ, services)
│   ├── i18n/                        # Internationalization
│   │   ├── I18nContext.jsx          # i18n provider & hooks
│   │   └── translations.js          # EN/AM/OR/SW translation dictionaries
│   ├── layout/                      # Layouts (Public, Dashboard, Navbar, Footer)
│   ├── lib/                         # Core libraries
│   │   ├── supabase.js              # Supabase client init
│   │   ├── utils.js                 # clsx + tailwind-merge helper
│   │   ├── fairPrice.js             # Dynamic/surge pricing
│   │   ├── jobStatus.jsx            # Job status helpers
│   │   ├── offlineDB.js             # IndexedDB layer
│   │   ├── syncEngine.js            # Online/offline sync engine
│   │   └── submitIdentityVerification.js
│   ├── pages/                       # 30+ page components
│   │   ├── Home.jsx
│   │   ├── Login.jsx / SignUp.jsx
│   │   ├── Dashboard.jsx
│   │   ├── PostJob.jsx / JobDetail.jsx
│   │   ├── Marketplace.jsx
│   │   ├── AuctionPage.jsx
│   │   ├── Messages.jsx
│   │   ├── Payments.jsx / PayoutPage.jsx
│   │   ├── CostEstimator.jsx
│   │   ├── FindMe.jsx
│   │   ├── Verification.jsx
│   │   ├── InsurancePage.jsx
│   │   ├── FleetPage.jsx
│   │   ├── EmissionsPage.jsx
│   │   ├── Earnings.jsx
│   │   ├── Reviews.jsx
│   │   ├── Settings.jsx
│   │   └── ... (see source for full list)
│   ├── sections/                    # Page sections (Hero, Services, HowItWorks, FinalCTA)
│   ├── schema/                      # Database schema (SQL)
│   ├── App.jsx                      # Main application with routing
│   ├── index.css                    # Tailwind + custom CSS
│   └── main.jsx                     # Application entry point
├── supabase/
│   ├── functions/                   # Supabase Edge Functions (Deno)
│   │   ├── faq-assistant/index.ts   # AI FAQ chatbot (Gemini 2.5 Flash)
│   │   └── gemini-cost-estimator/index.ts  # AI cost estimation
│   └── tsconfig.json                # Edge Functions TypeScript config
├── .env.example                     # Environment variable template
├── vite.config.js                   # Vite configuration (alias: @ → src)
├── tailwind.config.js               # Tailwind CSS configuration
├── postcss.config.js                # PostCSS configuration
├── tsconfig.json                    # TypeScript configuration
├── index.html                       # HTML entry point
└── package.json

### Routing Map

The application uses React Router DOM with three zones:

```
/                              → Public site (Home, About, Contact, FAQ, Services)
/login                         → Login page
/signup                        → Sign up page
/dashboard/*                   → Authenticated user workspace (DashboardLayout)
  ├── /dashboard                 → Dashboard overview
  ├── /dashboard/bookings          → My bookings
  ├── /dashboard/post-job          → Post a new job
  ├── /dashboard/jobs/:jobId       → Job detail (tracking, chat, escrow, milestones)
  ├── /dashboard/messages          → Messaging
  ├── /dashboard/marketplace       → Browse services
  ├── /dashboard/auctions          → Auction landing page
  ├── /dashboard/auction/:auctionId → Auction detail
  ├── /dashboard/cost-estimator    → AI cost estimator
  ├── /dashboard/find-me           → Find nearby providers (map)
  ├── /dashboard/verification      → Identity verification
  ├── /dashboard/insurance         → Insurance management
  ├── /dashboard/fleet             → My fleet
  ├── /dashboard/emissions         → Emissions tracking
  ├── /dashboard/earnings          → Earnings dashboard
  ├── /dashboard/reviews           → My reviews
  ├── /dashboard/payments          → Payments
  ├── /dashboard/payouts           → Payout requests
  ├── /dashboard/profile           → Profile settings
  └── /dashboard/settings          → App settings
/admin12login                     → Admin login (hidden path)
/admin12login/panel/*             → Admin console (AdminLayout with sidebar)
  ├── /admin12login/panel            → Overview dashboard
  ├── /admin12login/panel/users       → User management
  ├── /admin12login/panel/organizations
  ├── /admin12login/panel/jobs
  ├── /admin12login/panel/fleet
  ├── /admin12login/panel/messages
  ├── /admin12login/panel/payments
  ├── /admin12login/panel/finance
  ├── /admin12login/panel/auctions
  ├── /admin12login/panel/insurance
  ├── /admin12login/panel/pricing
  ├── /admin12login/panel/credentials
  ├── /admin12login/panel/disputes
  └── /admin12login/panel/verifications → KYC verification queue
```

## Supabase Edge Functions

The project includes two Supabase Edge Functions (Deno) that provide AI-powered features:

### `faq-assistant`

- **Purpose**: Answers user questions about NHFAS services using FAQ documents as ground truth.
- **AI Model**: Google Gemini 2.5 Flash (`gemini-2.5-flash`)
- **Input**: `POST /functions/v1/faq-assistant` with `{ "question": "...", "context": [...] }`
- **Security**: Validates input length (question ≤ 500 chars, context ≤ 8 items, field length limits). System instructions prevent prompt injection and hallucination.
- **Secrets Required**: `GEMINI_API_KEY`

### `gemini-cost-estimator`

- **Purpose**: Generates detailed cost estimates for Ethiopian jobs (materials, labor, transport) in ETB, using real-time Google Search data when available.
- **AI Model**: Google Gemini 2.5 Flash with `google_search` tool
- **Input**: `POST /functions/v1/gemini-cost-estimator` with job details (trade, materials, labor hours, transport mode, distance, region, contingency).
- **Fallback**: When AI is unavailable, uses hardcoded default rates for Ethiopian trades and transport modes (ETB).
- **Secrets Required**: `GEMINI_API_KEY`

### Deploying Edge Functions

```bash
# Install Supabase CLI (if not already installed)
npm install -g supabase

# Link to your Supabase project
supabase link --project-ref <your-project-ref>

# Set the Gemini API key as a secret
supabase secrets set GEMINI_API_KEY=<your-gemini-api-key>

# Deploy both functions
supabase functions deploy faq-assistant
supabase functions deploy gemini-cost-estimator
```

## PWA & Offline Support

NHFAS is built as a **Progressive Web App** with offline-first capabilities:

### Service Worker (`public/sw.js`)

| Asset Type | Strategy |
|---|---|
| App shell (HTML, manifest, favicon) | **Cache-first** — serves instantly from cache |
| Same-origin API reads (`/rest/`, `/functions/`) | **Network-first** with offline cache fallback |
| Static assets (JS, CSS, images) | **Cache-first** — safe because Vite hashes filenames |
| Cross-origin (Supabase, fonts) | **Network-only** — never cached |

### Background Sync

When the browser regains connectivity, the service worker triggers a `sync` event (`nhfas-offline-sync`) that replays pending writes from IndexedDB.

### Offline Data Layer (`src/lib/offlineDB.js`)

- **IndexedDB** database (`nhfas-offline`) stores pending writes (job posts, bids, messages, proof-of-work).
- Each write is tracked with an attempt counter and sync status.

### Sync Engine (`src/lib/syncEngine.js`)

- Detects online/offline state changes via the `online`/`offline` events.
- On reconnect, replays pending writes with conflict detection (`If-Match` etags).
- Exponential backoff between retries (max 5 retries, 1s base).
- User-visible sync status indicator in the bottom-right corner.

### Offline UX

- A floating **Sync Status** indicator shows online/offline state and pending write count.
- Users can manually trigger a sync retry.
- Non-GET requests fail fast when offline (no hanging).

> The service worker is registered in production only. In development, existing registrations are cleaned up automatically.

## Admin Console

NHFAS includes a dedicated admin console for platform operators.

### Access

The admin console is intentionally **not linked from the public UI** and is accessed via a non-guessable path:

```
/admin12login
```

The admin panel itself is at:

```
/admin12login/panel
```

### Authentication

- Admin login uses Supabase Auth with role-based access control.
- The `AdminLayout` component checks the session and the user's profile role. Only users with the `admin` role can access admin sections.
- Legacy admin URLs (`/dashboard/admin`, `/dashboard/admin/verifications`) redirect to the dedicated admin login.

### Sections

The admin console includes sections organized into four groups:

| Group | Sections |
|---|---|
| **General** | Overview, Users, Organizations |
| **Operations** | Jobs, Fleet, Messages, Verification Queue |
| **Finance** | Payments, Finance, Auctions, Insurance, Pricing |
| **Trust & Safety** | Disputes, Credentials |

Each section receives `user` and `profile` data via the React Router outlet context and uses Supabase RPCs and queries for data management.

## Internationalization (i18n)

NHFAS supports four languages out of the box:

| Code | Language | HTML `lang` |
|---|---|---|
| `en` | English | `en` |
| `am` | Amharic (አማርኛ) | `am` |
| `or` | Afaan Oromo | `om` |
| `sw` | Kiswahili | `sw` |

### How It Works

- A lightweight custom i18n context (`src/i18n/I18nContext.jsx`) manages language state.
- The selected language persists in `localStorage` (`nhfas_lang`).
- Language detection: saved preference → browser language → English fallback.
- The `document.documentElement.lang` attribute is set so screen readers announce content in the correct language.
- The `t(key)` function looks up: active language → English fallback → the key itself (never blanks the UI).
- The `useTranslation()` hook provides `{ t, lang, setLang, languages }`.

### Usage in Components

```jsx
import { useTranslation } from '../i18n/I18nContext';

const { t, lang, setLang, languages } = useTranslation();
// t('nav.dashboard') → 'Dashboard' / 'ዳሽቦርድ' / 'Gabatee Hojii' / 'Dashibodi'
```

### Adding a New Language

1. Add a new language object to `translations` in `src/i18n/translations.js`.
2. Add the language to the `LANGUAGES` array in `src/i18n/I18nContext.jsx`.
3. Include the HTML `lang` attribute value (e.g., `'om'` for Afaan Oromo).

## Development Notes

### Code Conventions

- **Components**: JSX with `.jsx` extension; TypeScript is available but most components use `.jsx`.
- **Aliases**: Use `@/` for imports from `src/` (e.g., `import { cn } from '@/lib/utils'`).
- **Styling**: Tailwind CSS utility classes plus the custom `cn()` helper (`clsx` + `tailwind-merge`) for conditional classes.
- **Supabase**: The client is initialized once in `src/lib/supabase.js` and imported wherever needed.
- **Error handling**: User-facing errors use `role="alert"`; status messages use `role="status"` for accessibility.
- **Loading states**: Skeleton loaders during initial app load; inline spinners for async actions.

### Ethiopia-Specific Design

The platform is tailored for the Ethiopian market:

- **Currency**: ETB (Ethiopian Birr) throughout.
- **Payments**: Telebirr and M-Pesa mobile money integration.
- **Regions**: Addis Ababa, Oromia, Amhara, Tigray, SNNP, Sidama, and "Other".
- **Maps**: Default fallback location is Addis Ababa (`[9.0227, 38.7468]`).
- **Languages**: English, Amharic, Afaan Oromo, and Kiswahili.
- **Identity**: Fayda ID (Ethiopian digital ID) support.

### Feature References (SRS)

The codebase references **Software Requirements Specification (SRS)** feature IDs (e.g., `FR-16`, `FR-19`, `FR-24`). These map to functional requirements documented in the project's SRS (`srs/NHFAS_SRS_v1.0.md`).

### Build Output

- Production build: `dist/`
- Dev logs: `build*.log` files (gitignored)
- The `.gitignore` excludes `dist/`, `node_modules/`, `.env*`, `*.log`, `srs/`, and local schema scratch files.

### Useful Commands

```bash
# Development
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Type check
npx tsc --noEmit

# Deploy edge functions
supabase functions deploy

# View function logs
supabase functions logs faq-assistant
```

## License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## Quick Start

```bash
git clone https://github.com/NHFAS/NHFAS.git
cd NHFAS
npm install
cp .env.example .env.local
# Edit .env.local with your Supabase credentials
# Run src/schema/schema-supabase.sql in your Supabase SQL Editor
npm run dev
```

The application will be available at `http://localhost:5173`.