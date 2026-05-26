# URL Shortener Analytics Dashboard

A polished React + TypeScript dashboard for creating short links and reading
their analytics, built on top of a .NET URL shortener API.

**[Live demo →](https://react-shortener-dashboard.vercel.app)**

> The demo runs against a free-tier backend, so the first request after a
> period of inactivity can take a few seconds to wake up.

![React](https://img.shields.io/badge/React-19-149ECA?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss&logoColor=white)
![TanStack Query](https://img.shields.io/badge/TanStack_Query-5-FF4154?logo=reactquery&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green)

## Features

- Email/password authentication with access token in memory and a rotating
  refresh token, restored on reload.
- Links management: paginated table, status filter, debounced search, plus
  create / edit / delete flows with optimistic cache invalidation.
- Per-link detail page with a copyable short URL and an authenticated QR code
  (preview + PNG download).
- Dashboard overview: total clicks, active/total links, clicks today, top
  links, a clicks-over-time chart with a date range selector, and
  country/device breakdowns.
- Per-link analytics: total clicks, unique IPs, last click, country and
  device charts.
- Loading skeletons, empty states, and error states with retry across every
  data fetch. Responsive from mobile to desktop.

## Tech stack

React 19 + Vite, TypeScript (strict), Tailwind CSS v4, shadcn/ui, React
Router v6, TanStack Query v5, React Hook Form + Zod, Axios, Recharts,
date-fns, lucide-react.

## Backend

This frontend consumes the companion .NET API,
[`dotnet-url-shortener`](https://github.com/AdolfoSiseG/dotnet-url-shortener).
Point `VITE_API_URL` at a running instance.

## Getting started

Prerequisites: Node 20+ and npm.

```bash
git clone https://github.com/AdolfoSiseG/react-shortener-dashboard.git
cd react-shortener-dashboard
npm install
cp .env.example .env.local   # then set VITE_API_URL if needed
npm run dev
```

The app runs at `http://localhost:5173`. `VITE_API_URL` is the base URL of
the API (no trailing slash); see `.env.example`.

### Scripts

- `npm run dev` — start the dev server
- `npm run build` — type-check and build for production
- `npm run preview` — preview the production build
- `npm run lint` — run ESLint

## License

[MIT](LICENSE)

## Author

Adolfo Sise — [GitHub](https://github.com/AdolfoSiseG)
