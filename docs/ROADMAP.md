# Development Roadmap

## Project

Health Tracker

## Goal

Build a portfolio-quality health tracking application using React, plain PHP, Google OAuth, and Google Sheets.

The first health module is Blood Pressure.

---

# Milestone 0 — Project Foundation

## Objective

Establish the project architecture, documentation, development rules, and Git foundation before application implementation.

### Tasks

- [x] Decide final technology stack
- [x] Define project purpose
- [x] Define high-level architecture
- [x] Define development rules
- [x] Define initial data model
- [x] Define initial API structure
- [x] Define Google Sheets strategy
- [x] Create documentation structure
- [ ] Review documentation
- [ ] Initialize/verify Git repository
- [ ] Create initial foundation commit
- [ ] Push foundation to GitHub

---

# Milestone 1 — Frontend Foundation

## Objective

Create the React application foundation.

### Tasks

- [ ] Create React + Vite application
- [ ] Configure ESLint
- [ ] Install React Bootstrap
- [ ] Configure Bootstrap
- [ ] Install React Router
- [ ] Configure application routing
- [ ] Install Axios
- [ ] Configure API client
- [ ] Install React Hook Form
- [ ] Install Zod
- [ ] Configure form validation
- [ ] Install TanStack Query
- [ ] Configure query client
- [ ] Install Recharts
- [ ] Configure environment variables
- [ ] Create application layout
- [ ] Create navigation
- [ ] Create responsive layout
- [ ] Create dashboard shell
- [ ] Create reusable UI states
- [ ] Create toast/notification infrastructure

---

# Milestone 2 — PHP Backend Foundation

## Objective

Create a clean plain-PHP API foundation.

### Tasks

- [ ] Create PHP backend
- [ ] Configure Composer
- [ ] Configure PSR-4 autoloading
- [ ] Create public entry point
- [ ] Create routing layer
- [ ] Create request handling
- [ ] Create response handling
- [ ] Configure environment variables
- [ ] Configure CORS
- [ ] Create API error handling
- [ ] Create health endpoint
- [ ] Verify frontend-to-backend communication
- [ ] Add backend development documentation

---

# Milestone 3 — Google Authentication

## Objective

Implement secure Google authentication.

### Tasks

- [ ] Create/configure Google Cloud project
- [ ] Enable required Google APIs
- [ ] Configure OAuth consent
- [ ] Configure OAuth credentials
- [ ] Determine required OAuth scopes
- [ ] Implement Google OAuth authorization
- [ ] Implement OAuth callback
- [ ] Implement application session
- [ ] Implement authenticated user retrieval
- [ ] Implement logout
- [ ] Handle authentication errors
- [ ] Handle expired/revoked authorization
- [ ] Protect authenticated API routes
- [ ] Connect frontend authentication state
- [ ] Test authentication flow

### Security

- [ ] Keep Google secrets server-side
- [ ] Keep OAuth tokens server-side
- [ ] Configure secure environment variables
- [ ] Create `.env.example`
- [ ] Verify secrets are excluded from Git

---

# Milestone 4 — Google Sheets Infrastructure

## Objective

Create the Google Sheets persistence infrastructure.

### Tasks

- [ ] Configure Google Sheets API
- [ ] Implement Google client
- [ ] Implement Sheets service
- [ ] Define spreadsheet structure
- [ ] Define worksheet structure
- [ ] Implement spreadsheet access
- [ ] Implement worksheet access
- [ ] Implement row reading
- [ ] Implement row creation
- [ ] Implement row updates
- [ ] Implement row deletion
- [ ] Implement stable record ID handling
- [ ] Handle Google API errors
- [ ] Test Sheets integration

---

# Milestone 5 — Blood Pressure Backend

## Objective

Implement the Blood Pressure domain and API.

### Tasks

- [ ] Finalize Blood Pressure data model
- [ ] Define validation rules
- [ ] Implement Blood Pressure repository
- [ ] Implement Blood Pressure service
- [ ] Implement Blood Pressure controller
- [ ] Implement create endpoint
- [ ] Implement list endpoint
- [ ] Implement single-record endpoint
- [ ] Implement update endpoint
- [ ] Implement delete endpoint
- [ ] Implement ownership checks
- [ ] Implement validation errors
- [ ] Test CRUD operations

---

# Milestone 6 — Blood Pressure Frontend

## Objective

Create the Blood Pressure user interface.

### Tasks

- [ ] Create Blood Pressure feature structure
- [ ] Create Blood Pressure page
- [ ] Create entry form
- [ ] Create validation
- [ ] Create records table
- [ ] Create edit functionality
- [ ] Create delete functionality
- [ ] Add loading states
- [ ] Add error states
- [ ] Add empty state
- [ ] Add confirmation behavior
- [ ] Add toast notifications
- [ ] Connect React Query
- [ ] Test user interactions

---

# Milestone 7 — Dashboard

## Objective

Create a useful health dashboard.

### Tasks

- [ ] Latest blood pressure reading
- [ ] Recent readings
- [ ] Blood pressure summary
- [ ] Trend information
- [ ] Blood pressure chart
- [ ] Responsive dashboard
- [ ] Loading states
- [ ] Error states
- [ ] Empty states

---

# Milestone 8 — Testing

## Objective

Establish meaningful automated test coverage.

### Frontend

- [ ] Configure Vitest
- [ ] Configure React Testing Library
- [ ] Test forms
- [ ] Test validation
- [ ] Test API states
- [ ] Test important user interactions
- [ ] Test authentication UI

### Backend

- [ ] Configure PHPUnit
- [ ] Test validation
- [ ] Test services
- [ ] Test controllers
- [ ] Test authentication behavior
- [ ] Test API responses
- [ ] Test Blood Pressure CRUD
- [ ] Test Google integration boundaries

---

# Milestone 9 — Security & Hardening

## Objective

Review the complete application for security and reliability.

### Tasks

- [ ] Review authentication
- [ ] Review session handling
- [ ] Review authorization
- [ ] Review input validation
- [ ] Review CORS
- [ ] Review environment configuration
- [ ] Review secret handling
- [ ] Review API errors
- [ ] Review logging
- [ ] Review Google OAuth scopes
- [ ] Review Google Sheets permissions
- [ ] Review frontend security
- [ ] Review dependency versions

---

# Milestone 10 — Final Documentation & Portfolio Preparation

## Objective

Prepare the project for portfolio and technical interview use.

### Tasks

- [ ] Final README
- [ ] Final architecture documentation
- [ ] Final API documentation
- [ ] Final data model documentation
- [ ] Final Google Sheets documentation
- [ ] Setup instructions
- [ ] Environment configuration documentation
- [ ] Testing instructions
- [ ] Architecture review
- [ ] Code cleanup
- [ ] Git history review
- [ ] GitHub repository review
- [ ] Portfolio-ready screenshots/demo

---

# Development Process

Every milestone follows:

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
Next milestone
```
