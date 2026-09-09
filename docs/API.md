# Health Tracker — API Specification

## 1. Purpose

This document defines the REST API contract for Health Tracker.

The API acts as the boundary between the React frontend and the backend application.

The frontend communicates with the Health Tracker backend.

The backend handles:

- Authentication
- Authorization
- Validation
- Business logic
- Google API communication
- Google Sheets persistence

The frontend must not communicate directly with Google Sheets APIs.

---

# 2. API Base URL

During local development:

```text
http://localhost:5000/api/v1
```

The exact backend port may change during project setup.

In production, the API base URL will be configured through environment variables.

The frontend must not hard-code environment-specific URLs.

---

# 3. API Versioning

The initial API namespace is:

```text
/api/v1
```

Example:

```text
/api/v1/blood-pressure
```

API versioning allows future breaking changes to be introduced without unexpectedly breaking existing clients.

---

# 4. Response Format

API responses should use JSON.

Successful responses should follow a consistent structure where practical.

Example:

```json
{
  "success": true,
  "data": {
    "id": "bp_001",
    "recordedAt": "2026-09-10T08:30:00+05:30",
    "systolic": 120,
    "diastolic": 80,
    "pulse": 72,
    "notes": "Morning reading",
    "createdAt": "2026-09-10T08:31:15+05:30",
    "updatedAt": "2026-09-10T08:31:15+05:30"
  }
}
```

For collection responses:

```json
{
  "success": true,
  "data": [
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
  ]
}
```

The exact pagination structure will be finalized when pagination becomes necessary.

---

# 5. Error Response

Errors should use a consistent structure.

