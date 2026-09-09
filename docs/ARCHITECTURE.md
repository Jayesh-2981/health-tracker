# Health Tracker — Architecture

## 1. Overview

Health Tracker is a web application for recording and managing personal health measurements.

The application will initially implement Blood Pressure tracking and will later be extended with additional health-tracking modules.

The architecture is designed so that new health modules can be added without unnecessarily modifying existing modules.

The application consists of three primary layers:

```text
┌───────────────────────────────┐
│           Frontend            │
│        React + Vite           │
└───────────────┬───────────────┘
                │
                │ HTTPS / REST API
                ▼
┌───────────────────────────────┐
│           Backend             │
│   Node.js + Express + TS      │
└───────────────┬───────────────┘
                │
                │ Google APIs
                ▼
┌───────────────────────────────┐
│       Google Services         │
│     OAuth + Google Sheets     │
└───────────────────────────────┘
```

---

# 2. Technology Stack

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

# 3. High-Level Architecture

```text
                         ┌────────────────────┐
                         │       User         │
                         └─────────┬──────────┘
                                   │
                                   ▼
                         ┌────────────────────┐
                         │   React Frontend   │
                         │                    │
                         │  Pages             │
                         │  Components        │
                         │  Forms             │
                         │  Charts            │
                         └─────────┬──────────┘
                                   │
                              HTTPS / REST
                                   │
                                   ▼
                         ┌────────────────────┐
                         │   Express Backend  │
                         │                    │
                         │ Routes             │
                         │ Controllers        │
                         │ Services           │
                         │ Validation         │
                         └─────────┬──────────┘
                                   │
                    ┌──────────────┴──────────────┐
                    │                             │
                    ▼                             ▼
           ┌─────────────────┐          ┌──────────────────┐
           │ Authentication  │          │ Google Sheets    │
           │ Service         │          │ Service          │
           └────────┬────────┘          └────────┬─────────┘
                    │                            │
                    ▼                            ▼
              Google OAuth                Google Sheets API
                                                 │
                                                 ▼
                                        User's Spreadsheet
```

---

# 4. Frontend Architecture

The frontend is responsible for:

- Rendering the user interface
- Managing UI state
- Collecting user input
- Client-side validation
- Displaying API results
- Displaying loading and error states
- Navigation
- Data visualization

The frontend is **not responsible for**:

- Google OAuth secrets
- Google API credentials
- Direct Google Sheets API access
- Server-side authorization
- Business-critical validation

---

# 5. Frontend Structure

The frontend will use a feature-oriented structure.

Conceptually:

```text
frontend/
└── src/
    ├── components/
    ├── features/
    │   ├── auth/
    │   ├── dashboard/
    │   └── blood-pressure/
    ├── layouts/
    ├── pages/
    ├── routes/
    ├── services/
    ├── hooks/
    ├── utils/
    ├── App.jsx
    └── main.jsx
```

As the application grows, health-specific functionality should primarily live inside its corresponding feature/module.

Example:

```text
features/
└── blood-pressure/
    ├── components/
    ├── hooks/
    ├── services/
    ├── schemas/
    └── pages/
```

The exact structure may evolve as implementation begins.

---

# 6. Backend Architecture

The backend follows a layered architecture.

```text
Request
   │
   ▼
Route
   │
   ▼
Controller
   │
   ▼
Validation
   │
   ▼
Service
   │
   ▼
External Service / Data Storage
```

### Routes

Define API endpoints and connect them to controllers.

### Controllers

Handle HTTP-specific concerns:

- Request
- Response
- HTTP status codes
- Passing validated input to services

Controllers should remain thin.

### Services

Contain business logic.

Services should not depend on Express request/response objects.

### Validators

Validate incoming data before business logic is executed.

### External services

Encapsulate communication with external systems such as Google APIs.

---

# 7. Backend Structure

The conceptual backend structure is:

```text
backend/
└── src/
    ├── config/
    ├── controllers/
    ├── middleware/
    ├── routes/
    ├── services/
    │   └── google/
    ├── modules/
    │   └── blood-pressure/
    ├── validators/
    ├── utils/
    ├── app.ts
    └── server.ts
```

The project may evolve toward a more strongly module-oriented structure as more health trackers are added.

---

# 8. Health Module Architecture

Each health tracker is treated as a separate domain module.

Example:

```text
modules/
├── blood-pressure/
├── weight/
├── blood-sugar/
└── heart-rate/
```

A module may contain:

```text
blood-pressure/
├── blood-pressure.controller.ts
├── blood-pressure.service.ts
├── blood-pressure.routes.ts
├── blood-pressure.schema.ts
└── blood-pressure.types.ts
```

The frontend will follow the same conceptual separation.

---

# 9. Blood Pressure Request Flow

When a user creates a Blood Pressure record:

