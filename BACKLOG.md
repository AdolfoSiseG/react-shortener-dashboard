# Backlog

Features intentionally deferred past v1.0 to keep the initial scope focused.

## Product

- Dark mode (theme tokens and `.dark` variables already exist; needs a theme toggle and persistence).
- Internationalization (i18n).
- User profile page (change email / password). v1.0 ships logout only.
- Team / organization accounts.
- Notifications and a settings page.
- Billing.
- Advanced link filters (date created, click-count threshold).
- CSV / Excel export of links and analytics.
- Country breakdown as an interactive map (`react-simple-maps`); v1.0 uses a bar chart.
- Referrer breakdown chart (endpoint and types exist; not surfaced in the UI yet).

## Engineering

- Route-level data prefetching on link hover.
- Optimistic updates for create/edit/delete (currently invalidate-and-refetch).
- E2E tests (Playwright) for the auth and link-management flows.
- Replace the `radix-nova` preset extras if they prove unnecessary (`shadcn`, `next-themes` deps pulled in by the preset).
- Swap the brand accent token or revisit typography if the design direction changes (single `--brand` token in `src/index.css`).
