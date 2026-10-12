Phase 0:
Before writing any code, read these files in /docs: prd.md, trd.md,
ui-spec.md, web-flow.md, and README.md.

Treat the following as locked decisions — do not propose alternatives
to them at any point in this build:
- Stack: React 18 + Vite (SPA) + Firebase (Firestore, Auth, Storage,
  Functions, Hosting). Do not suggest Next.js or any other framework,
  even for SEO reasons — trd.md §3 already resolves that trade-off
  via build-time prerendering.
- Color system: gold is an accent only, never a dominant fill. Use
  exactly the CSS variable values in ui-spec.md §1 for both light
  and dark themes — don't introduce new hex values anywhere.
- No stock photography and no placeholder stats may ever reach
  client-facing content — see prd.md §8. Seed/placeholder data is
  fine for development only, and must be clearly marked [PLACEHOLDER].

Now execute Phase 0 from build-prompts.md:

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
light and dark themes exactly as defined in ui-spec.md §1
(--color-bg, --color-surface, --color-text, --color-text-muted,
--color-gold, --color-gold-soft, --color-border-hairline — both
theme variants). Wire Tailwind's config to reference these as
theme colors.

Set up React Router with placeholder routes for: /, /property-visa,
/golden-visa, /family-visa, /services, /calculator, /about, /blog,
/blog/:slug, /faq, /contact, /admin/* (lazy-loaded).

When finished: show me the resulting folder tree, confirm
tokens.css contains both theme variants verbatim from ui-spec.md
§1, and confirm all five routes render without errors. Then stop
and wait for my review before starting Phase 1.


Phase 1:
Read /docs/README.md and /docs/ui-spec.md before starting. Phase 0
is complete — the project scaffold, routes, and tokens.css already
exist.

Locked for this phase: no hardcoded hex colors in any component file.
Every color reference must go through the CSS variables already
defined in tokens.css (--color-bg, --color-surface, --color-text,
--color-text-muted, --color-gold, --color-gold-soft,
--color-border-hairline).

Using the component inventory in ui-spec.md §2, build these shared
components in src/components, each with TypeScript props and full
light/dark support via the existing CSS variables:

- Button (variants: primary, secondary, whatsapp)
- Card (variants: content, stat, testimonial)
- Accordion (controlled, ARIA-correct: aria-expanded, keyboard support)
- StatCounter (animates count-up once on scroll into view using
  IntersectionObserver; respects prefers-reduced-motion by showing
  the final value immediately instead of animating)
- TimelineStep (horizontal layout on desktop ≥1024px, vertical below
  that breakpoint)
- Nav (sticky; transparent over a hero section, switches to solid
  --color-surface background after scrolling past 80px; includes
  the ThemeToggle)
- Footer (4-column: Services, Company, Legal, Contact — include a
  placeholder disclaimer paragraph matching prd.md §9's legal
  requirement, marked [PLACEHOLDER] where the licence number goes)
- ThemeToggle (persists choice to localStorage under key "theme",
  defaults to prefers-color-scheme if no stored value)

Follow ui-spec.md §1 for spacing (4px grid), radius (6px on buttons
and inputs, 10px on cards), and motion (150–250ms ease-out, fade +
8px translate-up on scroll reveal — no parallax, no glow effects).

Build a temporary /style-check route that renders every component
above in both variants/states side by side, so they can be reviewed
without needing real pages yet.

When finished: open the built-in browser, go to /style-check, toggle
the ThemeToggle and screenshot both themes, then resize to 375px,
768px, 1024px, and 1440px and screenshot each as an Artifact. Then
stop and wait for my review before starting Phase 2.

Phase 2:
Read /docs/README.md and /docs/trd.md §4–§7 before starting. Phases
0 and 1 are complete — the project scaffold, routing, and shared
components all exist.

This phase touches security rules and auth claims, so before writing
any code: present your plan for the rules structure, the two Cloud
Functions, and the converters file, and wait for my approval before
executing.

Once approved, do the following using trd.md §4 and §5 exactly:

1. Write firestore.rules implementing the rules outlined in trd.md
   §5, including isAdmin(), isEditor(), isAdminOrEditor(), isStaff()
   helper functions that read custom claims from request.auth.token.
   Default-deny anything not explicitly matched.

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
   (withConverter) for each collection in trd.md §4: services, pages,
   blogPosts, faqs, testimonials, team, calculatorRules, leads,
   siteSettings, users — each with a matching TypeScript interface.

5. Create seed data scripts (scripts/seed.ts) that populate the
   Firestore emulator with 3–4 realistic placeholder documents per
   collection, clearly marked [PLACEHOLDER] in every text field, so
   the UI can be built and tested before real client content arrives.

6. Start the Firebase emulator suite (firestore + functions + auth)
   and write a small test script that proves the rules actually
   work: an unauthenticated client CAN create a lead but CANNOT read
   the leads collection; an authenticated user with no role claim
   CANNOT write to services; a user with the 'admin' claim CAN write
   to services. Run it and show me the pass/fail output.

Do not deploy anything to production — emulator only for this phase.
When finished, show me the full firestore.rules file, both Cloud
Functions, and the emulator test results. Then stop and wait for my
review before starting Phase 3.


Phase 3:
Read /docs/ui-spec.md §3 "Home" and /docs/trd.md §4 before starting.
Phases 0–2 are complete — shared components, Firestore schema,
security rules, and seed data all exist.

Locked: all content must come from Firestore via hooks — no
hardcoded client copy in this component, so swapping seed data for
real content later requires zero code changes.

Build the Home page (src/pages/Home.tsx) following ui-spec.md §3's
section order exactly: Nav, Hero, Authority logo strip, Calculator
teaser, Services grid, Process timeline, Why us, Testimonials, FAQ
accordion, Blog preview, Final CTA, Footer.

- Hero: 60/40 split (text left, real image right on desktop; stacked
  on mobile), headline + two CTAs (WhatsApp deep link using
  siteSettings.whatsapp, "Free Eligibility Check" linking to
  /calculator), stat row sourced from siteSettings fields via the
  useSiteSettings hook — not hardcoded.
- Authority logo strip: map over siteSettings.authorityLogos,
  grayscale by default (CSS filter), full color on hover.
- Calculator teaser: 4 cards reading from calculatorRules via
  useCalculatorRules, each showing route name + starting fee,
  linking into /calculator?route={routeId}.
- Services, Testimonials, FAQ, Blog preview: each pulls from its
  Firestore collection via a dedicated hook (useServices,
  useTestimonials, useFaqs, useBlogPosts). Loading state = skeleton
  cards, not a spinner. Handle empty collections gracefully.

When finished: open the built-in browser, load Home with the
Phase 2 seed data, toggle light/dark, and screenshot at 375px and
1440px as Artifacts. Confirm no hardcoded colors or copy snuck in
by grepping the file for hex values and plain strings outside JSX
labels. Then stop and wait for my review before starting Phase 4.


Phase 4 :

Read /docs/ui-spec.md §3 (shared visa-page template) and
/docs/web-flow.md §1 before starting. Phase 3 is complete.

Build a shared template component
src/features/services/VisaPageTemplate.tsx implementing the layout
in ui-spec.md §3: hero, eligibility table, embedded calculator
scoped to route, document checklist, process timeline, page FAQ,
related services, footer. Then three thin page wrappers —
PropertyVisa.tsx, GoldenVisa.tsx, FamilyVisa.tsx — each passing
their route identifier and Firestore pageId into the template.

For the embedded calculator: import the Calculator component as a
placeholder for now (it lands in Phase 5) — wire the real import
once that phase is done, but leave a clearly marked TODO comment
and a static mock in its place so this page still renders and is
reviewable today.

Eligibility table and document checklist pull from the `services`
or `pages/{pageId}/sections` collection — structure so an admin can
edit thresholds and document lists without a code change.

When finished: open the built-in browser, visit all three visa
pages, confirm each renders its own eligibility data (not Home's),
and screenshot each. Then stop and wait for my review before
starting Phase 5.


Phase 5:


Read /docs/web-flow.md §3 and /docs/trd.md §10 before starting.
Phase 4 is complete, with a placeholder Calculator mock sitting in
each visa page.

Build src/features/calculator/Calculator.tsx implementing the exact
decision flow in web-flow.md §3:

1. Route tabs (property / company / salaried / deposit / family)
2. Route-specific input fields (property value, company share %,
   salary, deposit amount, or relationship type for family)
3. On submit, fetch calculatorRules/{route} from Firestore, run a
   pure function computeFees(rules, inputs) in
   src/features/calculator/computeFees.ts returning
   {governmentFees: LineItem[], serviceFees: LineItem[], total: number}
4. "Add family member" recalculates live without a full re-fetch
   (cache the rules doc after first load)
5. Result view: itemized table split into Government Fees vs. Our
   Service Fee, each summed, grand total shown — a scannable table,
   not prose.
6. Two CTAs on the result: "Get this exact quote on WhatsApp" (opens
   a wa.me link with the breakdown pre-filled as text) and "Submit
   as lead" (writes to leads with calculatorSnapshot containing the
   full breakdown and selected route).

Write computeFees.ts as a pure, fully unit-testable function with
3 Vitest tests: a property route, a family route with 2 dependents,
and a below-threshold case that surfaces the "closest eligible
alternative" message from web-flow.md §3.

Replace the Phase 4 placeholder mocks in all three visa pages with
the real Calculator, pre-scoped to that page's route.

When finished: run the unit tests and show the output, then open the
built-in browser, submit a full calculator flow end-to-end, and
confirm a document actually appears in the Firestore emulator's
leads collection with a populated calculatorSnapshot. Then stop and
wait for my review before starting Phase 6.


Phase 6:

Read /docs/trd.md §6 and /docs/ui-spec.md §3 "Admin Dashboard"
before starting. Phase 5 is complete.

Build the authenticated /admin section:

1. src/context/AuthContext.tsx: wraps Firebase Auth, exposes
   {user, role, loading}, reading the custom claim from the user's
   ID token (force-refresh the token on claim changes so a role
   update doesn't require a re-login).
2. src/components/RequireRole.tsx: route guard accepting a `roles`
   prop array; redirects to /admin/login if unauthenticated, shows
   an "access denied" screen if authenticated but wrong role.
3. src/pages/Admin/Login.tsx: email/password sign-in only — no
   public sign-up surface anywhere in this app.
4. src/pages/Admin/Dashboard.tsx: sidebar nav per ui-spec.md §3
   (Dashboard, Leads, Services, Pages, Blog, FAQs, Testimonials,
   Team, Settings), each item gated by role — the 'sales' role must
   see only Leads, nothing else in the sidebar.
5. Dashboard home view: stat cards showing lead counts by status
   (query leads, group client-side by status), a table of the 10
   most recent leads, quick-link buttons to each content module.

Use the setUserRole Cloud Function from Phase 2 to create one test
user per role (admin/editor/sales) in the emulator for your own
testing — do not hardcode any role-check against an email address.

When finished: log in as each of the three test roles in the built-
in browser, screenshot what each role's sidebar looks like, and
confirm the 'sales' login genuinely cannot navigate to /admin/services
by URL even if typed directly. Then stop and wait for my review
before starting Phase 7.

Phase 7:


Read /docs/trd.md §4 and /docs/web-flow.md §4–§5 before starting.
Phase 6 is complete — auth, role guard, and dashboard shell exist.

For each of these Firestore collections — services, pages/sections,
blogPosts, faqs, testimonials, team — build a CRUD module under
src/features/admin/{collectionName}/ with:

- A table view: search box, column sort, status filter where
  applicable (blogPosts: draft/published; services: status)
- A form view (create/edit) with fields matching the TypeScript
  interfaces from converters.ts — use react-hook-form, validate
  required fields client-side before the Firestore write
- Image fields upload to Firebase Storage first, then store the
  resulting download URL in Firestore — never store raw file blobs
- Optimistic UI update after save, toast confirmation on success,
  toast on failure with the actual error message

Then build the Leads module as a Kanban board (columns: New,
Contacted, Qualified, Closed) using drag-and-drop to update the
status field, a detail drawer per lead showing calculatorSnapshot
and a notes[] array staff can append to, and an "Export CSV" button
that downloads all currently-filtered leads.

When finished: as the admin test user, create one real-looking
record in each module, edit it, confirm the change reflects
immediately without a page refresh, then drag a test lead through
all four Kanban columns and export the CSV. Screenshot the Kanban
board as an Artifact. Then stop and wait for my review before
starting Phase 8.





Phase 8:


Read /docs/trd.md §3 and §13 before starting. Phase 7 is complete —
the full marketing site and admin CMS both work against the
emulator.

This phase touches the deployment pipeline and production rules, so
before writing any code: present your plan for the prerendering
setup and the GitHub Actions workflow, and wait for my approval
before executing.

Locked: trd.md §3 already resolved the SEO approach — Option A,
build-time prerendering of public marketing routes only. Do not
propose migrating to Next.js or any SSR framework.

Once approved:

1. Add react-helmet-async to every public route with unique title,
   meta description, and Open Graph tags sourced from that page's
   Firestore document where applicable (blog posts, services).
2. Add JSON-LD structured data: LocalBusiness schema on the site
   layout (sourced from siteSettings) and FAQPage schema on any
   page rendering an FAQ accordion.
3. Implement prerendering for all public marketing routes (not
   /admin/*) using vite-plugin-ssg or react-snap. Verify each
   prerendered route's HTML contains real text content, not an
   empty root div, by checking view-source after build.
4. Write the GitHub Actions workflow: on PR → build + deploy to a
   Firebase Hosting preview channel and comment the preview URL on
   the PR; on merge to main → production deploy including
   `firebase deploy --only firestore:rules,firestore:indexes,hosting,functions`.
5. Add a scheduled Cloud Function `generateSitemap` that queries
   published services/blogPosts/pages and writes sitemap.xml to
   Storage, served via a Hosting rewrite.

Do not run the production deploy step yourself — stop after the
workflow file is written and the preview-channel deploy has been
tested once. Show me the preview URL and the view-source output for
at least two prerendered routes before I authorize a production
deploy.