# Build Prompts — Sequential, One Phase at a Time

## \[Client Company Name\] Website — React.js + Firebase

Paste each prompt into your AI coding tool (Claude Code, Cursor, etc.) **in order**. Each one assumes the previous phase is done and references the PRD / TRD / UI Spec / Web Flow documents. Replace `[Client Company Name]` and real content (TRD §content checklist / PRD §8) before Phase 3 onward touches real copy.

---

### Phase 0 — Project Scaffolding

```
Set up a new Vite + React 18 + TypeScript project. Install and configure:
- react-router-dom v6
- tailwindcss (with darkMode: 'class')
- firebase (modular SDK v9+)
- react-helmet-async
- framer-motion

Create the folder structure:
src/components, src/features/{calculator,services,admin},
src/pages, src/hooks, src/lib, src/context, src/styles

Create src/lib/firebase.ts that initializes Firebase from environment
variables (VITE_FIREBASE_*), exporting `app`, `db` (Firestore),
`auth`, and `storage`.

Create src/styles/tokens.css with CSS custom properties for both
light and dark themes exactly as defined in the UI Spec §1
(--color-bg, --color-surface, --color-text, --color-text-muted,
--color-gold, --color-gold-soft, --color-border-hairline — both
theme variants). Wire Tailwind's config to reference these as
theme colors.

Set up React Router with placeholder routes for: /, /property-visa,
/golden-visa, /family-visa, /services, /calculator, /about, /blog,
/blog/:slug, /faq, /contact, /admin/* (lazy-loaded).
```

### Phase 1 — Design System & Shared Components

```
Using the tokens from Phase 0 and the component inventory in UI
Spec §2, build these shared components in src/components, each with
TypeScript props, light/dark support via the CSS variables, and no
hardcoded hex colors in the component files:

- Button (variants: primary, secondary, whatsapp)
- Card (variants: content, stat, testimonial)
- Accordion (controlled, ARIA-correct: aria-expanded, keyboard support)
- StatCounter (animates count-up once on scroll into view using
  IntersectionObserver; respects prefers-reduced-motion by showing
  the final value immediately)
- TimelineStep (horizontal on desktop ≥1024px, vertical below that)
- Nav (sticky; transparent over a hero section, solid --color-surface
  background after scrolling past 80px; includes ThemeToggle)
- Footer (4-column: Services, Company, Legal, Contact — include a
  placeholder disclaimer paragraph matching PRD §9 legal requirement)
- ThemeToggle (persists choice to localStorage under key "theme",
  defaults to prefers-color-scheme if unset)

Follow UI Spec §1 for spacing (4px grid), radius (6px buttons/inputs,
10px cards), and motion (150-250ms ease-out, fade + 8px translate-up,
no parallax or glow effects).
```

### Phase 2 — Firebase Backend: Schema & Security Rules

```
Using TRD §4 and §5 exactly, do the following:

1. Write firestore.rules implementing the rules outlined in TRD §5,
   including isAdmin(), isEditor(), isAdminOrEditor(), isStaff()
   helper functions that read custom claims from request.auth.token.

2. Write a Cloud Function `setUserRole` (callable, HTTPS) that:
   - Verifies the caller has an 'admin' custom claim
   - Accepts {uid, role} and sets a custom claim via
     admin.auth().setCustomUserClaims()
   - Rejects if role is not one of 'admin'|'editor'|'sales'

3. Write a Cloud Function `onLeadCreated` (Firestore onCreate trigger
   on leads/{leadId}) that sends an email notification (use a
   placeholder email-sending call I can wire to SendGrid/Nodemailer
   later) with the lead's name, phone, and serviceInterest.

4. Create src/lib/converters.ts with Firestore data converters
   (withConverter) for each collection in TRD §4: services, pages,
   blogPosts, faqs, testimonials, team, calculatorRules, leads,
   siteSettings, users — each with a matching TypeScript interface.

5. Create seed data scripts (scripts/seed.ts) that populate Firestore
   emulator with 3-4 realistic placeholder documents per collection,
   clearly marked as [PLACEHOLDER] in any text field, so the UI can
   be built and tested before real client content arrives.
```

### Phase 3 — Home Page

```
Build the Home page (src/pages/Home.tsx) following UI Spec §3 "Home"
section order exactly: Nav, Hero, Authority logo strip, Calculator
teaser, Services grid, Process timeline, Why us, Testimonials, FAQ
accordion, Blog preview, Final CTA, Footer.

- Hero: 60/40 split (text left, real image right on desktop; stacked
  on mobile), headline + two CTAs (WhatsApp deep link using
  siteSettings.whatsapp, "Free Eligibility Check" linking to
  /calculator), stat row sourced from siteSettings fields — do not
  hardcode numbers, pull from the useSiteSettings hook.
- Authority logo strip: map over a `siteSettings.authorityLogos`
  array, grayscale by default (CSS filter), full color on hover.
- Calculator teaser: 4 cards reading from calculatorRules collection
  via useCalculatorRules hook, each showing route name + starting
  fee, linking into /calculator?route={routeId}.
- Services, Testimonials, FAQ, Blog preview: each pulls from its
  respective Firestore collection via a dedicated hook
  (useServices, useTestimonials, useFaqs, useBlogPosts), loading
  state shown as skeleton cards (not a spinner), empty state
  handled gracefully.

All content must come from Firestore/hooks — no hardcoded client
copy in this component, so swapping seed data for real content
later requires zero code changes.
```

