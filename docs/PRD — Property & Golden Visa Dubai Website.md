# Product Requirements Document

## \[Client Company Name\] — Property & Golden Visa Dubai Website

**Version:** 1.0 | **Status:** Draft for client sign-off | **Prepared by:** Zohaib-u-Ddin Soomro

---

## 1. Background & Problem Statement

The first build (propertyvisadubai.netlify.app) was rejected by the client. Root cause identified: the deployed build carried uncustomized content, stats, and branding copied from reference sites (800docs.ae / familyvisa.ae), plus stock photography — reading as an AI-generated template rather than a real, licensed consultancy. The rebuild must be built content-first: every number, name, and photo must belong to this client.

## 2. Objectives

1. Convert visitors into qualified leads (WhatsApp, calculator submission, contact form).
2. Establish verifiable trust within the first screen — licence number, authority logos, real stats.
3. Give the client a CMS so services, fees, blog, and leads can be managed without a developer.
4. Ship on React.js + Firebase, light/dark theme, Inter typeface, gold accent on neutral base.

## 3. Success Metrics

| Metric | Target |
| --- | --- |
| Calculator completion rate | >35% of sessions that open it |
| WhatsApp/contact click-through | >8% of sessions |
| Core Web Vitals (LCP/CLS/INP) | All "Good" in PageSpeed Insights |
| Client content accuracy | 100% client-supplied, zero placeholder/competitor data at launch |

## 4. Personas

- **P1 — Property Investor:** expat or foreign investor evaluating a 2-year property visa or Golden Visa via real estate (AED 750K–2M+ threshold). Wants fees itemized, timeline, and legitimacy proof before contacting anyone.
- **P2 — Relocating Family:** needs to sponsor spouse/children/parents alongside their own visa. Wants eligibility checked before paying for anything.
- **P3 — Referral Partner:** real estate agent or business consultant referring clients; needs a credible page to send prospects to.

## 5. Scope

### In scope

- Marketing site: Home, Property Visa, Golden Visa, Family Visa, Services (PRO/DLD/Attestation/Emirates ID), Cost Calculator, How It Works, About, Reviews, Blog, FAQ, Contact, Legal (Terms/Privacy/Disclaimer)
- Fee/eligibility calculator (client-side, rules loaded from Firestore)
- Lead capture → Firestore → admin inbox, with WhatsApp deep-link as parallel primary CTA
- Admin CMS: content modules for services, pages/sections, blog, FAQs, team, testimonials, site settings, leads pipeline
- Role-based admin access (Admin / Editor / Sales)
- Light + dark theme, fully responsive
- Arabic (RTL) data structure prepared, translation itself is Phase 2

### Out of scope (Phase 1)

- Online payments / invoicing
- Live chat bot (WhatsApp handoff only for v1)
- Full Arabic translation (structure only, not copy)

## 6. Functional Requirements

**Home**

- FR-1: Hero with single primary promise + two CTAs (WhatsApp, Free Eligibility Check)
- FR-2: Government authority logo strip (DLD, ICP, GDRFA, DET — pending client's actual licensing authority)
- FR-3: Calculator teaser cards (route-based, e.g. "Property owner — from AED X")
- FR-4: Services grid linking to the 3 visa pages + sub-services
- FR-5: Numbered process timeline (3–5 steps)
- FR-6: Real testimonials with name, title, company, photo
- FR-7: FAQ accordion (minimum 8 real questions)
- FR-8: Blog preview (latest 3 posts)

**Property Visa / Golden Visa / Family Visa pages**

- FR-9: Route-based eligibility breakdown (thresholds, required docs, timeline)
- FR-10: Embedded calculator scoped to that visa type
- FR-11: Dedicated FAQ block per page

**Calculator**

- FR-12: Route selector (property / company / salaried / deposit / family)
- FR-13: Itemized output: government fee vs. service fee, clearly separated
- FR-14: Add-family-member option recalculates total live
- FR-15: Submit-to-lead captures contact info tied to the calculated result

**Admin CMS**

- FR-16: Authenticated dashboard (Firebase Auth), role-gated routes
- FR-17: CRUD for services, blog posts, FAQs, team, testimonials, site settings
- FR-18: Leads inbox with status pipeline (New / Contacted / Qualified / Closed), notes, CSV export
- FR-19: Calculator fee rules editable without a redeploy

## 7. Non-Functional Requirements

- **Performance:** Lighthouse ≥90 across categories; code-split per route.
- **Accessibility:** WCAG AA contrast in both themes; visible keyboard focus states.
- **SEO:** Server-renderable or prerendered marketing routes (see TRD §3 for the CSR trade-off), schema.org LocalBusiness + FAQ markup, sitemap.xml, per-page meta via react-helmet-async.
- **Security:** Firestore rules deny-by-default; reCAPTCHA v3 on public forms; no client secrets in the bundle.
- **Legal:** Every page footer carries the "not a government authority" disclaimer and real trade licence number once supplied.

## 8. Content Requirements — Blocking Items

These must be supplied by the client before any content is finalized on the live build (this was the direct cause of the last rejection):

1. Registered company name + trade licence number + issuing authority (DET/DED/free zone)
2. Real office address, phone, WhatsApp number
3. Real property-visa and Golden Visa fee line items (even approximate figures)
4. 2–3 real testimonials or Google review screenshots
5. Real team photo(s) or a scheduled shoot date
6. Logo files and any existing brand guideline

## 9. Assumptions & Dependencies

- Frontend: React.js (Vite SPA) + Firebase (Firestore, Auth, Storage, Hosting, Functions) — per client/developer decision.
- Domain and Firebase project provisioned before Phase 1 deploy.
- Client content (§8) delivered before homepage copy is finalized — UI can be built against placeholder structure in parallel, but nothing ships live until real content lands.

## 10. Milestones

| Phase | Deliverable |
| --- | --- |
| Phase 1 | Marketing site (all pages, calculator, light/dark theme) — no CMS yet, content hardcoded from client-supplied data |
| Phase 2 | Firebase backend + Admin CMS + leads pipeline, site now content-managed |
| Phase 3 | Blog, Arabic structure, analytics/SEO hardening, referral partner program page |

## 11. Risks

- **Highest risk:** shipping another preview with placeholder/competitor content → repeat rejection. Mitigate by gating the "client review" milestone on §8 being complete.
- Scope creep from matching every reference site's feature (calculator variants differ across tasreea/best-solution/800docs) — lock to one calculator UX per FR-12–15 before building.
- Firebase free-tier limits if lead/traffic volume grows — monitor Firestore read/write quota from Phase 2 onward.