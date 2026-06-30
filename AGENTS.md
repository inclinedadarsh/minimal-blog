# Agent Instructions

## Package manager
- Always use `bun`. Never use `npm`, `yarn`, or `pnpm`.

## Linting & formatting
- Run `bun run lint` (Biome) before finalizing changes.
- Auto-fix: `bun run lint:fix`.

## shadcn/ui
- Never write shadcn components manually.
- When adding, modifying, or debugging shadcn components, load the shadcn skill first.

## Frontend design
- For visual/styling direction, load the frontend-design skill.

## TypeScript
- Strict mode enabled. Path alias: `@/` → `./src/*`.

## Code style
- Follow Biome defaults: tabs, double quotes, semicolons, as-needed arrow parens.
