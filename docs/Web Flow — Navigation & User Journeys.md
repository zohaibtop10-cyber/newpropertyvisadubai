# Web Flow — Site Navigation, User Journeys & Data Flow

**Companion to PRD v1.0 / TRD v1.0 / UI Spec v1.0**

---

## 1. Site Navigation Map

```mermaid
graph TD
    Home --> PropertyVisa[Property Visa]
    Home --> GoldenVisa[Golden Visa]
    Home --> FamilyVisa[Family Visa]
    Home --> Services
    Home --> Calculator[Cost Calculator]
    Home --> About
    Home --> Blog
    Home --> Contact

    Services --> PRO[PRO Services]
    Services --> DLD[Dubai Land Dept.]
    Services --> Attestation
    Services --> EmiratesID[Emirates ID]

    PropertyVisa --> Calculator
    GoldenVisa --> Calculator
    FamilyVisa --> Calculator

    Calculator --> Lead[Lead Form / WhatsApp]
    Contact --> Lead

    About --> Team
    About --> Reviews

    Blog --> BlogPost[Blog Post]
```

## 2. Visitor Conversion Funnel

```mermaid
flowchart LR
    A[Visitor lands\non Home or ad landing page] --> B{Knows which\nvisa route?}
    B -- No --> C[Browses service pages\n/ reads FAQ]
    B -- Yes --> D[Opens Calculator]
    C --> D
    D --> E[Selects route +\nenters basic details]
    E --> F[Sees itemized\nfee breakdown]
    F --> G{Ready to proceed?}
    G -- Yes --> H[WhatsApp with\nprefilled summary]
    G -- Yes --> I[Submits lead form]
    G -- Not yet --> J[Reads testimonials\n/ blog for reassurance]
    J --> D
    H --> K[Lead created in Firestore]
    I --> K
    K --> L[Sales team notified\nvia Cloud Function]
```

## 3. Eligibility Calculator — Decision Flow

```mermaid
flowchart TD
    Start([Open Calculator]) --> Route{Select route}
    Route -->|Property| P[Enter property value]
    Route -->|Company owner| C[Enter company share %]
    Route -->|Salaried| S[Enter monthly salary]
    Route -->|Fixed deposit| D[Enter deposit amount]
    Route -->|Family| F[Select relationship:\nspouse/child/parent]

    P --> Threshold{Meets AED\nthreshold?}
    C --> Threshold
    S --> Threshold
    D --> Threshold
    F --> Threshold2{Meets income/\ntenancy rule?}

    Threshold -->|Yes| AddFamily[Add family members?]
    Threshold -->|No| Alt[Show closest\neligible alternative]
    Threshold2 -->|Yes| AddFamily
    Threshold2 -->|No| Alt

    AddFamily --> Compute[Compute itemized fees:\ngovernment vs. service]
    Compute --> Result[Show breakdown +\ntimeline estimate]
    Result --> CTA[WhatsApp quote /\nSubmit as lead]
```

## 4. Admin CMS — Content Flow

```mermaid
flowchart LR
    Login[Admin logs in\nFirebase Auth] --> Claims{Role claim\nchecked}
    Claims -->|admin/editor| Dashboard
    Claims -->|sales| LeadsOnly[Leads module only]
    Claims -->|none| Denied[Access denied]

    Dashboard --> Module[Select module:\nServices / Pages / Blog /\nFAQs / Testimonials / Team / Settings]
    Module --> Edit[Edit form\nmatches Firestore schema]
    Edit --> Validate[Client-side validation]
    Validate --> Save[Write to Firestore]
    Save --> Live[Change reflects on\npublic site immediately\n— no redeploy]
```

## 5. Lead Lifecycle

```mermaid
stateDiagram-v2
    [*] --> New: Lead submitted (calculator or contact form)
    New --> Contacted: Sales reaches out
    Contacted --> Qualified: Meets criteria, docs requested
    Contacted --> Closed: Not interested / unreachable
    Qualified --> Closed: Converted to client or dropped off
    Closed --> [*]
```

---

## Notes

- Every arrow into "Lead created" corresponds to a `leads` Firestore write (TRD §4) and triggers `onLeadCreated` (TRD §7).
- The calculator decision flow (§3) is the literal logic to implement in `useCalculator` (TRD §8, §10) — route selection drives which `calculatorRules/{route}` document is fetched.
- The admin flow (§4) assumes role claims per TRD §6; a `sales` role should only ever reach the Leads module, never content modules.