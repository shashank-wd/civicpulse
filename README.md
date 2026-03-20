# CivicPulse

**SDG 11 — Sustainable Cities and Communities**

A hyper-local, community-powered urban issue reporting and resolution platform. Citizens report civic issues with a photo and GPS pin. Municipal dashboards show live priority rankings driven by real community need.

---

## Live Prototype

https://shashank-wd.github.io/civicpulse
---

## Project Structure

```
civicpulse/
├── index.html            # Citizen report screen
├── pages/
│   ├── dashboard.html    # Municipal officer dashboard
│   └── scorecard.html    # Public ward scorecards
├── css/
│   └── style.css         # All styles
├── js/
│   └── app.js            # All interactivity
└── README.md
```

---

## Screens

### 1. Report Issue (`index.html`)
- SVG map with color-coded issue pins and 500m proximity radius ring
- Category selector: Road, Drainage, Lighting, Waste
- Photo upload with preview
- Live GPS coordinates display
- Submit with confirmation toast

### 2. Ward Dashboard (`pages/dashboard.html`)
- Summary stats: Critical / Pending / Resolution rate / Avg resolution time
- Category filter bar
- Priority queue table sorted by decay score
- Assign to team buttons (toggle state on click)
- Score formula: `votes × 1.2^(days unresolved)` — recalculated every 24h

### 3. Ward Scorecards (`pages/scorecard.html`)
- Ward selector dropdown — live updates all metrics
- 5 metric cards: Total / Resolved / Rate / Avg time / Pending
- Full ward ranking table with visual bars, color-coded by performance
- Click any ward row to update the metric cards
- Public data — no login required

---

## Key Features

| Feature | Description |
|---|---|
| Proximity voting | Only users within 500m of a report can upvote it |
| Decay scoring | `Score = votes × 1.2^(days unresolved)` — older issues rise automatically |
| Ward scorecards | Public resolution rate per ward, updated weekly |
| Offline-first PWA | Service worker queues reports when connectivity drops |

---

## Tech Stack (Prototype)

- Pure HTML, CSS, JavaScript — zero dependencies
- Google Fonts: Space Grotesk + DM Sans
- SVG for map rendering

## Tech Stack (Full Build)

- **Frontend**: React.js PWA, Leaflet.js, Workbox, Tailwind CSS
- **Backend**: Node.js + Express, node-cron
- **Database**: PostgreSQL + PostGIS, Redis
- **Storage**: AWS S3 / MinIO + CDN
- **Notifications**: Firebase FCM, Twilio / MSG91
- **Auth**: JWT with role-based access

---

## SDG Alignment

**SDG 11 — Sustainable Cities and Communities**

Target: Make cities inclusive, safe, resilient, and sustainable by 2030.

CivicPulse directly addresses the broken civic reporting loop — no prioritization, no community pressure, no public accountability — that leaves urban infrastructure issues unresolved for weeks in cities across India and the developing world.

---

## Team

Built for FASTATHON — Round 1 submission
GitHub: [shashank-wd](https://github.com/shashank-wd)
