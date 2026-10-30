# Contributing to otto-web

## Prerequisites

- Node.js >= 18 (tested on 20 and 24)
- npm

## Setup

```bash
npm install
```

`npm install` runs the `prepare` script, which installs the Husky pre-commit hook automatically.

## Development

```bash
npm run dev       # Vite dev server
npm run build     # tsc + vite build
npm run preview   # preview production build
```

## Quality gates (must pass before merging)

```bash
npm run lint      # ESLint (0 errors required)
npm run test      # Vitest
npm run build     # TypeScript + Vite build
```

A pre-commit hook (Husky + lint-staged) runs `eslint --fix` on staged `*.{ts,tsx}` files.
If lint fails, the commit is blocked. Do not bypass with `--no-verify` unless explicitly approved.

## Code standards

- Follow `.opencode/context/core/standards/code-quality.md` when present.
- TypeScript: avoid `any`; use proper types.
- Prefer functional components and hooks.
- Keep Turkish content and visual design intact unless the change explicitly targets them.
- Preserve public URLs: `/`, `/hakkimizda`, `/iletisim`, `/aktiviteler`, `/aktiviteler/:slug`, `/sayfa/:slug`, `/about`, `/contact`, `/privacy`.

## Commits

- Use conventional-ish prefixes: `feat:`, `fix:`, `chore:`, `docs:`, `test:`, `refactor:`.
- Keep commits focused; one concern per commit.
- Lint baseline is 0 errors — do not introduce new lint errors.

## CI

GitHub Actions runs `lint`, `test`, and `build` on push/PR. All three must be green.
