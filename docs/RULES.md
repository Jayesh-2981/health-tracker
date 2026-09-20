# Development Rules

This document defines the development rules for the Health Tracker project.

The purpose is to keep the project maintainable, secure, understandable, and suitable as a portfolio project.

---

## 1. Architecture Rules

### 1.1 Frontend and backend responsibilities must remain separate

The React application is responsible for:

- User interface
- Client-side navigation
- Form interaction
- Client-side validation
- Displaying data
- Calling backend APIs
- Managing frontend application state

The PHP backend is responsible for:

- Authentication
- Authorization
- Server-side validation
- Business logic
- Google API communication
- Google OAuth token handling
- Data persistence operations
- API responses

---

## 2. Google API Rules

The frontend must never communicate directly with Google Sheets APIs.

The correct architecture is:

```text
React
  |
  v
PHP API
  |
  v
Google Service
  |
  v
Google Sheets API
```
