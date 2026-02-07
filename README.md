# Pathway Forward

UK-focused release support app with a React frontend and Node + SQLite backend.

## Local development

```bash
npm install
npm run dev
```

## Backend (optional but needed for persistence)

```bash
cd backend
npm install
npm run dev
```

The frontend will proxy `/api` to the backend at `http://localhost:5174`.

If you prefer running it from the repo root:

```bash
npm run dev:api
```

## Build

```bash
npm run build
```

## Core backend-backed features

- User registration and profile persistence (`/api/users/register`)
- Sponsor contacts and sponsor plan persistence
- Admin-managed jobs in SQLite (`/api/jobs`)
- Messaging and community topics persisted in SQLite