Example:

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "The provided data is invalid.",
    "details": {
      "systolic": "Systolic value must be an integer."
    }
  }
}
```

The API must not expose:

- Stack traces
- Google OAuth secrets
- Access tokens
- Refresh tokens
- Internal infrastructure details
- Sensitive implementation information

in production error responses.

---

# 6. HTTP Status Codes

The API will use standard HTTP status codes.

| Status | Meaning                                      |
| -----: | -------------------------------------------- |
|    200 | Successful request                           |
|    201 | Resource successfully created                |
|    204 | Successful request with no response body     |
|    400 | Invalid request                              |
|    401 | Unauthenticated                              |
|    403 | Authenticated but not authorized             |
|    404 | Resource not found                           |
|    409 | Resource conflict                            |
|    422 | Semantically invalid input where appropriate |
|    429 | Too many requests                            |
|    500 | Unexpected server error                      |
|    502 | External service failure where appropriate   |
|    503 | Service temporarily unavailable              |

The exact status code used for a specific scenario should remain consistent throughout the API.

---

# 7. Authentication

Protected API endpoints require an authenticated user.

Authentication will use the application's server-managed authentication mechanism.

The frontend should not send Google access tokens to every business endpoint unless the final authentication architecture explicitly requires it.

The authentication implementation will be finalized during the authentication milestone.

---

# 8. Blood Pressure API

The initial API resource is:

```text
/api/v1/blood-pressure
```

Supported operations:

```text
POST   /blood-pressure
GET    /blood-pressure
GET    /blood-pressure/:id
PUT    /blood-pressure/:id
DELETE /blood-pressure/:id
```

---

# 9. Create Blood Pressure Record

## Endpoint

```text
POST /api/v1/blood-pressure
```

## Authentication

Required.

## Request Body

```json
{
  "recordedAt": "2026-09-10T08:30:00+05:30",
  "systolic": 120,
  "diastolic": 80,
  "pulse": 72,
  "notes": "Morning reading"
}
```

The client must not provide:

```text
id
createdAt
updatedAt
```

These values are controlled by the backend.

## Success Response

HTTP:

```text
201 Created
```

Example:

```json
{
  "success": true,
  "data": {
    "id": "bp_001",
    "recordedAt": "2026-09-10T08:30:00+05:30",
    "systolic": 120,
    "diastolic": 80,
    "pulse": 72,
    "notes": "Morning reading",
    "createdAt": "2026-09-10T08:31:15+05:30",
    "updatedAt": "2026-09-10T08:31:15+05:30"
  }
}
```

---

# 10. Get Blood Pressure Records

## Endpoint

```text
GET /api/v1/blood-pressure
```

## Authentication

Required.

## Default Behavior

Returns the authenticated user's Blood Pressure records.

Records should be returned with the newest measurement first.

Default sorting:

```text
recordedAt DESC
```

## Success Response

HTTP:

```text
200 OK
```

Example:

```json
{
  "success": true,
  "data": [
    {
      "id": "bp_002",
      "recordedAt": "2026-09-10T08:30:00+05:30",
      "systolic": 120,
      "diastolic": 80,
      "pulse": 72,
      "notes": "Morning reading",
      "createdAt": "2026-09-10T08:31:15+05:30",
      "updatedAt": "2026-09-10T08:31:15+05:30"
    },
    {
      "id": "bp_001",
      "recordedAt": "2026-09-09T21:15:00+05:30",
      "systolic": 128,
      "diastolic": 82,
      "pulse": 75,
      "notes": "Evening reading",
      "createdAt": "2026-09-09T21:16:20+05:30",
      "updatedAt": "2026-09-09T21:16:20+05:30"
    }
  ]
}
```

---

# 11. Get Single Blood Pressure Record

## Endpoint

```text
GET /api/v1/blood-pressure/:id
```

Example:

```text
GET /api/v1/blood-pressure/bp_001
```

## Authentication

Required.

## Success

HTTP:

```text
200 OK
```

Example:

```json
{
  "success": true,
  "data": {
    "id": "bp_001",
    "recordedAt": "2026-09-09T21:15:00+05:30",
    "systolic": 128,
    "diastolic": 82,
    "pulse": 75,
    "notes": "Evening reading",
    "createdAt": "2026-09-09T21:16:20+05:30",
    "updatedAt": "2026-09-09T21:16:20+05:30"
  }
}
```

If the record does not exist:

```text
404 Not Found
```

---

# 12. Update Blood Pressure Record

## Endpoint

```text
PUT /api/v1/blood-pressure/:id
```

Example:

```text
PUT /api/v1/blood-pressure/bp_001
```

## Authentication

Required.

## Request Body

```json
{
  "recordedAt": "2026-09-09T21:15:00+05:30",
  "systolic": 125,
  "diastolic": 80,
  "pulse": 74,
  "notes": "Updated reading"
}
```

The client must not modify:

```text
id
createdAt
updatedAt
```

The backend must:

1. Verify authentication
2. Verify authorization
3. Find the record
4. Validate the new data
5. Preserve the original ID
6. Preserve the original `createdAt`
7. Update `updatedAt`
8. Persist the changes
9. Return the updated record

## Success

HTTP:

```text
200 OK
```

---

# 13. Delete Blood Pressure Record

## Endpoint

```text
DELETE /api/v1/blood-pressure/:id
```

Example:

```text
DELETE /api/v1/blood-pressure/bp_001
```

## Authentication

Required.

## Behavior

The backend must:

1. Verify authentication
2. Verify authorization
3. Locate the record using its stable ID
4. Delete the corresponding record
5. Return a successful response

## Success

HTTP:

```text
204 No Content
```

No response body is required.

---

# 14. Blood Pressure Validation

The API must validate incoming Blood Pressure data.

Initial validation requirements:

### recordedAt

- Required
- Must be a valid date/time

### systolic

- Required
- Must be an integer

### diastolic

- Required
- Must be an integer

### pulse

- Optional
- If provided, must be an integer

### notes

- Optional
- Must be a string
- Should have a reasonable maximum length

The final domain-specific numeric constraints will be established during implementation.

The application should distinguish between:

```text
Data validation
```

and:

```text
Medical diagnosis
```

The API validates that a value is acceptable for storage and application behavior.

It does not independently diagnose a medical condition.

---

# 15. Query Parameters

The initial API will support simple retrieval.

Future query parameters may include:

```text
?from=
?to=
?sort=
?order=
?page=
?limit=
```

Example:

```text
GET /api/v1/blood-pressure?from=2026-09-01&to=2026-09-10
```

These will be implemented when the corresponding frontend functionality is introduced.

We should not implement unnecessary filtering and pagination before there is a real UI requirement.

---

# 16. Dashboard API

The dashboard may eventually require aggregated information.

Potential endpoint:

```text
GET /api/v1/dashboard
```

Potential response:

```json
{
  "success": true,
  "data": {
    "bloodPressure": {
      "latest": {},
      "average": {},
      "totalReadings": 20
    }
  }
}
```

This endpoint is intentionally not part of the initial implementation.

Dashboard requirements will be determined after the Blood Pressure CRUD workflow is complete.

---

# 17. Authentication Endpoints

Authentication-related endpoints will be defined separately during the authentication milestone.

Potential endpoints may include:

```text
GET /api/v1/auth/google
GET /api/v1/auth/google/callback
GET /api/v1/auth/me
POST /api/v1/auth/logout
```

The final endpoint structure depends on the selected authentication/session architecture.

This document should be updated when that architecture is finalized.

---

# 18. Google Connection Endpoints

Google Sheets connection endpoints will be defined during the Google integration milestone.

Potential responsibilities include:

```text
Connect Google account
Check Google connection
Create Health Tracker spreadsheet
Disconnect Google integration
```

The exact endpoints will be finalized once the OAuth flow and authorization model are implemented.

---

# 19. Authorization Model

All health records belong to the authenticated user.

For every Blood Pressure request:

```text
Authenticated User
        │
        ▼
