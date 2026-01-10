# Pathway Forward

A UK-focused, frontend-only prototype dashboard for prison release support.

## Local development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Azure Static Web Apps deployment

This project includes a GitHub Actions workflow for Azure Static Web Apps.

1. Create an Azure Static Web Apps resource.
2. Add the deployment token as a GitHub repository secret named `AZURE_STATIC_WEB_APPS_API_TOKEN`.
3. Push to the `main` branch to trigger deployment.

- `app_location`: `/`
- `output_location`: `dist`
- `api_location`: `/backend` (placeholder only)

## Backend placeholder

The `/backend` folder is a scaffold for future APIs. The frontend runs without it.