### Phase 4 — Property / Golden / Family Visa Pages

```
Build a shared template component src/features/services/VisaPageTemplate.tsx
implementing UI Spec §3's shared layout (hero, eligibility table,
embedded calculator scoped to route, document checklist, process
timeline, page FAQ, related services, footer), then three thin page
wrappers: PropertyVisa.tsx, GoldenVisa.tsx, FamilyVisa.tsx that each
pass their route identifier and Firestore pageId into the template.

The embedded calculator must reuse the Calculator component from
Phase 5 (build this page component first with a placeholder import;
wire it once Phase 5 lands), pre-filtered to this page's route so
the user doesn't need to re-select it.

Eligibility table and document checklist pull from the `services`
or `pages/{pageId}/sections` collection — structure the Firestore
documents so an admin can edit thresholds and document lists without
a code change.
```

### Phase 5 — Fee Calculator Feature

```
Build src/features/calculator/Calculator.tsx implementing the exact
decision flow in Web Flow §3:

1. Route tabs (property / company / salaried / deposit / family)
2. Route-specific input fields (property value, company share %,
   salary, deposit amount, or relationship type for family)
3. On submit, fetch calculatorRules/{route} from Firestore, run a
   pure function `computeFees(rules, inputs)` in
   src/features/calculator/computeFees.ts that returns
   {governmentFees: LineItem[], serviceFees: LineItem[], total: number}
4. "Add family member" control recalculates live without a full
   re-fetch (cache the rules doc after first load)
5. Result view: itemized table split into Government Fees vs. Our
   Service Fee (sum each, show grand total), matching UI Spec's
   card/table style — no prose paragraphs, numbers in a scannable
   table.
6. Two CTAs on the result: "Get this exact quote on WhatsApp" (opens
   wa.me link with the breakdown pre-filled as text) and "Submit as
   lead" (writes to the leads collection with calculatorSnapshot
   containing the full breakdown and selected route).

Write computeFees.ts as a pure, fully unit-testable function — include
3 unit tests (Vitest) covering property route, family route with 2
dependents, and a below-threshold case that should surface the
"closest eligible alternative" message from Web Flow §3.
```

### Phase 6 — Admin CMS: Auth & Dashboard Shell

```
Build the authenticated /admin section:

1. src/context/AuthContext.tsx: wraps Firebase Auth, exposes
   {user, role, loading}, reading the custom claim from the user's
   ID token (force-refresh token on claim changes).
2. src/components/RequireRole.tsx: route guard component accepting
   a `roles` prop array; redirects to /admin/login if unauthenticated,
   shows an "access denied" screen if authenticated but wrong role.
3. src/pages/Admin/Login.tsx: email/password sign-in form (no public
   sign-up).
4. src/pages/Admin/Dashboard.tsx: sidebar nav per UI Spec §3 "Admin
   Dashboard" (Dashboard, Leads, Services, Pages, Blog, FAQs,
   Testimonials, Team, Settings), each nav item gated by role —
   'sales' role sees only Leads.
5. Dashboard home view: stat cards showing lead counts by status
   (query leads collection grouped client-side by status field),
   a table of the 10 most recent leads, quick-link buttons to each
   content module.
```

### Phase 7 — Admin CMS: Content Modules

```
For each of these Firestore collections — services, pages/sections,
blogPosts, faqs, testimonials, team — build a CRUD module under
src/features/admin/{collectionName}/ with:

- A table view: search box, column sort, status filter where
  applicable (blogPosts: draft/published; services: status)
- A form view (create/edit) with fields matching the TypeScript
  interfaces from Phase 2's converters.ts — use react-hook-form,
  validate required fields client-side before Firestore write
- Image fields upload to Firebase Storage first, then store the
  resulting download URL in Firestore
- Optimistic UI update after save, toast confirmation, error toast
  on failure

Then build the Leads module specifically as a Kanban board (columns:
New, Contacted, Qualified, Closed) using drag-and-drop to update the
`status` field, a detail drawer per lead showing calculatorSnapshot
and a notes[] array staff can append to, and a "Export CSV" button
that downloads all currently-filtered leads.
```

### Phase 8 — SEO, Prerendering & Deployment

```
1. Add react-helmet-async to every public route with unique title,
   meta description, and Open Graph tags sourced from that page's
   Firestore document where applicable (blog posts, services).
2. Add JSON-LD structured data: LocalBusiness schema on the site
   layout (sourced from siteSettings) and FAQPage schema on any page
   rendering an FAQ accordion.
3. Implement prerendering per TRD §3 Option A for all public marketing
   routes (not /admin/*) using vite-plugin-ssg or react-snap — verify
   each prerendered route's HTML contains real text content, not an
   empty root div, by checking view-source after build.
4. Write the GitHub Actions workflow: on PR → build + deploy to a
   Firebase Hosting preview channel and comment the preview URL on
   the PR; on merge to main → production deploy including
   `firebase deploy --only firestore:rules,firestore:indexes,hosting,functions`.
5. Add a Cloud Function `generateSitemap` (scheduled daily) that
   queries published services/blogPosts/pages and writes sitemap.xml
   to Storage, served via a Hosting rewrite.
```