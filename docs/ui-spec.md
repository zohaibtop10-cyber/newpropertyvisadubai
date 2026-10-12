# UI/UX Specification

## \[Client Company Name\] Website — Design System & Page Layouts

**Companion to PRD v1.0 / TRD v1.0**

Design direction: restrained, specific, verifiable — the opposite of a glossy AI template. Heavy whitespace, hairline borders, neutral base with gold used only as a thin accent, real photography only.

---

## 1. Design Tokens

### Color (light theme)

| Token | Value | Use |
| --- | --- | --- |
| `--color-bg` | `#FAF7F2` | Page background |
| `--color-surface` | `#FFFFFF` | Cards |
| `--color-text` | `#15130F` | Body/headings |
| `--color-text-muted` | `#6B6558` | Secondary text |
| `--color-gold` | `#B8903E` | Accent, CTAs, active states |
| `--color-gold-soft` | `#E8D5A3` | Highlights, hover backgrounds |
| `--color-border-hairline` | `rgba(184,144,62,0.18)` | 1px dividers, card borders |

### Color (dark theme)

| Token | Value |
| --- | --- |
| `--color-bg` | `#0E0E10` |
| `--color-surface` | `#17161A` |
| `--color-text` | `#F5F1E8` |
| `--color-text-muted` | `#A39C8C` |
| `--color-gold` | `#D4AF5A` |
| `--color-gold-soft` | `#3A2F1C` |
| `--color-border-hairline` | `rgba(212,175,90,0.18)` |

### Typography

- Font: Inter, fallback `system-ui, -apple-system, "Segoe UI", sans-serif`
- Scale: 12 / 14 / 16 (body) / 20 / 28 / 36 / 48 / 64 (hero)
- Weights: 400 body, 500 labels/buttons, 600 subheads, 700 headings
- Line height: 1.5 body, 1.15 headings
- Tracking: -0.01em on headings ≥28px

### Spacing & shape

- 4px base grid: 4/8/12/16/24/32/48/64/96
- Radius: 6px (buttons, inputs), 10px (cards) — no pill shapes, no heavy rounding
- Elevation: hairline border only; one soft shadow reserved for the sticky nav and modals (`0 4px 20px rgba(0,0,0,0.06)`)

### Breakpoints

`375 / 768 / 1024 / 1440` — mobile-first, container max-width 1200px with 24px gutters (16px on mobile)

### Motion

150–250ms ease-out; fade + 8px translate-up on scroll reveal; no parallax, no glow/particle effects, no auto-playing carousels. Respect `prefers-reduced-motion`.

### Iconography

Outline style, 1.5px stroke, 20–24px default size, gold fill only on hover/active — never a filled icon set by default (filled icons read as "stock UI kit").

---

## 2. Component Inventory

| Component | Variants / states |
| --- | --- |
| Button | primary (gold fill), secondary (hairline outline), WhatsApp (green, fixed icon) — hover/active/disabled |
| Card | content card, stat card, testimonial card — all hairline border, no drop shadow |
| Accordion | FAQ — single-open or multi-open, chevron rotates 180° |
| StatCounter | animates once on scroll into view, respects reduced-motion (no animation, show final value) |
| Timeline step | numbered, connecting hairline, horizontal on desktop / vertical on mobile |
| CalculatorWidget | route tabs → input fields → itemized result table → dual CTA (WhatsApp / Submit lead) |
| Nav | sticky, transparent-over-hero then solid surface on scroll, theme toggle + language stub |
| Footer | 4-column (Services / Company / Legal / Contact), full disclaimer text, licence number |
| ThemeToggle | sun/moon icon switch, persists to localStorage |
| CommandPalette | Cmd/Ctrl+K opens a search overlay over site sections/services — seen on goldenvisadubai.ai, signals a real engineered product rather than a template |
| LogoMarquee | auto-scrolling authority-logo strip (seamless loop, pause on hover), replaces the static grid for ≥8 logos |
| LiveFeeExample | one worked calculation shown inline on Home ("Property investor — title-deed value from AED 2,000,000 → itemized total"), separate from the full CalculatorWidget |
| PersonaSelector | row of selectable chips ("I'm an investor" / "I'm relocating with family" / "I'm a referral partner") that scrolls to or filters the relevant service content |
| JurisdictionCompareCard | image + tagline + key/value spec rows (Ownership, Threshold, Timeline, Office) + CTA — used for comparing visa routes side by side |
| GoogleReviewCard | real name, relative timestamp ("2 months ago"), one-line service tag, explicitly labeled "unedited Google review," linking out to the real Google listing |
| OfficeHoursWidget | live open/closed status computed from current time against listed hours, shown in footer next to the address |

---

## 3. Page-by-Page Layout

### Home

