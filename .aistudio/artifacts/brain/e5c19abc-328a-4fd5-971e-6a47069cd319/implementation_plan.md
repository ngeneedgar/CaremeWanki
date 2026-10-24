# Careme Wanki — Quiet-Luxury Real Estate Brand & Platform (Revised)

A high-editorial, production-grade personal brand real estate platform for Careme Wanki (The ONE Street Company · Samson Properties) serving Washington D.C., Maryland, and Northern Virginia. Built on Next.js 15 (App Router), Tailwind CSS v4, Lucide React (1.5px line icons), and subtle CSS/Tailwind transitions, strictly adhering to quiet-luxury aesthetic principles, ethical compliance, and real data integrity.

---

## User Review & Critical Revisions

> [!IMPORTANT]
> The following revisions have been incorporated directly based on architectural review:
> 1. **No Fake / Simulated Appointments**: Replaced simulated calendar bookings with an honest, transparent consultation request flow ("Request a consultation time — Careme will confirm by email within 24 hours") plus prominent direct one-tap calling (`tel:5715367054`) and direct email (`mailto:Careme@onestreet.one`). The calendar embed wrapper is also configured to accept Careme's official Google Calendar Appointment Schedule URL when available.
> 2. **Compliance & Testimonials**: Per NAR and state licensing rules, absolutely **zero fabricated testimonials** will be written. The testimonial area will feature an elegant, quiet placeholder ("Client stories coming soon") alongside a verified link to Careme's Zillow review profile.
> 3. **Listing Provenance**: Showcase properties are clearly and transparently marked as *"Curated Portfolio Showcase — Sample Properties"* alongside direct link-outs to active regional MLS searches on Zillow and Bright MLS.
> 4. **Local Asset Hosting**: Headshot and brand logos will be downloaded and saved directly into `/public/images/` inside the codebase, removing all dependency on external image hosting services.
> 5. **SEO & Structured Data**: Full Next.js metadata implementation with OpenGraph, Twitter card, canonical tags, `sitemap.ts`, `robots.ts`, and `RealEstateAgent` Schema.org JSON-LD structured data.
> 6. **Contact Form Backend**: Dedicated Next.js API Route (`/api/contact`) validating input, processing inquiries, and returning server confirmation.

---

## 1. Overview & Core Concept

- **What It Does**: Establishes a confident, warm, and precise digital headquarters for Careme Wanki, highlighting her master's degree, project management acumen, bilingual (English/French) expertise, and multi-jurisdictional DMV reach (DC, MD, VA pending).
- **Target Audience**: Discerning homebuyers, luxury sellers, property investors, and international/domestic relocators seeking strategic, high-touch advisory services in the Greater Washington area.
- **Key Value**: A distinctive digital presence that feels like a private advisory firm rather than a standard real estate sales page, backed by a live client-side mortgage calculator and reliable lead-capture channels.

---

## 2. Visual Design & Theme System

- **Color Distribution (60-30-10 Rule)**:
  - **Dominant Canvas (60%)**: Charcoal Gray (`#1C1C1E`) for primary dark surfaces, with Warm Off-White (`#F7F5F0`) for alternating narrative editorial panels.
  - **Structural Surfaces (30%)**: Hairline borders (`#2E2E30`), soft tone dividers, and Stone Gray (`#8A8A8E`) for captions, metadata, and license text.
  - **Signature Accent (10%)**: Butter Yellow (`#F3DFA2`) and Deep Butter (`#E4C878`) reserved strictly for profile rings, primary buttons, numbered markers (`01`–`04`), and active link underlines.
- **Typography & Scale**:
  - **Display / Headlines**: High-end editorial serif (`Fraunces` / `Playfair Display` serif stack), sentence case with generous letter spacing (never all-caps).
  - **Body Text**: Clean neo-grotesque sans-serif (`Inter` / system-ui) at 15–16px, 1.6 line height.
  - **Data & Numbers**: Small caps / tabular numerals (`tabular-nums`) with butter yellow accents for financial numbers and stats.
- **Top Bar Contract**:
  - **Brand Zone**: Dual lockup ("THE ONE STREET COMPANY" with "Brokered by Samson Properties" below).
  - **Nav Links**: 5 clean, single-line links (`About`, `Services`, `Areas`, `Resources`, `Listings`, `Contact`).
  - **Action**: Single Butter Yellow CTA button ("Schedule a Consultation").
  - **Mobile Menu**: Accessible slide-out drawer with high-contrast touch targets ($\ge 44\text{px}$).