```text
User
 │
 ▼
React Blood Pressure Form
 │
 ▼
Client Validation
 │
 ▼
POST /api/v1/blood-pressure
 │
 ▼
Express Route
 │
 ▼
Backend Validation
 │
 ▼
BloodPressureController
 │
 ▼
BloodPressureService
 │
 ▼
GoogleSheetsService
 │
 ▼
Google Sheets API
 │
 ▼
User's Blood Pressure Sheet
 │
 ▼
Response
 │
 ▼
React Query
 │
 ▼
Updated UI
```

---

# 10. Google OAuth Architecture

Google OAuth will be handled through the backend.

The frontend initiates the authentication process.

The backend communicates with Google.

Sensitive credentials remain on the server.

Conceptually:

```text
Browser
  │
  │ Login with Google
  ▼
Frontend
  │
  ▼
Backend
  │
  ▼
Google OAuth
  │
  ▼
User grants permission
  │
  ▼
Google
  │
  ▼
Backend receives authorization result
```

The exact session/token strategy will be finalized during the authentication implementation phase.

---

# 11. Google Sheets Architecture

Google Sheets acts as the primary persistence layer for health records.

The application should isolate Google Sheets implementation details behind a dedicated service.

For example:

```text
BloodPressureService
        │
        ▼
GoogleSheetsService
        │
        ▼
Google Sheets API
```

The Blood Pressure service should not directly call Google APIs.

This makes it possible to change the storage implementation in the future without rewriting the health modules.

---

# 12. Spreadsheet Organization

The application should create or manage a dedicated spreadsheet for the user.

Conceptually:

```text
Health Tracker
│
├── Blood Pressure
├── Weight
├── Blood Sugar
├── Heart Rate
└── Future Modules
```

Only modules that have been implemented need to exist.

The initial spreadsheet will therefore primarily contain:

```text
Health Tracker
└── Blood Pressure
```

---

# 13. Blood Pressure Data Flow

A Blood Pressure record will conceptually follow:

```text
React Form
    │
    ▼
REST API
    │
    ▼
BloodPressureService
    │
    ▼
GoogleSheetsService
    │
    ▼
Google Sheets
```

For retrieval:

```text
Google Sheets
    │
    ▼
GoogleSheetsService
    │
    ▼
BloodPressureService
    │
    ▼
REST API
    │
    ▼
React Query
    │
    ▼
UI
```

---

# 14. CRUD Architecture

Blood Pressure will support:

```text
CREATE
POST /api/v1/blood-pressure

READ
GET /api/v1/blood-pressure
GET /api/v1/blood-pressure/:id

UPDATE
PUT /api/v1/blood-pressure/:id

DELETE
DELETE /api/v1/blood-pressure/:id
```

CRUD operations will be implemented through the Blood Pressure service rather than directly inside route handlers.

---

# 15. API Boundary

The frontend communicates only with the application's backend API.

```text
Frontend
    │
    │ REST API
    ▼
Backend
    │
    │ External API
    ▼
Google
```

The frontend must not depend directly on Google Sheets implementation details.

This keeps the frontend independent from the persistence mechanism.

---

# 16. Error Handling

Errors should be handled at the appropriate layer.

```text
Google API Error
       │
       ▼
GoogleSheetsService
       │
       ▼
Domain/Service Error
       │
       ▼
Controller
       │
       ▼
Standard API Error Response
       │
       ▼
Frontend
       │
       ▼
User-friendly message
```

Internal implementation details and sensitive information must not be exposed to users.

---

# 17. State Management

The application distinguishes between:

### Server state

Examples:

- Blood Pressure records
- User profile
- Google connection status

Server state will be managed using TanStack Query.

### UI state

Examples:

- Modal open/closed
- Form state
- Selected record
- Sidebar state

UI state will use React state and other lightweight mechanisms where appropriate.

A global state library will not be introduced unless a real requirement appears.

---

# 18. Security Boundary

The browser is considered an untrusted environment.

The backend is the security boundary.

Sensitive operations such as:

- Google OAuth
- Google API access
- Token handling
- Authorization
- Server-side validation

must be performed on the backend.

---

# 19. Extensibility

The architecture must allow new health trackers to be added without unnecessarily changing the core application.

For example:

```text
Blood Pressure
      │
      └── establishes module pattern

Weight
      │
      └── follows module pattern

Blood Sugar
      │
      └── follows module pattern
```

Shared infrastructure such as:

- Authentication
- Google Sheets
- API error handling
- Validation patterns
- UI components
- Logging
- Configuration

should be reusable across modules.

Domain-specific logic should remain inside each module.

---

# 20. Architectural Decision Principle

When making architectural decisions, the following priorities apply:

1. Security
2. Maintainability
3. Correctness
4. Testability
5. Extensibility
6. Developer experience
7. Performance
8. Simplicity

The simplest solution that satisfies these requirements should be preferred.

---

# 21. Architecture Evolution

This document describes the intended architecture, not an immutable design.

As implementation reveals real requirements, architectural decisions may change.

When a significant architectural decision changes, this document and the relevant documentation should be updated.

The project should evolve deliberately rather than accumulating accidental complexity.
