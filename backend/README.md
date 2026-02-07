# Pathway Forward Backend

Node HTTP API with SQLite persistence for registration data, sponsor data, jobs, messages, and community topics.

## Setup

```bash
npm install
npm run dev
```

The API listens on `http://localhost:5174` by default.

## Environment variables

- `PORT`: Override the server port (default: `5174`).
- `DB_PATH`: Override the SQLite file location (default: `backend/data/pathfinder.sqlite`).
- `CORS_ORIGIN`: Set an allowed origin for CORS (default: `*`).

## API

- `GET /api/health`
- `GET /api/contacts`
- `POST /api/contacts` → `{ name, phone?, email? }`
- `DELETE /api/contacts/:id`
- `GET /api/sponsor-plan`
- `PUT /api/sponsor-plan` → `{ reachOut, checkInFrequency, backupContact, boundary }`
- `GET /api/messages`
- `POST /api/messages` → `{ sender, text }`
- `GET /api/users`
- `GET /api/users/:id`
- `POST /api/users/register` → `{ name, email?, phone?, area? }`
- `POST /api/users` → `{ name, email?, phone?, area? }`
- `GET /api/jobs`
- `GET /api/jobs/:id`
- `POST /api/jobs` → `{ title, area, type, employerName?, summary, responsibilities[], requirements[], supportAvailable[], howToApply[] }`
- `GET /api/topics`
- `POST /api/topics` → `{ title, category?, text? }`
- `GET /api/topics/:id`
- `POST /api/topics/:id/posts` → `{ author?, text }`
