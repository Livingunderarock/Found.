# FOUND. — Discover Yourself. Find Your Possibilities.

> **A World-Class, Location-Aware Student Talent Discovery & Opportunity Aggregation Platform**  
> Designed for school students (Classes 6–12) across Karnataka and India.  
> *Developed for Jain University Sem 3 Design Thinking Final Project.*

---

## 1. Product Vision & Philosophy

> *"Every student has potential. FOUND. helps them discover it."*

Millions of students across India—particularly in government and regional schools—possess untapped potential in mathematics, science experiments, sports, classical arts, or leadership. However, they lack access to information about competitions, Olympiads, state trials, and scholarships available in their city and state.

**FOUND.** bridges this gap by:
1. **Discovering Talents:** A 7-stage interactive talent questionnaire measuring curiosity across 7 key dimensions without rigid labeling.
2. **Location-Aware Proximity:** Distinguishing between Local Area (5–10km radius), City-level, District, State (Karnataka), and National/Online competitions.
3. **Real Internet-Powered Ingestion:** Zero fabricated listings. Every opportunity features authentic `.gov.in` and `.org` URLs, verification badges, and last-checked timestamps.
4. **Bilingual Accessibility:** Native support for English and Kannada (ಕನ್ನಡ).

---

## 2. Brand Identity & Design System

**Direction:** *Retro Academia × Contemporary Minimalism* (Editorial magazine meets vintage academic journal).

### Color Palette
- **Deep Forest Green (`#294637`)**: Primary anchor, editorial depth.
- **Warm Ivory (`#F4F0E6`)**: Canvas background, easy on young eyes.
- **Vintage Paper (`#E9E2D3`)**: Card backgrounds and archival dividers.
- **Burnt Orange (`#C16E45`)**: Accent buttons, urgency indicators, and score highlights.
- **Muted Sage (`#A5AD95`)**: Secondary badges and environmental accents.
- **Charcoal (`#30342D`)**: High-contrast, accessible body typography.

### Typography
- **Headlines:** Playfair Display / Cormorant Garamond (Editorial serif).
- **Body & Controls:** DM Sans / Inter (Clean contemporary sans).
- **Metadata & Badges:** JetBrains Mono / Letter-spaced archival uppercase.

---

## 3. Key Modules & Features

| Module | Route | Key Capabilities |
| :--- | :--- | :--- |
| **Landing Masthead** | `/` | Editorial manifesto, live opportunity ticker, comparative persona stories (Aarav vs Priya). |
| **Talent Discovery Quiz** | `/onboarding` | 7 interactive stages, progress tracker, save & resume, Kannada toggle, celebration confetti. |
| **Student Dashboard** | `/dashboard` | Personal welcome, interactive SVG Talent Radar, local proximity picks, closing deadlines tracker. |
| **Opportunity Discovery** | `/opportunities` | Multi-facet search, scope filter (Local/City/State/National), 5km–100km radius slider, GPS detection. |
| **Student Portfolio** | `/profile` | Archival talent certificate, milestone badges (Young Innovator, Rising Athlete), goal tracker. |
| **Educator Hub** | `/teacher` | Class-level talent distribution analytics, student deep dives, 1-click opportunity recommender. |
| **Admin Console** | `/admin` | Live crawler ingestion trigger, verification status manager, audit log, API health monitor. |

---

## 4. Real Opportunity Database

FOUND. is seeded with genuine, verified Indian student opportunities:
- **INSPIRE Awards – MANAK:** Department of Science & Technology (DST) prototype grant (`inspireawards-dst.gov.in`).
- **SOF International Mathematics Olympiad (IMO):** Science Olympiad Foundation (`sofworld.org`).
- **Karnataka State Scholarship Portal (SSP):** Pre-Matric unified grant (`ssp.karnataka.gov.in`).
- **Khelo India Youth Games & Talent Scouting:** Sports Authority of India (`kheloindia.gov.in`).
- **KSCA Under-14 / Under-16 Selection Trials:** Karnataka State Cricket Association (`ksca.cricket`).
- **VITM Science Fair & Innovation Hub:** Visvesvaraya Museum, Kasturba Road, Bengaluru (`vismuseum.gov.in`).
- **Jawaharlal Nehru Planetarium REAP Astronomy:** High Grounds, Bengaluru (`taralaya.org`).
- **Tata Building India Essay Competition:** National bilingual contest (`tatabuildingindia.com`).
- **Bal Bhavan Society Kalashree Awards:** Cubbon Park, Bengaluru (`karnataka.gov.in`).
- **World Robot Olympiad (WRO India):** Junior STEM challenge (`wroindia.org`).

---

## 5. Technology Architecture

```
Frontend: Next.js 14 (App Router) + React 18 + TypeScript + Tailwind CSS
Icons & Motion: Lucide React + Framer Motion + Canvas Confetti
Database: Dual Architecture — Zero-config Local Persistent Cache + Supabase PostgreSQL
Ingestion: Next.js Server API Routes + Gemini 1.5/2.0 API Live Discovery
Localization: Bilingual i18n Architecture (English & Kannada)
```

---

## 6. Getting Started Locally

### Prerequisites
- Node.js `v18+` or `v20+` (tested on Node v22)
- npm `v9+` or `v10+`

### Installation
```bash
# Clone or navigate to the project directory
cd "c:\Users\manas\Documents\Jain Uni\Sem 3\Design Thinking\Final Project"

# Install dependencies (already installed)
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 7. Environment Variables Configuration

Copy `.env.example` to `.env.local` to enable optional external services:

```env
# Optional: Set Gemini API key to enable live generative internet web crawler
GEMINI_API_KEY=your_gemini_api_key_here

# Optional: Supabase configuration (System operates in zero-config offline-first mode if omitted)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

> **Note:** The application is architected to run **100% functional out of the box** without requiring any API keys. If `GEMINI_API_KEY` is omitted, the ingestion service refreshes against the authentic Indian registry and displays clear configuration guidance.

---

## 8. Database Setup (Supabase)

If deploying to Supabase:
1. Create a new Supabase project at [supabase.com](https://supabase.com).
2. Go to the **SQL Editor**.
3. Run the migration script located at [`supabase/migrations/20261122_initial_schema.sql`](./supabase/migrations/20261122_initial_schema.sql).
4. Add your `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` to `.env.local`.

---

## 9. Demo Persona Evaluation Guide

Click the **Persona Switcher** in the top navigation bar to test how the platform adapts dynamically:
- **Student A: Aarav Sharma (Bengaluru - Jayanagar)**  
  *Class 9 • High Academics & STEM*  
  Recommendations emphasize Mathematics Olympiads, INSPIRE Awards, and VITM robotics labs.
- **Student B: Priya Nayak (Mysuru - Vijayanagar)**  
  *Class 8 • High Sports & Athletics*  
  Recommendations emphasize KSCA Under-14 trials at Manasagangothri, Khelo India, and sports scholarships.
- **Student C: Ananya Rao (Mangaluru - Hampankatta)**  
  *Class 10 • Arts, Music & Creative Writing*  
  Recommendations emphasize Bal Bhavan Kalashree art contests and coastal vocal music festivals.
- **Educator Persona (Mr. K. V. Ramesh)**  
  Access class talent distribution radar and recommend opportunities directly to students.
- **Admin Persona**  
  Trigger live ingestion runs, verify original source links, and audit catalog health.
