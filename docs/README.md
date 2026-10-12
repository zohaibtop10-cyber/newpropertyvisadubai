# /docs — Index

## \[Client Company Name\] Website — React.js + Firebase

Read this file first, before starting any phase in `build-prompts.md`.

---

## What's in this folder

| File | Read it for |
| --- | --- |
| `prd.md` | What to build and why — scope, functional requirements, the content checklist that must be filled before real copy ships |
| `trd.md` | How to build it — stack, Firestore schema, security rules, the SEO/prerendering decision |
| `ui-spec.md` | What it should look like — design tokens, components, page-by-page layout |
| `web-flow.md` | How users and data move — navigation map, calculator logic, lead lifecycle |
| `build-prompts.md` | The actual phase-by-phase prompts to execute, in order |

## Phase → Doc Map

| Phase | Primary doc(s) | Mode |
| --- | --- | --- |
| 0 — Scaffolding | `trd.md` §8 | Fast |
| 1 — Design system | `ui-spec.md` §1–2 | Fast |
| 2 — Firebase schema & rules | `trd.md` §4–7 | **Planning** |
| 3 — Home page | `ui-spec.md` §3, `trd.md` §4 | Fast |
| 4 — Visa pages | `ui-spec.md` §3, `web-flow.md` §1 | Fast |
| 5 — Calculator | `web-flow.md` §3, `trd.md` §10 | Fast |
| 6 — Admin auth/dashboard | `trd.md` §6, `ui-spec.md` §3 | Fast |
| 7 — Admin content modules | `trd.md` §4, `web-flow.md` §4–5 | Fast |
| 8 — SEO & deployment | `trd.md` §3, §13 | **Planning** |

Phases marked **Planning** should go through Antigravity's Planning Mode — review the agent's plan before it executes. A wrong Firestore rule or a broken deploy step is expensive to unwind; everything else is cheap to iterate on visually.

## Locked decisions — do not relitigate mid-build

- Stack is React.js (Vite SPA) + Firebase. Do not suggest Next.js, even for SEO reasons — `trd.md` §3 already resolved that trade-off via prerendering (Option A).
- Gold is an accent color, never a dominant fill. See `ui-spec.md` §1 for exact tokens — don't introduce new hex values ad hoc.
- No stock photography, no placeholder stats in anything client-facing. See `prd.md` §8 — this is the exact reason the first build was rejected.

## Before a build is shown to the client

Confirm every item in `prd.md` §8 (real licence number, address, fees, testimonials, team photo) has been swapped in for the `[PLACEHOLDER]` seed data from Phase 2. A preview with any remaining placeholder content should not go out for review.