User's Health Tracker resource
        │
        ▼
User's Google Spreadsheet
        │
        ▼
User's Blood Pressure records
```

A user must never be able to access another user's records by manipulating:

```text
record ID
URL parameters
query parameters
request body
```

Authorization must be enforced by the backend.

The frontend cannot be trusted to enforce authorization.

---

# 20. Google Sheets Errors

Google Sheets is an external dependency.

The backend must handle situations such as:

- Google API unavailable
- Authentication expired
- Permission revoked
- Spreadsheet deleted
- Worksheet deleted
- Rate limiting
- Invalid Google API response
- Network failure

The API should translate external failures into appropriate application-level errors.

The frontend should receive a meaningful error without exposing Google API implementation details.

---

# 21. API Service Separation

The frontend should communicate with API modules rather than embedding requests directly in pages.

Conceptually:

```text
BloodPressurePage
       │
       ▼
BloodPressure API Client
       │
       ▼
HTTP Client
       │
       ▼
Backend API
```

The backend follows:

```text
Route
  ↓
Controller
  ↓
Validation
  ↓
Service
  ↓
GoogleSheetsService
  ↓
Google Sheets API
```

---

# 22. API Client Responsibilities

The frontend API client should:

- Build requests
- Send authentication information
- Parse responses
- Handle HTTP-level failures
- Expose predictable functions to React features

Example conceptual interface:

```text
createBloodPressure()
getBloodPressureRecords()
getBloodPressureRecord()
updateBloodPressure()
deleteBloodPressure()
```

The UI should not need to know the underlying URL structure.

---

# 23. API Documentation Maintenance

Whenever an API endpoint changes:

1. Update this document
2. Update backend implementation
3. Update frontend API client
4. Update tests
5. Update related documentation

The API contract should remain synchronized with the implementation.

---

# 24. Initial API Scope

The first implemented API resource is Blood Pressure.

Required endpoints:

```text
POST   /api/v1/blood-pressure
GET    /api/v1/blood-pressure
GET    /api/v1/blood-pressure/:id
PUT    /api/v1/blood-pressure/:id
DELETE /api/v1/blood-pressure/:id
```

Authentication and Google integration will be implemented before these protected operations are considered complete.

Future health modules will follow the same general API conventions.

Examples:

```text
/api/v1/weight
/api/v1/blood-sugar
/api/v1/heart-rate
```

---

# 25. API Design Principles

The API should prioritize:

1. Consistency
2. Security
3. Predictability
4. Clear validation
5. Meaningful errors
6. Resource-oriented design
7. Separation of concerns
8. Extensibility

The API should remain simple unless application requirements justify additional complexity.
