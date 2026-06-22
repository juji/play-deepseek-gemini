<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->


## 1. Project Overview & Tech Stack
- **Framework:** Next.js 16+ (App Router).
- **State Management:** Zustand (Global client-side stores).
- **Data Validation:** Valibot. **Zod or other schema libraries are strictly prohibited.**
- **Network Layer:** Native Web `fetch` API via a localized abstraction layer. **Axios is strictly prohibited.**
- **Package Manager:** `pnpm` (Never mix with npm/yarn).
- **Git Hooks Automation:** Husky + `lint-staged` (pre-commit: tsc, eslint, prettier | pre-push: pnpm build).

## 2. Structural & Refactoring Boundaries
- **Surgical Line Edits Only:** You are forbidden from rewriting or restructuring an entire file if a localized line edit or partial refactor suffices. Keep your changes under the minimum necessary line count.
- **Refactoring Justification:** Before making changes that affect more than a single function, component, or logical block, you must explicitly call out the scope of changes and justify why a localized edit isn't sufficient. Examples include: fixing a systemic type error, aligning with a new architectural pattern, or consolidating duplicate logic. If you cannot articulate why the change needs to be broader, default to the smallest possible diff.
- **No Extraneous Scaffolding:** Do not create unrequested utility folders, custom config files, or new wrapper files. Work strictly within the established project structure.
- **Inline Single-Use Logic:** Keep logic self-contained inside its calling module unless it is explicitly reusable across multiple features. Do not extract single-use helper functions prematurely.

## 3. Data Validation & Valibot Standards
- **Tree-Shaking Enforcement:** You are strictly forbidden from using wildcard imports (`import * as v from 'valibot'`). To maintain a minimal bundle size, you must explicitly import only the specific micro-methods required for the schema.
  * Correct: `import { parse, object, string } from 'valibot';`
- **Schema Co-location:** Valibot schemas used for API interactions or component validation must live inside or near the feature module using them (e.g., `src/features/auth/authSchema.ts` or inline if short).
- **Safe Evaluation:** Prefer tree-shakable Valibot methods like `parse()` for absolute validation boundaries, or `safeParse()` if managing grace periods for fallback data UI components.
- **Type Extraction:** Always infer TypeScript types directly from Valibot schemas instead of duplicating types manually.
  * Output type (runtime data shape): `type User = InferOutput<typeof UserSchema>;`
  * Input type (if you need to validate incoming data shape): `type UserInput = InferInput<typeof UserSchema>;`

## 4. API & Data Fetching Standards
- **Unified Request Entrypoint:** All client-side network operations must exclusively utilize the request wrapper found at `src/lib/request.ts`.
- **Import Mapping:** Always use the canonical alias: `import { request } from '@/lib/request'`.
- **Execution Protocol:** Use the explicit shorthand method mappings (`request.get`, `request.post`, `request.put`, `request.patch`, `request.delete`). 
- **Inline Validation Integration:** Pass the matching Valibot schema inside the options argument (`{ schema: UserSchema }`) to secure compile-time and runtime type execution safety inside the network pipeline.
- **Error Boundaries:** The `request` utility automatically catches, normalizes HTTP payloads, and fires automatic user state logouts on 401 exceptions. Do not write duplicate catch blocks to catch auth-session timeouts inside UI components.

## 5. Zustand State Management Constraints
- **Anti-Duplication Bias:** Before declaring, creating, or modifying state slices, you must run `ls -la src/store/` to inventory existing store modules. You are required to extend an existing store module rather than appending a brand new parallel state container. If no existing store covers the required domain, you must explicitly state in your response which stores you inspected and why none are suitable before creating a new one.
- **Client Boundary Protection:** Zustand stores are strictly client-side. Never import or invoke state slice initializers inside Server Components (`app/**/*page.tsx` or `layout.tsx`) unless explicitly marked with `'use client'`.
- **Atomic Selector Enforcement:** Always slice exact selectors when consuming store values to avoid unnecessary component rendering penalties.
  * Correct: `const user = useUserStore((state) => state.user);`
  * Incorrect: `const { user } = useUserStore();`

## 6. Automated Definition of Done (Mission Accomplished)
Do not ask for manual validation or run individual testing commands. Your workflow must follow this precise automation loop:

1. **Mission Success Evaluation:** Once you have completed the user's high-level human objective, review your file updates against sections 2, 3, 4, and 5 of this document.
2. **Surgical Staging Only:** Never use `git add .` or general wildcards. You are strictly forbidden from staging undocumented, playground, or temporary workspace files. You must explicitly stage *only* the specific code files you deliberately modified or created for this feature:
   ```bash
   git add path/to/changed/file.ts path/to/another/file.tsx
   ```
3. **Execute the Commit:** Execute a standard Git commit using conventional commit semantics. Scope should be the immediate feature folder name (e.g., auth, dashboard, cart) if inside src/features/. If modifying src/store/, use the store filename (e.g., store(user)). If modifying root app/ routes, use app:
   ```bash
   git commit -m "feat(scope): brief description of completed objective"
   ```
4. **Husky Hook Intervention Layer:**
   - The repository's `.husky/pre-commit` script will automatically trigger `lint-staged` to run your local TypeScript compiler checks, style guides, and formatting linters. 
   - **If the commit succeeds:** The mission is formally complete. Stop execution and notify the user of the successful commit.
   - **If the commit fails:** Read the hook's standard terminal output directly. Do not report a failure to the user. Treat the error log as an execution bug, repair the code violations locally, re-stage the specific files, and execute the commit again.
   - **Retry Limit:** Attempt the commit cycle up to 3 times maximum. On the 4th consecutive failure, immediately abort the automated commit, unstage all files with `git reset`, and present the complete error log to the user with a clear explanation of what the hook rejected. Do not attempt additional automated fixes beyond this point. Stop execution and hand off to the user for manual intervention.