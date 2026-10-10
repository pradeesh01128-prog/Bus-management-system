# Bus Management System

## Overview
Static HTML/CSS/JS app (no backend, no database). All data is stored in browser LocalStorage.

## Running
- Served via nginx (alpine) on port 3000 through `docker-compose.base44.yml`.
- Source is bind-mounted read-only into the container, so file edits are reflected immediately — no rebuild needed.
- No secrets or external credentials required.

## Structure
- `index.html` — dashboard
- `buses.html`, `drivers.html`, `bookings.html`, `routes.html`, `schedules.html`, `payments.html` — feature pages
- `js/` — page-specific JavaScript (dashboard.js, buses.js, drivers.js, bookings.js, routes.js, schedules.js, payments.js)
- `app.js` — shared app logic
- `css/style.css` — styles
- `images/` — static images
