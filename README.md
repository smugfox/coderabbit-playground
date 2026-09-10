# Orbit Storefront

A deliberately small React + TypeScript storefront used as a **sandbox for evaluating
AI code review tools**.

## Why this repo exists

The `main` branch is intentionally clean. Feature branches introduce *known, seeded
defects* so that a reviewer — human or AI — can be scored on what it actually catches.

Every "vulnerability" here is fake and self-contained. There are no real credentials,
no real services, and nothing is deployed. Do not treat this as production code.

## Stack

- React 18 + TypeScript
- Vite

## Scripts

```bash
npm run dev        # start the dev server
npm run typecheck  # type-check without emitting
```