1. Nav (sticky) — includes CommandPalette trigger (Cmd/Ctrl+K)
2. Hero — 60/40 split: eyebrow tag ("10-Year UAE Residency") + headline + dual CTA left, real photo right. Stat strip beneath (e.g. clients served, avg. processing time, compliance rate), not overlaid on image.
3. LiveFeeExample card — one real worked calculation sitting near the hero, e.g. "Property investor — from AED 2,000,000 → itemized total," with licence number shown directly beside it
4. LogoMarquee — auto-scrolling government authority logos (DLD, ICP, GDRFA, DET, etc.)
5. Featured services — 6-card grid, each with a one-word eyebrow tag ("Real Estate," "10-Year Term") for fast scanning
6. PersonaSelector — "Who are you?" chip row (investor / relocating family / referral partner)
7. Why this visa / why us — numbered editorial list (not cards) for the substantive benefits, matching the plain, confident tone of the strongest reference
8. Calculator teaser — full CalculatorWidget entry point, 4-card grid by route
9. Process timeline — horizontal 4-step (desktop), vertical (mobile)
10. Testimonials — GoogleReviewCard row, explicitly labeled "unedited reviews," linking to the real Google listing
11. FAQ accordion — single column, max-width 720px, centered
12. Blog preview — 3-card grid, each with category tag + exact date + read time
13. Final CTA band — centered, gold-bordered card on dark/contrast background
14. Footer — includes OfficeHoursWidget and a split contact (e.g. visa enquiries vs. general) next to the address

### Property Visa / Golden Visa / Family Visa (shared template)

1. Nav
2. Page hero — title + one-paragraph eligibility summary + CTA
3. Eligibility table — thresholds/requirements, scannable table not prose
4. Embedded calculator (pre-scoped to this route)
5. Required documents checklist — two-column (individual / corporate, where relevant)
6. Process timeline (page-specific, reuse Home's component)
7. Page-specific FAQ block
8. Related services cross-links
9. Footer

### Admin Dashboard (`/admin`)

- Left sidebar nav: Dashboard, Leads, Services, Pages, Blog, FAQs, Testimonials, Team, Settings
- Dashboard home: lead count by status (stat cards), recent leads table, quick links
- Each content module: table view (search/filter/sort) → slide-over or dedicated edit route with form fields matching the Firestore schema in TRD §4
- Leads module: Kanban-style status columns (New/Contacted/Qualified/Closed) with drag-to-update, CSV export button

---

## 4. Accessibility

- Body text contrast ≥4.5:1 in both themes (verify `--color-text-muted` against `--color-bg`)
- All interactive elements keyboard-reachable, visible focus ring in `--color-gold`
- Form inputs carry real `<label>` elements, not placeholder-only
- Accordion and tabs use correct ARIA roles (`aria-expanded`, `role="tablist"`)

---

## 5. Validated Patterns — Confirmed by the Client's Approved References

The client pointed at tasreea.ae, best-solution.ae, and goldenvisadubai.ai/en together. What all three share is the real signal — treat it as settled, not optional:

| Pattern | Seen on | Implementation note |
| --- | --- | --- |
| Exact AED figures broken into named line items (not "from AED X" alone) | goldenvisadubai.ai | `LiveFeeExample` and the full calculator must show line-item labels (e.g. "DLD and admin fees — 5,333"), not a single lump sum |
| Licence/registration number placed directly beside pricing, not buried in the footer only | goldenvisadubai.ai | Put `siteSettings.licenseNumber` next to the calculator teaser, in addition to the footer |
| Explicit "not a government authority" disclaimer + direct links to the real gov portals (icp.gov.ae, gdrfad.gov.ae) | goldenvisadubai.ai | Counterintuitive but high-trust: telling the visitor they *could* do it themselves builds more credibility than hiding it |
| Reviews explicitly labeled "unedited," with relative timestamps and a link to the real Google listing | goldenvisadubai.ai | `GoogleReviewCard` must include the "unedited" framing and the outbound link — don't paraphrase or clean up quotes |
| Blog posts dated to the current month with regulation-specific titles | tasreea.ae, goldenvisadubai.ai | Signals the site is actively maintained; stale or evergreen-only blog content reads as templated |
| Command palette / instant search in the nav | goldenvisadubai.ai | Optional but cheap to build with a small library (e.g. `kbar` or `cmdk`); strong "real product" signal for minimal effort |
| Jurisdiction/route comparison with identical spec rows across cards | best-solution.ae | Use `JurisdictionCompareCard` for Property vs. Golden vs. Family so a visitor can compare at a glance |
| Persona-based entry ("I'm an investor" / "I'm relocating" / etc.) | best-solution.ae | `PersonaSelector` — don't make visitors self-diagnose which page to read |
| Dual, purpose-split contact channels (e.g. visa enquiries vs. everything else) | goldenvisadubai.ai | Two distinct email addresses/WhatsApp lines, not one generic inbox |
| Live office-hours status | goldenvisadubai.ai | `OfficeHoursWidget` computed client-side from `siteSettings.hours` against the visitor's local time |

None of these three references lean on heavy color — tasreea uses green, best-solution uses near-monochrome with sparse color, goldenvisadubai.ai is mostly black/white/beige with gold appearing only in calculator numbers and accents. **This confirms the existing design direction (gold as accent only, not a flood) rather than changing it** — the gap between the rejected build and these references is specificity and real data, not color saturation.