---

## 3. Pages & Functional Architecture

```
┌────────────────────────────────────────────────────────────────────────┐
│                          Next.js App Router                            │
├────────────────────────────────────────────────────────────────────────┤
│  Root Layout (/app/layout.tsx)                                         │
│  ├── Navbar (Header Lockup, Clean Links, Mobile Drawer, CTA)           │
│  ├── SEO & Schema.org JSON-LD (RealEstateAgent Structured Data)        │
│  └── Footer (Dual Logos, Legal Licensure, Equal Housing, Socials)      │
├────────────────────────────────────────────────────────────────────────┤
│  Routes:                                                               │
│  ├── / (app/page.tsx)                                                  │
│  │   ├── HeroSection (Headshot in Butter Ring, Copy, Stats Bar)        │
│  │   ├── AboutSection (Bio narrative, 01-04 Pillars)                   │
│  │   ├── ServicesGrid (01 Buyers, 02 Sellers, 03 Investors, 04 Reloc) │
│  │   ├── ServiceAreas (DC, MD, VA jurisdictions)                       │
│  │   ├── ResourcesNetwork (01-06 Specialist Grid)                      │
│  │   ├── FeaturedListingsPreview (Curated sample showcase + Zillow)   │
│  │   ├── TestimonialsSection (Compliance-ready coming-soon state)      │
│  │   └── ContactBanner (Direct outreach & booking trigger)             │
│  │                                                                     │
│  ├── /listings (app/listings/page.tsx)                                 │
│  │   ├── ListingsShowcase (Curated cards with sample disclaimer & modal)│
│  │   ├── MortgageCalculator (Exact mathematical client-side engine)   │
│  │   └── ZillowSearchStrip (Direct link to Careme's active search)     │
│  │                                                                     │
│  ├── /contact (app/contact/page.tsx)                                   │
│  │   ├── ContactInfo (Phone: 571.536.7054, Email, Bethesda Office)     │
│  │   ├── InquiryForm (Validated lead form with /api/contact backend)   │
│  │   └── ConsultationScheduler (Honest consultation request or iFrame) │
│  │                                                                     │
│  ├── /links (app/links/page.tsx)                                       │
│  │   └── Dedicated Mobile Bio Hub with butter-yellow framed buttons    │
│  │                                                                     │
│  └── /api/contact (app/api/contact/route.ts)                           │
│      └── Server-side validation and inquiry dispatch                   │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 4. Technical Specifications & Integrations

### A. Mortgage & Property Payment Calculator
- Implemented strictly with the JavaScript logic provided in `INTEGRATIONS.md`:
  - $P\&I = \frac{L \cdot r \cdot (1 + r)^n}{(1 + r)^n - 1}$
  - Real-time reactivity on slider adjustments (Home Price, Down Payment % and $, Term 15/20/30 yrs, Interest Rate %, Property Tax, Insurance, HOA).
  - Prominent Butter Yellow total monthly payment display, accompanied by a clean percentage breakdown bar.
  - Direct CTA to schedule a consultation for pre-approval guidance.

### B. Asset Storage & Optimization
- Local storage in `/public/images/`:
  - `profile-picture.jpg` (Careme Wanki professional headshot)
  - `onestreet-white.png` / `onestreet-black.png`
  - `samson-logo.png`
- Rendered using Next.js `<Image>` with explicit width/height, `referrerPolicy="no-referrer"`, and responsive quality.

### C. Search Engine Optimization & Structured Data
- OpenGraph & Twitter Card images, descriptions, and titles.
- Schema.org `RealEstateAgent` JSON-LD including:
  - Name: Careme Wanki
  - Brokerage: The ONE Street Company · Samson Properties
  - Address: 5021 Wilson Ln, Bethesda, MD 20814
  - Telephone: +1-571-536-7054
  - Email: Careme@onestreet.one
  - Area Served: Washington D.C., Maryland, Northern Virginia
  - License Numbers: DC SP40004843, MD 5024731, VA Pending
  - Memberships: NAR, GCAAR, Bright MLS

### D. Accessibility & Compliance
- Contrast ratios verified ($\ge 4.5:1$ on text).
- Keyboard accessible modal dialogs with focus trapping and `Escape` key listeners.
- Equal Housing Opportunity statement and logos in footer.
