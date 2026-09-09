# Health Tracker — Development Rules

## 1. Purpose

These rules define the development standards, architectural principles, and coding practices for the Health Tracker application.

The project is intended to be a production-quality portfolio application demonstrating modern frontend and backend development practices.

The application will grow continuously as new health-tracking modules are added.

---

## 2. Core Development Principles

### 2.1 Build for maintainability

Code should be easy to:

- Read
- Understand
- Test
- Modify
- Extend

We prefer simple, explicit solutions over unnecessary abstraction.

### 2.2 Build incrementally

Development will follow a milestone-based approach:

1. Plan
2. Implement
3. Test
4. Review
5. Document
6. Commit
7. Push to GitHub
8. Continue to the next milestone

Each milestone should leave the project in a working state.

### 2.3 Do not over-engineer

New libraries, abstractions, services, patterns, and infrastructure should only be introduced when they solve a real problem.

Avoid adding technology simply because it is popular.

---

## 3. Frontend Rules

### 3.1 Framework

The frontend will use React with Vite.

### 3.2 Components

Use functional React components.

Components should have a clear responsibility.

Avoid creating unnecessarily large components.

### 3.3 UI

React Bootstrap will be the primary UI component library.

Reusable UI components should be created when the same behavior or presentation is needed in multiple places.

### 3.4 API communication

API calls should not be scattered throughout UI components.

API communication should be organized through dedicated service/API modules.

### 3.5 State management

Use the simplest appropriate state-management solution.

Local component state should be preferred for local UI state.

Server state should be handled separately from UI state.

Do not introduce global state management unless there is a demonstrated requirement for it.

### 3.6 Forms

Forms should have:

- Clear validation
- User-friendly error messages
- Loading states
- Success states
- Failure states

### 3.7 Accessibility

UI components should follow reasonable accessibility practices.

Interactive elements should be keyboard accessible and have appropriate labels.

---

## 4. Backend Rules

### 4.1 Technology

The backend will use Node.js, Express.js, and TypeScript.

### 4.2 API design

The backend will expose RESTful APIs.

API routes should use consistent naming and response structures.

API versioning will be used where appropriate.

Example:

`/api/v1/blood-pressure`

### 4.3 Separation of responsibilities

Routes, controllers, services, validation, and external integrations should have separate responsibilities.

Controllers should remain thin.

Business logic belongs in services rather than route handlers.

### 4.4 Validation

All externally supplied data must be validated on the backend.

Frontend validation improves user experience but must never be treated as a security boundary.

### 4.5 Error handling

Errors should be handled consistently.

The API should return useful error responses without exposing sensitive implementation details.

---

## 5. Health Module Rules

Each health-tracking feature should be designed as an independent module.

Examples:

- Blood Pressure
- Weight
- Blood Sugar
- Heart Rate
- Temperature
- SpO₂

The Blood Pressure module will be implemented first.

Adding a new health tracker should not require unnecessary changes to existing modules.

Each module should have clearly separated:

- Data model
- Validation
- Business logic
- API routes
- Controller
- Frontend UI
- API integration

---

## 6. Google Sheets Rules

Google Sheets is the primary storage mechanism for health records.

The frontend must never communicate directly with Google APIs using application secrets.

Google OAuth and Google Sheets API operations must be handled by the backend.

Sensitive credentials and tokens must never be committed to Git.

Google API functionality should be isolated behind dedicated services.

Health modules should not contain Google Sheets implementation details.

For example:

`BloodPressureService → GoogleSheetsService → Google Sheets API`

rather than:

`BloodPressureComponent → Google Sheets API`

---

## 7. Authentication and Authorization

Authentication and authorization must be treated separately.

Authentication determines who the user is.

Authorization determines what resources the user has granted the application permission to access.

Google OAuth credentials and tokens must be securely handled by the backend.

The application must never expose client secrets, refresh tokens, or other sensitive credentials to the frontend.

---

## 8. Security Rules

Never commit secrets to the repository.

Sensitive configuration must use environment variables.

An `.env.example` file should document required environment variables without containing real secrets.

The application should use appropriate security measures including:

- Input validation
- Secure authentication
- HTTP security headers
- Appropriate CORS configuration
- Rate limiting where appropriate
- Secure cookie/session configuration
- Safe error handling
- Dependency updates

Security decisions should be based on the actual application architecture rather than blindly adding security libraries.

---

## 9. Data Integrity

Health records must be validated before being stored.

The application should preserve the integrity of existing records during update and delete operations.

Each record should have a stable identifier.

Dates and times should be handled consistently throughout the application.

---

## 10. Testing Rules

Important business logic must be testable.

Tests should cover:

- Valid input
- Invalid input
- API success cases
- API failure cases
- CRUD operations
- Authentication behavior
- Google Sheets integration behavior where practical

Tests should be added as features are implemented rather than postponed until the end of the project.

---

## 11. Git Rules

Git should be used throughout development.

Commits should represent meaningful milestones or logical changes.

Avoid large commits containing unrelated changes.

Commit messages should clearly describe the change.

Preferred format:

`type: short description`

Examples:

- `docs: add project development rules`
- `feat: add blood pressure form`
- `feat: add blood pressure CRUD API`
- `fix: handle invalid blood pressure input`
- `test: add blood pressure service tests`
- `refactor: extract Google Sheets service`

The `main` branch should remain in a working state.

---

## 12. Documentation Rules

Important architectural and development decisions should be documented.

Documentation should be updated when the corresponding implementation changes.

The following documentation will be maintained as the project evolves:

- `README.md`
- `docs/RULES.md`
- `docs/ARCHITECTURE.md`
- `docs/DATA-MODEL.md`
- `docs/API.md`
- `docs/GOOGLE-SHEETS.md`
- `docs/ROADMAP.md`

Documentation should explain decisions and behavior rather than simply repeating code.

---

## 13. Code Quality

Prefer:

- Clear names
- Small functions
- Small focused components
- Explicit dependencies
- Consistent formatting
- Reusable logic
- Meaningful error handling

Avoid:

- Magic values
- Duplicate business logic
- Extremely large files
- Unnecessary abstractions
- Deeply coupled modules
- Copy-pasted logic
- Unused dependencies

---

## 14. Definition of Done

A feature is considered complete when:

- The implementation works
- Input is validated
- Error states are handled
- Loading states are handled where applicable
- Tests are added where appropriate
- Documentation is updated
- The code has been reviewed
- The application remains runnable
- Changes are committed to Git
- The milestone is pushed to GitHub

---

## 15. Project Philosophy

Health Tracker is not being developed as a collection of disconnected features.

Each feature should contribute to a coherent, maintainable application architecture.

The first Blood Pressure tracker will establish patterns that can be reused by future health-tracking modules.

The goal is to continuously improve the application while keeping the codebase understandable, testable, secure, and production-oriented.
