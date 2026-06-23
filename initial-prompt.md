Hey DeepSeek, we are setting up a brand-new Next.js 16+ (App Router) project from a clean, vanilla installation. 

I have already saved our core rules framework directly into the project root at `AGENTS.md`. Read that file completely before writing any code—it contains our strict architectural, folder structure, validation, and git workflow boundaries.

### PHASE 0: Clean Node Ecosystem Transition
Before installing any new feature packages, cleanly transition the existing workspace files to use pnpm via our active terminal environment:
1. Delete any existing `package-lock.json` and the `node_modules` directory from the default vanilla setup.
2. Run a standard `pnpm install` using our system terminal to initialize a native, optimized `pnpm-lock.yaml` file.
3. Add the `packageManager` field to `package.json`.

### PHASE 1: Tooling Automation & Core Base Setup
1. **Dependencies:** Install `zustand`, `valibot`, `husky`, `lint-staged`, and `prettier` using pnpm.
2. **Code Styling & Linter Setup:** 
   - Configure Prettier with standard formatting parameters.
   - Configure `lint-staged` inside your `package.json` file to target matches exactly: `"*.{ts,tsx,js,jsx,mjs}": ["eslint --fix --max-warnings=0", "prettier --write"]`.
3. **Husky Automation Hooks:** 
   - Initialize Husky inside the project repository.
   - Configure `.husky/pre-commit` to execute exactly: `pnpm exec tsc --noEmit 2>&1` followed by `pnpm exec lint-staged`.
   - Configure `.husky/pre-push` to execute exactly: `pnpm run build`.
4. **Core App Architecture:**
   - Create our core client network wrapper at `lib/request.ts` (must accept a Valibot validation schema in its options object configuration as outlined in `AGENTS.md`).
   - Create our baseline authentication store container at `store/userStore.ts` utilizing Zustand.

### PHASE 2: Implement the Diagnostic Feature with Premium Visual Polish

Once your base automated environment and core files are ready, implement the "Product Inventory" 
dashboard module. Before writing a single line of JSX or CSS, complete the two-pass design 
process below — it is mandatory.

---

#### DESIGN MANDATE: Two-Pass Process (Required Before Code)

