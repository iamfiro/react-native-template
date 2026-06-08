## Project

React Native + Expo (file-based routing). Atomic Design component structure.

## Critical Rules

1. Before implementing any logic, search `hooks/` and `utils/` for existing implementations. Reuse what exists. Duplicating functionality that already lives in hooks or utils is a bug.
2. After adding or modifying any component, update `docs/components.md` to reflect the change.

## Code Reuse

Shared logic belongs in one of two places:

| Type | Location | When |
|---|---|---|
| Stateful / lifecycle / side-effect logic | `hooks/` | Uses React hooks (useState, useEffect, etc.) |
| Pure functions / formatters / helpers | `utils/` | No React dependency |

Before writing a new function, check these directories directly (NOT from memory):
- `hooks/` — useRefreshControl, useTheme, useFcmToken, hooks/components/useButtonAnimation
- `utils/` — fileSystem, pushNotification, units/ (time, distance, largeNumber)

If the needed logic already exists, import it. If it partially exists, extend it in place. Only create a new file when no existing module covers the domain.

## Clean Code

- One responsibility per file. A component renders UI; logic lives in hooks/utils.
- Extract repeated logic (3+ lines, 2+ usages) into hooks or utils immediately.
- Name hooks `use[Domain][Action]` (e.g., `useFormValidation`). Name utils by domain (e.g., `utils/format.ts`).
- No inline business logic in components. If it's not about rendering, it doesn't belong in the TSX.

## Component Rules

- Follow Atomic Design: atoms → molecules → organisms.
- Each component lives in its own directory: `ComponentName.tsx`, `ComponentName.type.ts`, `index.ts`, optionally `ComponentName.util.ts`.
- Props are defined in `.type.ts`, never inline.
- After any component addition/modification, update `docs/components.md` with the component name, path, and purpose.

## File Structure

```
components/
  atoms/         — Single-purpose UI primitives
  molecules/     — Compositions of atoms
  organisms/     — Complex UI with business logic
  icon/          — SVG icon components (glyph/, brand/)
hooks/           — Reusable stateful logic
  components/    — Component-specific hooks
utils/           — Pure helper functions
  units/         — Unit conversion helpers
```

## Do Not

- Duplicate logic that exists in `hooks/` or `utils/`.
- Write business logic directly inside component files.
- Create a new util/hook file without first checking existing ones.
- Skip updating `docs/components.md` after component changes.
- Use `any` type or suppress TypeScript errors.

## Reminder

Before implementing any logic, search `hooks/` and `utils/` first. Reuse what exists. Update `docs/components.md` after any component change.
