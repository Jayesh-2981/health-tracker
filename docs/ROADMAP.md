# Health Tracker — Project Roadmap

## 1. Project Goal

Health Tracker is a continuously evolving health-tracking web application.

The project will begin with Blood Pressure tracking and will expand into additional health-tracking modules using the same core architecture.

The goal is to build a maintainable, secure, well-tested, production-oriented application rather than a collection of isolated demonstrations.

There are no artificial version boundaries.

Development proceeds through meaningful milestones.

---

# 2. Development Workflow

Every milestone follows this general process:

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
Git Commit
  ↓
GitHub Push
  ↓
Next Milestone
```

The `main` branch should remain in a working state.

---

# 3. Milestone 0 — Project Foundation

## Objective

Establish the project's documentation, development rules, architecture, and Git repository.

### Tasks

- [x] Create project directory
- [x] Initialize Git repository
- [x] Rename default branch to `main`
- [x] Create documentation directory
- [x] Create `README.md`
- [x] Create `RULES.md`
- [x] Create `ARCHITECTURE.md`
- [x] Create `DATA-MODEL.md`
- [x] Create `API.md`
- [x] Create `GOOGLE-SHEETS.md`
- [x] Complete `ROADMAP.md`
- [ ] Review project documentation
- [ ] Create initial Git commit
- [ ] Create GitHub repository
- [ ] Push project to GitHub

---

# 4. Milestone 1 — Application Infrastructure

## Objective

Create the frontend and backend application foundations.

### Frontend

- [ ] Initialize React application with Vite
- [ ] Configure React Bootstrap
- [ ] Configure Bootstrap
- [ ] Configure React Router
- [ ] Establish frontend folder structure
- [ ] Establish environment configuration
- [ ] Create application entry point
- [ ] Create base layout
- [ ] Create reusable UI foundations

### Backend

- [ ] Initialize Node.js project
- [ ] Configure TypeScript
- [ ] Install Express
- [ ] Establish backend folder structure
- [ ] Configure environment variables
- [ ] Create Express application
- [ ] Create server entry point
- [ ] Create health-check endpoint
- [ ] Configure basic error handling
- [ ] Configure CORS appropriately
- [ ] Configure security middleware

### Integration

- [ ] Connect frontend to backend
- [ ] Verify local API communication
- [ ] Establish development scripts
- [ ] Document local development process

---

# 5. Milestone 2 — Frontend Application Shell

## Objective

Create the application's visual foundation before implementing health-specific functionality.

### Tasks

- [ ] Create application layout
- [ ] Create navigation
- [ ] Create sidebar/navigation menu
- [ ] Create responsive layout
- [ ] Create dashboard shell
- [ ] Create authentication page shell
- [ ] Create loading state components
- [ ] Create error state components
- [ ] Create empty state components
- [ ] Configure notification/toast behavior
- [ ] Establish reusable Bootstrap-based UI patterns

The application should be usable for navigation even before the health-tracking functionality is complete.

---

# 6. Milestone 3 — Google Authentication

## Objective

Implement secure Google authentication.

### Tasks

- [ ] Create/configure Google Cloud project
- [ ] Configure required Google APIs
- [ ] Configure OAuth consent screen
- [ ] Configure OAuth credentials
- [ ] Determine required OAuth scopes
- [ ] Implement backend OAuth flow
- [ ] Implement authentication callback
- [ ] Establish application session strategy
- [ ] Implement authenticated user retrieval
- [ ] Implement logout
- [ ] Handle authentication errors
- [ ] Handle expired/revoked authorization
- [ ] Protect authenticated API routes
- [ ] Connect frontend authentication state to backend

### Security

- [ ] Keep Google secrets server-side
- [ ] Keep tokens server-side
- [ ] Add environment configuration
- [ ] Create `.env.example`
- [ ] Verify secrets are excluded from Git

---

# 7. Milestone 4 — Google Sheets Infrastructure

## Objective

Create the reusable Google Sheets integration layer.

### Tasks

- [ ] Create Google Sheets service
- [ ] Implement spreadsheet creation
- [ ] Implement spreadsheet identification
- [ ] Implement worksheet creation
- [ ] Implement header creation
- [ ] Implement header validation
- [ ] Implement row retrieval
- [ ] Implement row insertion
- [ ] Implement record lookup
- [ ] Implement row update
- [ ] Implement row deletion
- [ ] Implement spreadsheet-not-found handling
- [ ] Implement permission error handling
- [ ] Implement external API error handling

### Architecture

The service should expose reusable infrastructure rather than Blood Pressure-specific logic.

Example:

```text
Health Module
      ↓
GoogleSheetsService
      ↓
