# Health Tracker

Health Tracker is a web application for recording, managing, and visualizing personal health measurements.

The application is being built as a continuously evolving project, beginning with Blood Pressure tracking and expanding to additional health-tracking modules over time.

The project focuses on maintainable architecture, secure authentication, reliable data handling, automated testing, and a practical user experience.

---

## Project Status

🚧 **Actively under development**

The project is currently in the **project foundation and architecture phase**.

The first health module will be **Blood Pressure**.

Planned development flow:

```text
Project Foundation
       ↓
Application Infrastructure
       ↓
Authentication
       ↓
Google Sheets Integration
       ↓
Blood Pressure Tracker
       ↓
Blood Pressure Dashboard
       ↓
Testing & Security
       ↓
Additional Health Trackers
       ↓
Production Deployment
```

---

# Features

## Planned

### Authentication

- Google-based authentication
- Secure application sessions
- User authorization
- Google account connection

### Blood Pressure

- Add Blood Pressure readings
- View Blood Pressure history
- Edit readings
- Delete readings
- Track pulse when available
- Add notes
- View trends
- Filter historical measurements

### Google Sheets

- Connect the user's Google account
- Create a dedicated Health Tracker spreadsheet
- Store health records in the user's spreadsheet
- Keep the user's health data accessible through Google Sheets

### Future Health Trackers

The application is designed to support additional modules such as:

- Weight
- Blood Sugar
- Heart Rate
- Temperature
- SpO₂
- Sleep
- Medication

Additional modules will be introduced incrementally after the Blood Pressure module establishes the reusable architecture.

---

# Architecture

The application follows a frontend/backend architecture:

```text
┌─────────────────────────────┐
│        React Frontend       │
│                             │
│ React + Vite                │
│ React Bootstrap             │
│ React Router                │
│ TanStack Query              │
└──────────────┬──────────────┘
               │
               │ REST API
               ▼
┌─────────────────────────────┐
│       Express Backend       │
│                             │
│ Node.js + TypeScript        │
│ Authentication              │
│ Validation                  │
│ Business Logic              │
└──────────────┬──────────────┘
               │
               │ Google APIs
               ▼
┌─────────────────────────────┐
│       Google Services       │
│                             │
│ Google OAuth                │
│ Google Sheets API           │
└──────────────┬──────────────┘
               │
               ▼
       User's Spreadsheet
```

Google-specific functionality is isolated behind backend services.

The React frontend does not directly communicate with Google Sheets APIs.

---

# Technology Stack

## Frontend

- React
- Vite
- React Bootstrap
- Bootstrap
- React Router
- Axios
- React Hook Form
- Zod
- TanStack Query
- Recharts

## Backend

- Node.js
- Express.js
- TypeScript
- Zod
- Google APIs

## Authentication

- Google OAuth 2.0

## Data Storage

- Google Sheets API

## Testing

- Vitest
- React Testing Library
- Supertest

## Version Control

- Git
- GitHub

---

# Data Storage

Health Tracker uses Google Sheets as its initial persistence layer.

Each user will have their own Health Tracker spreadsheet.

Conceptually:

```text
User
 │
 ▼
Google Account
 │
 ▼
Health Tracker Spreadsheet
 │
 ├── Blood Pressure
 ├── Weight
 ├── Blood Sugar
 └── Future Health Modules
```

The application will keep Google Sheets implementation details inside backend infrastructure services.

This allows the health modules to operate on application-level data rather than spreadsheet-specific structures.

---

# Blood Pressure Data

The initial Blood Pressure record contains:

```text
id
recordedAt
systolic
diastolic
pulse
notes
createdAt
updatedAt
```

Example:

```json
{
  "id": "bp_001",
  "recordedAt": "2026-09-10T08:30:00+05:30",
  "systolic": 120,
  "diastolic": 80,
  "pulse": 72,
  "notes": "Morning reading",
  "createdAt": "2026-09-10T08:31:15+05:30",
  "updatedAt": "2026-09-10T08:31:15+05:30"
}
```

The spreadsheet representation and API contract are documented separately in the `docs` directory.

---

# Project Structure

The project uses a frontend/backend separation:

```text
health-tracker/
│
├── frontend/
│
├── backend/
│
├── docs/
│   ├── RULES.md
│   ├── ARCHITECTURE.md
│   ├── DATA-MODEL.md
│   ├── API.md
│   ├── GOOGLE-SHEETS.md
│   └── ROADMAP.md
│
├── README.md
└── .gitignore
```

The exact implementation structure will evolve as development progresses.

---

# Documentation

Project documentation is maintained in the `docs` directory.

| Document           | Purpose                                |
| ------------------ | -------------------------------------- |
| `RULES.md`         | Development and coding rules           |
| `ARCHITECTURE.md`  | Application architecture               |
| `DATA-MODEL.md`    | Application and health data structures |
| `API.md`           | REST API specification                 |
| `GOOGLE-SHEETS.md` | Google OAuth and Sheets integration    |
| `ROADMAP.md`       | Development milestones                 |

---

# Development Approach

Development follows milestone-based incremental development.

Each meaningful milestone follows:

```text
Plan
 ↓
Implement
 ↓
Test
 ↓
Review
 ↓
Document
 ↓
Commit
 ↓
Push
 ↓
Next Milestone
```

The `main` branch should remain in a working state.

There are no artificial application version boundaries.

The project continuously evolves as functionality is completed and improved.

---

# Git Workflow

Meaningful changes are committed using descriptive commit messages.

Examples:

```text
docs: establish project development rules
docs: define application architecture
chore: initialize frontend application
chore: initialize backend application
feat: implement Google authentication
feat: add Google Sheets service
feat: add blood pressure API
feat: add blood pressure CRUD UI
test: add blood pressure API tests
fix: handle revoked Google authorization
refactor: improve health module structure
```

Changes will be pushed to GitHub throughout development.

---

# Local Development

Local development instructions will be added as the frontend and backend applications are initialized.

Once the application infrastructure is available, this section will contain:

- Prerequisites
- Installation
- Environment variables
- Frontend startup
- Backend startup
- Testing
- Build commands

---

# Security

Health Tracker handles sensitive personal health information.

Security is therefore a core architectural concern.

The project will:

- Keep sensitive credentials on the backend
- Never commit secrets to Git
- Validate user input
- Enforce authorization server-side
- Minimize sensitive logging
- Request appropriate Google permissions
- Handle revoked Google authorization
- Protect authenticated endpoints
- Use secure configuration in production

---

# Privacy

The application is designed around user-owned health data.

Health records are intended to be stored in the user's Google Sheets account rather than in an application-owned health database.

The application should minimize unnecessary storage and processing of personal health information.

---

# Project Goals

The primary goals of Health Tracker are:

1. Build a genuinely useful health-tracking application
2. Establish a maintainable architecture
3. Build reusable health-tracking modules
4. Integrate securely with Google services
5. Demonstrate professional frontend development
6. Demonstrate professional backend development
7. Practice API design and integration
8. Implement meaningful automated testing
9. Apply practical security principles
10. Maintain a clean Git/GitHub development history
11. Deploy the application as a production-style web application

---

# Current Focus

The current focus is:

```text
Project Foundation
       ↓
Documentation
       ↓
GitHub Repository
       ↓
Application Infrastructure
```

The first major functional goal is:

```text
Complete Blood Pressure Tracker
```

After the Blood Pressure module is complete and the architecture has been reviewed, additional health-tracking modules can be introduced.

---

# License

A license will be selected when the project is prepared for public distribution.
