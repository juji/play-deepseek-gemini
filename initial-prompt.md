Hey DeepSeek, we are setting up a brand-new Next.js 15+ (App Router) project from a clean, vanilla installation. 

I have already saved our core rules framework directly into the project root at `AGENTS.md`. Read that file completely before writing any code—it contains our strict architectural, folder structure, validation, and git workflow boundaries.

Your task is broken down into three distinct phases:

PHASE 0: Clean Node Ecosystem Transition
Before installing any new feature packages, cleanly transition the existing workspace files to use pnpm via our active terminal environment:
1. Delete any existing `package-lock.json` and the `node_modules` directory from the default vanilla setup.
2. Run a standard `pnpm install` using our system terminal to initialize a native, optimized `pnpm-lock.yaml` file.
3. Add packageManager field to package.json

PHASE 1: Tooling Automation & Core Base Setup
1. Dependencies: Install `zustand`, `valibot`, `husky`, `lint-staged`, and `prettier` using pnpm.
2. Code Styling & Linter Setup: 
   - Configure Prettier with standard formatting parameters.
   - Configure lint-staged inside your package.json file to target matches exactly:
     "*.{ts,tsx,js,jsx,mjs}": ["eslint --fix --max-warnings=0", "prettier --write"]
3. Husky Automation Hooks: 
   - Initialize Husky inside the project repository.
   - Configure `.husky/pre-commit` to execute exactly:
     pnpm exec tsc --noEmit 2>&1
     pnpm exec lint-staged
   - Configure `.husky/pre-push` to execute exactly:
     pnpm run build
4. Core App Architecture:
   - Create our core client network wrapper at `lib/request.ts` (must accept a Valibot validation schema in its options object configuration as outlined in AGENTS.md).
   - Create our baseline authentication store container at `store/userStore.ts` utilizing Zustand.

PHASE 2: Implement the Diagnostic Feature with Premium Visual Polish
Once your base automated environment and core files are ready, implement the "Product Inventory" dashboard module while adhering completely to AGENTS.md boundaries and the following strict UI layout design criteria:

1. Shared Validation Schema: Create a unified validation contract at `features/inventory/inventorySchema.ts` that exports a strict Valibot schema validating an inventory item payload (Item Name, alphanumeric SKU code, and a positive number for Quantity).
2. The In-Memory Backend Route: Create an App Router API route at `app/api/products/route.ts` with a local in-memory array data variable. Provide a GET handler, and a POST handler that verifies incoming data using `safeParse()`. If validation fails, immediately return an HTTP 400 Bad Request.
3. High-Fidelity UI Layout Design (`app/inventory/page.tsx`):
   - Background & Theme: Use a sleek, minimalist dashboard container layout utilizing an elegant, modern aesthetic (subtle off-white/slate backgrounds, crisp dark text, charcoal boundaries, and consistent grid alignment).
   - The Metrics Layer: Add a top grid section containing 3 beautiful, responsive stat display cards showcasing structural indicators: "Total Unique SKUs", "Total Stock Volume", and a "System Status" indicator badge showing a glowing green ring if connected to your in-memory array handler.
   - Interactive Input Panel: Render a polished grid card for adding new products. Do not use unstyled elements. Use clear form container wrappers with elegant focus borders (`focus:ring-2 focus:ring-black/5 focus:border-zinc-900 transition-all`), smooth animations, inline Valibot warning markers, and a premium interactive submission button that visually indicates loading/idle states.
   - Data Table Representation: Render the current inventory items using a beautiful, responsive grid list or clean layout matrix. Include clear column headings, subtle borders, gray helper text for sub-attributes (like SKUs), and color-coded numeric badges highlighting low stock metrics if quantity drops below 5 units.
4. Client Integrity and Networking: Wire up the page form to parse inputs against your Valibot schema before dispatching. Hook up your client operations exclusively to our custom `lib/request` client wrapper.
5. Zustand State Syncing: Ensure you run `ls -la store/` inside your context to inspect our initial infrastructure before deciding where to manage or append the inventory state array data globally.

When all structural changes are deployed, complete the entire task using the automated git staging, linting, and conventional commit instructions outlined in Section 6 of AGENTS.md.