Google Sheets API
```

---

# 8. Milestone 5 — Blood Pressure Domain

## Objective

Create the first complete health-tracking module.

### Data

- [ ] Finalize Blood Pressure data model
- [ ] Implement TypeScript types
- [ ] Implement validation schema
- [ ] Implement record ID generation
- [ ] Implement date/time handling

### Backend

- [ ] Create Blood Pressure module
- [ ] Create service
- [ ] Create controller
- [ ] Create routes
- [ ] Implement create operation
- [ ] Implement list operation
- [ ] Implement single-record operation
- [ ] Implement update operation
- [ ] Implement delete operation
- [ ] Implement error handling
- [ ] Connect module to Google Sheets service

### API

- [ ] `POST /api/v1/blood-pressure`
- [ ] `GET /api/v1/blood-pressure`
- [ ] `GET /api/v1/blood-pressure/:id`
- [ ] `PUT /api/v1/blood-pressure/:id`
- [ ] `DELETE /api/v1/blood-pressure/:id`

---

# 9. Milestone 6 — Blood Pressure Frontend

## Objective

Create the complete Blood Pressure user experience.

### Pages

- [ ] Blood Pressure overview
- [ ] Add Blood Pressure reading
- [ ] Edit Blood Pressure reading
- [ ] View reading details where useful

### Components

- [ ] Blood Pressure form
- [ ] Blood Pressure table/list
- [ ] Record row
- [ ] Delete confirmation
- [ ] Latest reading card
- [ ] Empty state
- [ ] Loading state
- [ ] Error state

### API Integration

- [ ] Create API client
- [ ] Integrate TanStack Query
- [ ] Implement create mutation
- [ ] Implement update mutation
- [ ] Implement delete mutation
- [ ] Implement record retrieval
- [ ] Handle cache invalidation
- [ ] Handle API errors

---

# 10. Milestone 7 — Blood Pressure Dashboard

## Objective

Turn the Blood Pressure module into a useful health-tracking experience.

### Features

- [ ] Latest Blood Pressure reading
- [ ] Latest pulse
- [ ] Total number of readings
- [ ] Recent readings
- [ ] Blood Pressure trend chart
- [ ] Pulse trend where appropriate
- [ ] Date-based filtering
- [ ] Useful summary information

### UX

- [ ] Responsive dashboard
- [ ] Clear visual hierarchy
- [ ] Accessible charts
- [ ] Clear empty states
- [ ] Clear error handling

The application should present recorded information without making unsupported medical diagnoses.

---

# 11. Milestone 8 — Blood Pressure Testing

## Objective

Establish reliable automated tests around the first complete module.

### Frontend

- [ ] Form validation tests
- [ ] Component tests
- [ ] API interaction tests
- [ ] Loading-state tests
- [ ] Error-state tests

### Backend

- [ ] Validation tests
- [ ] Service tests
- [ ] Controller tests
- [ ] API endpoint tests
- [ ] Error handling tests
- [ ] Authorization tests

### Integration

- [ ] Google Sheets service tests where practical
- [ ] External API behavior mocking
- [ ] CRUD workflow tests

---

# 12. Milestone 9 — Security and Reliability Review

## Objective

Review the application as a real production system rather than only a functional demo.

### Security

- [ ] Review OAuth implementation
- [ ] Review token handling
- [ ] Review authorization
- [ ] Review CORS
- [ ] Review HTTP security headers
- [ ] Review rate limiting
- [ ] Review input validation
- [ ] Review error responses
- [ ] Review environment variables
- [ ] Review dependency vulnerabilities

### Reliability

- [ ] Review Google API failure handling
- [ ] Review revoked permissions
- [ ] Review deleted spreadsheet behavior
- [ ] Review malformed spreadsheet data
- [ ] Review concurrent requests
- [ ] Review loading/error states

---

# 13. Milestone 10 — Additional Health Tracker Architecture

## Objective

Validate that the architecture can support additional health modules without unnecessary redesign.

Before implementing the next tracker:

- [ ] Review Blood Pressure module
- [ ] Identify reusable infrastructure
- [ ] Identify duplicated logic
- [ ] Refactor only where justified
- [ ] Update architecture documentation
- [ ] Define next health module data model
- [ ] Define next module API

Possible future modules:

```text
Weight
Blood Sugar
Heart Rate
Temperature
SpO₂
Sleep
Medication
```

The next module will be selected based on project priorities.

---

# 14. Milestone 11 — Weight Tracker

## Objective

Add Weight tracking using the established architecture.

### Tasks

- [ ] Define Weight data model
- [ ] Define Google Sheets structure
- [ ] Define API
- [ ] Implement backend module
- [ ] Implement CRUD
- [ ] Implement frontend UI
- [ ] Add charts/summary where appropriate
- [ ] Add tests
- [ ] Update documentation
- [ ] Commit and push

---

# 15. Milestone 12 — Additional Health Modules

Future modules will follow the same general process:

```text
Define data model
      ↓