**Pass 1 — Design Plan (think, don't build yet)**

Define the following token system for this dashboard before touching layout:

- **Color palette (4–6 named values):** Ground in the subject: a warehouse/ops aesthetic — 
  cool slate infrastructure tones. Primary surface: near-white slate (#F8FAFC). Card surface: 
  white. Accent: a single electric indigo (#4F46E5) used *only* for primary actions and 
  interactive focus states. Data ink: warm slate (#334155). Muted text: #64748B. Amber 
  warning: #D97706. Never introduce additional accent colors.

- **Type scale:** Use `Inter` (import from Google Fonts) for all UI text. Display numerics 
  in the metric cards using `font-variant-numeric: tabular-nums` and `font-weight: 600`. 
  Labels in `font-weight: 500`, `font-size: 12px`, `letter-spacing: 0.05em`, `text-transform: 
  uppercase`. Body and table content in `font-weight: 400`. The type hierarchy should feel 
  like a Bloomberg terminal meets a premium SaaS dashboard.

- **Signature element:** The single thing this dashboard will be remembered by is its 
  **data table treatment**: each row slides in with a staggered CSS animation on mount 
  (0ms, 40ms, 80ms... delay per row), SKU tags are rendered as monospace chip components 
  with a `1px solid #E2E8F0` border and `#F8FAFC` fill, and the amber warning row glows 
  via `box-shadow: inset 3px 0 0 #D97706` on the left edge — no background color change, 
  just a precise left-side colored border accent and amber-colored quantity text.

**Pass 2 — Self-critique before building:**
Before writing code, verify: Does this look like it could be for any SaaS? If yes, 
make it more specific to inventory/ops. Eliminate anything decorative that doesn't serve 
wayfinding or data comprehension. Then build, following the plan exactly.

---

#### 1. Schema & Backend
- **Shared Validation:** Create `features/inventory/inventorySchema.ts` — strict Valibot schema:
  `itemName` (non-empty string), `sku` (alphanumeric regex, uppercase), `quantity` (positive integer).
- **In-Memory API:** `app/api/products/route.ts` — local array seeded with 4 diverse items 
  (varied SKUs, quantities including one at exactly 3 for conditional styling). GET returns 
  full array. POST uses `safeParse()` — failure returns `{ error, issues }` with HTTP 400.

---

#### 2. High-Fidelity UI: `app/inventory/page.tsx`

**Layout architecture:**
- Full-page layout: `min-h-screen` with a diagonal micro-pattern background created via 
  CSS `repeating-linear-gradient` at 45° using two nearly identical slate values 
  (`#F1F5F9` and `#E8EDF2`) — subtle, never distracting.
- All cards use `backdrop-filter: blur(0px)` (don't use blur — keep flat), clean 
  `1px solid #E2E8F0` borders, `border-radius: 12px`, and `box-shadow: 0 1px 3px 
  rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.06)`.

**Header:**
- Dashboard title "Product Inventory" in `font-size: 24px`, `font-weight: 600`, 
  `color: #0F172A`. Paired with a muted subtitle: "Warehouse ops · Live" in 
  `font-size: 13px`, `color: #64748B`, with a pulsing 6px green dot inline (CSS 
  keyframe pulse on `opacity` only — not scale).
- Right side of header: a dark mode toggle using a `<button>` with sun/moon icon.

**Metric cards (3-column equal grid):**
- Each card: white bg, 12px radius, subtle border, padding `20px 24px`.
- Top-right icon in each card: Tabler outline icons at 20px, color `#94A3B8`.
  - Unique SKUs → `ti-barcode`
  - Stock Volume → `ti-packages`  
  - System Status → `ti-satellite` with a separate 6px `border-radius: 50%` green 
    dot (`#10B981`) rendered as a `::after` pseudo-element — always visible, not on hover.
- Metric number: `font-size: 32px`, `font-weight: 600`, `font-variant-numeric: tabular-nums`, 
  `color: #0F172A`.
- Label below number: `12px`, `font-weight: 500`, `letter-spacing: 0.05em`, 
  `text-transform: uppercase`, `color: #64748B`.
- Hover: `transform: translateY(-1px)` + `box-shadow` deepens to 
  `0 4px 12px rgba(0,0,0,0.08)`. Transition: `all 150ms ease`.

**Add Product form:**
- Housed in its own card. Three inputs side-by-side on desktop (1fr 1fr 1fr), 
  stacked on mobile.
- Input focus: `outline: 2px solid #4F46E5`, `outline-offset: 2px`. Remove default 
  browser focus ring. Border stays `1px solid #E2E8F0` unfocused; does NOT change 
  color on focus — only the outline appears.
- Validation error messages appear below each field in `12px`, `color: #DC2626`, 
  with a `ti-alert-circle` icon inline.
- Submit button: `background: #4F46E5`, `color: white`, `border-radius: 8px`, 
  `padding: 10px 20px`, `font-weight: 500`. Left-side `+` icon (`ti-plus`). 
  Hover: `background: #4338CA` + `transform: translateY(-1px)` + 
  `box-shadow: 0 4px 14px rgba(79,70,229,0.4)`. Active: `transform: translateY(0)`.
  No pulse animation — the elevation shadow on hover IS the interaction signal.

**Data table:**
- Full-width card, no scroll on desktop. `border-collapse: separate; border-spacing: 0`.
- Header row: `background: #F8FAFC`, `font-size: 11px`, `font-weight: 600`, 
  `letter-spacing: 0.08em`, `text-transform: uppercase`, `color: #94A3B8`.
  Bottom border only: `border-bottom: 1px solid #E2E8F0`.
- Each data row: `border-bottom: 1px solid #F1F5F9`. Right-aligned cells with 
  `padding: 14px 16px`. Monospace SKU chip: `font-family: 'JetBrains Mono', 
  'Courier New', monospace`, `font-size: 12px`, `background: #F8FAFC`, 
  `border: 1px solid #E2E8F0`, `border-radius: 6px`, `padding: 2px 8px`.
- **Quantity ≤ 3 warning:** `box-shadow: inset 3px 0 0 #D97706` on the `<tr>`, 
  quantity cell text `color: #D97706`, `font-weight: 600`, prepend 
  `<i class="ti ti-alert-triangle" style="font-size:14px; vertical-align:-1px; margin-right:4px">` 
  before the number. No background color change.
- All other quantity text: `color: #334155`, `font-weight: 500`.
- **Row hover + Edit/Delete:** On `<tr>:hover`, show an action cell that's hidden 
  by default (`opacity: 0; pointer-events: none`; transition `opacity 150ms ease`). 
  On hover: `opacity: 1; pointer-events: auto`. Row itself gets 
  `background: #F8FAFC`. Edit button: `ti-pencil` icon, `color: #64748B`, 
  no border, transparent bg. Delete button: `ti-trash` icon, `color: #EF4444` on hover 
  (default `color: #94A3B8`). Both buttons `padding: 4px 8px`, `border-radius: 6px`, 
  `background: transparent` with hover bg `#F1F5F9` for edit, `#FEF2F2` for delete.
- **Staggered row entrance animation:** On mount, each `<tr>` animates from 
  `opacity: 0; transform: translateY(4px)` to `opacity: 1; transform: translateY(0)` 
  over `200ms ease-out`, with delay `index * 40ms`.

**Dark mode:**
- Implement via a `data-theme="dark"` attribute on `<html>` toggled by the header button.
- In dark mode: body bg `#0F172A`, card bg `#1E293B`, border `#334155`, 
  text primary `#F1F5F9`, muted `#94A3B8`, table header bg `#1E293B`, 
  row hover `#263044`, SKU chip bg `#0F172A` with border `#334155`. 
  Accent (#4F46E5) stays identical. Warning amber stays identical.

---

#### 3. Client Integrity & State
- Form inputs parsed against the Valibot schema *before* the fetch call. Display 
  field-level errors inline (not alert/console).
- Global inventory array managed in Zustand (`store/inventoryStore.ts`). 
  Optimistic update on POST: add to local state immediately, revert if API returns error.
- Edit flow: clicking Edit populates the form (inline edit, not modal), changes 
  button label to "Save changes", and scrolls form into view smoothly (`scrollIntoView({ 
  behavior: 'smooth' })`).

---

When all structural changes are deployed, complete the task using the automated git 
staging, linting, and conventional commit instructions outlined in Section 6 of `AGENTS.md`.