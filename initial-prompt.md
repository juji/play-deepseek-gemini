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
Once your base automated environment and core files are ready, implement the "Product Inventory" dashboard module while adhering completely to `AGENTS.md` boundaries and the following criteria:

**1. Schema & Backend:**
- **Shared Validation:** Create a unified validation contract at `features/inventory/inventorySchema.ts` that exports a strict Valibot schema for Item Name, alphanumeric SKU code, and a positive number for Quantity.
- **In-Memory API:** Create an App Router API route at `app/api/products/route.ts` with a local in-memory array. Provide a GET handler and a POST handler that uses `safeParse()`. If validation fails, return HTTP 400.

**2. High-Fidelity UI Layout (`app/inventory/page.tsx`) & Design Polish:**
- **Theme:** Implement full **light/dark mode support** with a minimalist aesthetic. 
- **Background:** Introduce a subtle, light slate gray gradient pattern (diagonal lines) behind main cards.
- **Header:** Style 'Product Inventory' as Semi-bold.
- **Metrics (Top Row):** 
    - Ensure all 3 cards are equal width.
    - Add stylized grey icons to the top-right: Stacked barcode (Unique SKUs), stacked storage boxes (Stock Volume), and a satellite dish (System Status—maintain the glowing green ring next to the icon).
    - Change labels to muted blue-grey. Add subtle drop-shadows on hover.
- **Add Product Form (Middle):**
    - Change focus borders to vibrant electric blue. 
    - Update 'Add Product' button to a rounded electric blue button; add a '+' icon before the text; include a bright blue pulse effect and slight elevation on hover.
- **Data Table (Bottom):**
    - Align row cells perfectly to the right with clean spacing.
    - Style SKUs as monospace tags with a light gray border/background.
    - **Conditional Logic:** Highlight rows with Quantity "3" (e.g., Component Gamma) in warm amber text with a warning triangle icon next to the quantity. 
    - Style other quantities in lighter black/dark grey.
    - **Interactions:** Implement a functional **Edit** and **Delete** feature that appears only on hover at the right of each data row.

**3. Client Integrity & State:**
- Wire the form to parse inputs against the Valibot schema before dispatching via the custom `lib/request` wrapper.
- Inspect `store/` before managing the inventory state array globally in Zustand.

When all structural changes are deployed, complete the task using the automated git staging, linting, and conventional commit instructions outlined in Section 6 of `AGENTS.md`.