Define spreadsheet structure
      ↓
Define API
      ↓
Implement backend
      ↓
Implement frontend
      ↓
Add tests
      ↓
Review
      ↓
Document
      ↓
Commit
      ↓
Push
```

Potential modules include:

- Blood Sugar
- Heart Rate
- Temperature
- SpO₂
- Sleep
- Medication

Modules should only be added when they provide meaningful value to the application.

---

# 16. Milestone 13 — Application-Wide Improvements

As the application grows, continuously evaluate:

- [ ] Performance
- [ ] Accessibility
- [ ] Responsive design
- [ ] Code duplication
- [ ] API consistency
- [ ] Error handling
- [ ] Logging
- [ ] Security
- [ ] Testing coverage
- [ ] Developer experience
- [ ] Documentation

Refactoring should be driven by actual needs rather than performed for its own sake.

---

# 17. Milestone 14 — Production Preparation

## Objective

Prepare Health Tracker for public deployment.

### Frontend

- [ ] Production build
- [ ] Environment configuration
- [ ] Routing configuration
- [ ] Error handling
- [ ] Performance review

### Backend

- [ ] Production configuration
- [ ] Secure environment variables
- [ ] Logging
- [ ] Security middleware
- [ ] Rate limiting
- [ ] Error handling
- [ ] Health checks

### Google

- [ ] Production OAuth configuration
- [ ] Production redirect URIs
- [ ] Consent screen review
- [ ] Scope review
- [ ] API configuration review

### Deployment

- [ ] Select hosting platforms
- [ ] Deploy frontend
- [ ] Deploy backend
- [ ] Configure HTTPS
- [ ] Configure environment variables
- [ ] Verify Google OAuth in production
- [ ] Verify Google Sheets operations in production

---

# 18. Milestone 15 — Portfolio Quality Review

## Objective

Make the project strong enough to confidently present during job applications and technical interviews.

### Repository

- [ ] Clean README
- [ ] Architecture documentation
- [ ] API documentation
- [ ] Development instructions
- [ ] Environment setup instructions
- [ ] Meaningful Git history
- [ ] Useful commit messages
- [ ] No secrets or unnecessary files

### Application

- [ ] Professional UI
- [ ] Responsive design
- [ ] Good UX
- [ ] Proper loading states
- [ ] Proper error states
- [ ] Accessibility review
- [ ] Test coverage
- [ ] Security review

### Technical presentation

The project should allow discussion of:

- React architecture
- REST API design
- TypeScript
- Authentication
- OAuth 2.0
- Google APIs
- Google Sheets integration
- CRUD operations
- Validation
- State management
- Error handling
- Testing
- Security
- Git/GitHub workflow
- Deployment
- Architectural tradeoffs

---

# 19. GitHub Milestone Strategy

GitHub should reflect the actual development progression.

Commits should be small enough to understand but meaningful enough to represent completed work.

Examples:

```text
docs: establish project development rules
docs: define application architecture
docs: define health data model
docs: define API contract
docs: document Google Sheets integration
docs: establish project roadmap

chore: initialize frontend application
chore: initialize backend application
feat: add application shell
feat: implement Google authentication
feat: add Google Sheets service
feat: add blood pressure API
feat: add blood pressure CRUD UI
feat: add blood pressure dashboard
test: add blood pressure API tests
test: add blood pressure component tests
fix: handle revoked Google authorization
refactor: improve health module structure
```

---

# 20. Definition of a Milestone

A milestone is complete when its functionality is:

- Implemented
- Tested appropriately
- Reviewed
- Documented
- Working locally
- Committed to Git
- Pushed to GitHub

A partially implemented feature should not be marked complete.

---

# 21. Current Progress

```text
Milestone 0 — Project Foundation

[x] Project directory created
[x] Git initialized
[x] Main branch configured
[x] Documentation structure created
[x] RULES.md
[x] ARCHITECTURE.md
[x] DATA-MODEL.md
[x] API.md
[x] GOOGLE-SHEETS.md
[ ] ROADMAP.md
[ ] README.md
[ ] Initial Git commit
[ ] GitHub repository
```

Current focus:

```text
Complete Project Foundation
            ↓
Initial Git Commit
            ↓
GitHub Push
            ↓
Application Infrastructure
```

---

# 22. Guiding Principle

Health Tracker should continuously move toward a better application without sacrificing the stability of existing functionality.

Every new health tracker should strengthen the architecture rather than create another isolated implementation.

The project should remain understandable as it grows.

The goal is not to maximize the number of features.

The goal is to build a thoughtful, maintainable, secure, and genuinely useful health-tracking application.
