# Habit Scheduler UI

A clean, modern frontend for my constraint-based habit scheduling application.  
Built with **Angular**, **TypeScript**, and **Tailwind CSS v4**.

The UI allows users to:
- View habits and weekly schedules
- Track completion and missed habits
- Drag & drop habits into time slots
- Navigate between weeks
- Interact with a REST API backend

---

## Tech Stack

- **Angular**
- **TypeScript**
- **Tailwind CSS v4**
- **RxJS**
- **Netlify** (deployment)

---

## Features

- Habit list with frequency display
- Weekly schedule view
- Slot status indicators (Scheduled / Completed / Missed)
- Disabled actions for invalid states
- Drag & drop scheduling
- Skeleton loading states
- Dark theme support

---

## Component Structure

src/app/
components/
habits/
schedule/
calendar/
services/
api.service.ts
models/
habit.model.ts
schedule-slot.model.ts


---

## Backend Integration

Uses an ASP.NET Core REST API.

Environment-based configuration:

- `environment.ts` → local development
- `environment.prod.ts` → production

Example:

```ts
export const environment = {
  production: true,
  apiBaseUrl: 'https://habitscheduler.onrender.com/api'
};
```
## Local Development
Prerequisites
Node.js (18+ recommended)

Angular CLI

Setup
```bash
git clone https://github.com/your-username/habit-scheduler-frontend.git
cd habit-scheduler-frontend
npm install
```
Run the dev server:
```bash
ng serve
```
App will be available at:
```bash
http://localhost:4200
```
## Styling
- Tailwind CSS v4
- Utility-first styling
- Dark theme applied at root level
- Skeleton loaders for async data

## Deployment
Deployed on Netlify at:
```bash
https://habit-scheduler.netlify.app/
```

Automatically builds using:

ng build
Uses environment.prod.ts for API URLs
