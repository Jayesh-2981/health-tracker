# Health Tracker — Google Sheets Integration

## 1. Purpose

This document defines how Health Tracker integrates with Google OAuth and Google Sheets.

Google Sheets is the initial persistence layer for user health records.

The integration must keep Google-specific implementation details isolated from the application's health-tracking modules.

---

# 2. Integration Overview

The application uses two Google services:

1. Google OAuth 2.0
2. Google Sheets API

The high-level architecture is:

```text
User
 │
 ▼
React Frontend
 │
 ▼
Health Tracker Backend
 │
 ├──────────────► Google OAuth
 │
 └──────────────► Google Sheets API
                         │
                         ▼
                 User's Spreadsheet
```

The frontend must not directly communicate with Google Sheets APIs.

---

# 3. OAuth Responsibility

Google OAuth is handled by the backend.

The backend is responsible for:

- Starting the OAuth flow
- Handling the OAuth callback
- Validating the authentication result
- Managing authorized access
- Managing tokens securely
- Refreshing access when required
- Detecting revoked permissions
- Ending the application session

The frontend is responsible for:

- Initiating login
- Displaying authentication state
- Displaying Google connection state
- Handling user-facing authentication errors

---

# 4. Google Cloud Project

The application will use a dedicated Google Cloud project.

The Google Cloud project will eventually contain the required API configuration and OAuth credentials.

Required services will include the Google APIs needed for:

- Google authentication
- Google Sheets access

The exact Google Cloud configuration will be performed during the Google integration implementation milestone.

---

# 5. OAuth Consent

The application must clearly communicate to the user why Google permissions are required.

The user should understand that Health Tracker needs permission to work with their Google Sheets data.

The application should request only the permissions required for the functionality it provides.

Permissions should follow the principle of least privilege.

---

# 6. OAuth Scopes

The exact OAuth scopes will be selected during implementation based on the required Google APIs.

The application should request the minimum practical scope necessary to:

- Identify the authenticated user
- Create or access the Health Tracker spreadsheet
- Read health records
- Add health records
- Update health records
- Delete health records

Broad Google Drive access should not be requested unless it is genuinely required.

If a narrower Google API scope is sufficient, the narrower scope should be preferred.

---

# 7. User Identity

The application needs a reliable way to associate an authenticated user with their Health Tracker resources.

Conceptually:

```text
Google Account
      │
      ▼
Authenticated Application User
      │
      ▼
Health Tracker Spreadsheet
      │
      ▼
Health Records
```

The application should use Google's stable user identity information rather than relying on the user's email address as the primary internal identifier.

---

# 8. Spreadsheet Ownership

Each application user should have their own Health Tracker spreadsheet.

Conceptually:

```text
User A
  │
  └── Health Tracker spreadsheet A

User B
  │
  └── Health Tracker spreadsheet B

User C
  │
  └── Health Tracker spreadsheet C
```

A user's health records must never be written into another user's spreadsheet.

---

# 9. Spreadsheet Creation

When the user connects Google for the first time, the application should ensure that a Health Tracker spreadsheet exists.

Preferred flow:

```text
User connects Google
        │
        ▼
Backend verifies authorization
        │
        ▼
Check for Health Tracker spreadsheet
        │
        ├── Exists ───────► Use existing spreadsheet
        │
        └── Does not exist
                         │
                         ▼
                 Create spreadsheet
                         │
                         ▼
                  Create required
                  worksheets
```

Initially the spreadsheet should contain:

```text
Health Tracker
└── Blood Pressure
```

Additional worksheets will be created when additional health modules are introduced.

---

# 10. Spreadsheet Naming

The default spreadsheet name should be:

```text
Health Tracker
```

The application should not assume that the user has manually created a spreadsheet with this name.

The application should maintain the spreadsheet ID rather than relying only on the spreadsheet name.

---

# 11. Spreadsheet ID

The spreadsheet ID is the stable reference used by the Google Sheets API.

The application must not repeatedly search for the spreadsheet by name when the spreadsheet ID is already known.

Conceptually:

```text
Authenticated User
       │
       ▼
Spreadsheet ID
       │
       ▼
Google Sheets API
```

The spreadsheet ID should be treated as application configuration/data rather than a value supplied by the frontend.

---

# 12. Worksheet Structure

The initial spreadsheet will contain:

```text
Health Tracker
│
└── Blood Pressure
```

The Blood Pressure worksheet will use the following columns:

```text
A: ID
B: Recorded At
C: Systolic
D: Diastolic
E: Pulse
F: Notes
G: Created At
H: Updated At
```

Example:

| ID     | Recorded At               | Systolic | Diastolic | Pulse | Notes           | Created At                | Updated At                |
| ------ | ------------------------- | -------: | --------: | ----: | --------------- | ------------------------- | ------------------------- |
| bp_001 | 2026-09-10T08:30:00+05:30 |      120 |        80 |    72 | Morning reading | 2026-09-10T08:31:15+05:30 | 2026-09-10T08:31:15+05:30 |

---

# 13. Header Management

The application should ensure that the expected headers exist before writing Blood Pressure records.

Expected headers:

```text
ID
Recorded At
Systolic
Diastolic
Pulse
Notes
Created At
Updated At
```

Header creation and validation should be handled by the Google Sheets integration layer.

The Blood Pressure domain should not contain spreadsheet-column logic.

---

# 14. Application Record to Spreadsheet Row

The application-level record:

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

maps to:

```text
A → bp_001
B → 2026-09-10T08:30:00+05:30
C → 120
D → 80
E → 72
F → Morning reading
G → 2026-09-10T08:31:15+05:30
H → 2026-09-10T08:31:15+05:30
```

This mapping belongs inside the Google Sheets service.

---

# 15. Stable Record IDs

The application must generate a unique ID for every health record.

The spreadsheet row number must never be treated as the permanent record ID.

For example:

```text
Row 2 → bp_001
Row 3 → bp_002
Row 4 → bp_003
```

If `bp_002` is deleted:

```text
Row 2 → bp_001
Row 3 → bp_003
```

The identity of `bp_003` remains unchanged.

---

# 16. Create Record

Creating a Blood Pressure record follows:

```text
React Form
    │
    ▼
POST /api/v1/blood-pressure
    │
    ▼
Backend validation
    │
    ▼
BloodPressureService
    │
    ├── Generate record ID
    ├── Generate createdAt
    └── Generate updatedAt
    │
    ▼
GoogleSheetsService
    │
    ▼
Append row
    │
    ▼
Google Sheets
```

The Google Sheets service should append the new record to the Blood Pressure worksheet.

---

# 17. Read Records

Reading records follows:

```text
React
  │
  ▼
GET /api/v1/blood-pressure
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
Spreadsheet rows
  │
  ▼
Map rows to application objects
  │
  ▼
BloodPressureService
  │
  ▼
API response
```

The frontend receives application-level records.

It should not receive raw Google Sheets row structures.

---

# 18. Find Record by ID

For:

```text
GET /api/v1/blood-pressure/:id
```

the application must locate the record using its stable ID.

Conceptually:

```text
bp_001
   │
   ▼
Find matching ID in Blood Pressure worksheet
   │
   ▼
Corresponding spreadsheet row
   │
   ▼
Application record
```

The spreadsheet row number may be used internally to perform the Google Sheets update/delete operation, but it must not become the record's public identity.

---

# 19. Update Record

Updating a record follows:

```text
React
  │
  ▼
PUT /api/v1/blood-pressure/:id
  │
  ▼
BloodPressureService
  │
  ▼
GoogleSheetsService
  │
  ▼
Find record ID
  │
  ▼
Determine spreadsheet row
  │
  ▼
Update row
  │
  ▼
Google Sheets
```

The update operation must:

- Preserve `id`
- Preserve `createdAt`
- Update editable fields
- Update `updatedAt`

---

# 20. Delete Record

Deleting a record follows:

```text
React
  │
  ▼
DELETE /api/v1/blood-pressure/:id
  │
  ▼
BloodPressureService
  │
  ▼
GoogleSheetsService
  │
  ▼
Find record ID
  │
  ▼
Determine spreadsheet row
  │
  ▼
Delete row
  │
  ▼
Google Sheets
```

The application must not simply delete an arbitrary row based on a client-provided row number.

---

# 21. GoogleSheetsService

Google Sheets functionality should be isolated behind a dedicated service.

Conceptual responsibilities include:

```text
GoogleSheetsService

- createSpreadsheet()
- ensureWorksheet()
- ensureHeaders()
- appendRow()
- getRows()
- findRowById()
- updateRow()
- deleteRow()
```

The exact method signatures will be determined during implementation.

---

# 22. Separation from Health Modules

The Blood Pressure service should not know Google Sheets API implementation details.

Incorrect:

```text
BloodPressureService
    ↓
Google Sheets API directly
```

Preferred:

```text
BloodPressureService
    ↓
GoogleSheetsService
    ↓
Google Sheets API
```

This keeps domain logic separate from infrastructure logic.

---

# 23. Token Security

OAuth credentials and tokens are sensitive.

The application must:

- Never expose refresh tokens to the frontend
- Never commit tokens to Git
- Never log tokens
- Never place secrets in source code
- Store secrets through secure environment/configuration mechanisms
- Use HTTPS in production

The exact token-storage strategy will be selected during authentication implementation.

---

# 24. Environment Variables

Sensitive Google configuration will use environment variables.

Conceptual examples:

```text
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_REDIRECT_URI=
```

Additional variables may be required depending on the final authentication architecture.

A safe example configuration should be documented in:

```text
.env.example
```

Real `.env` files must not be committed.

---

# 25. Permission Revocation

The user may revoke Google access outside the application.

The backend must handle this situation gracefully.

Possible flow:

```text
API request
    │
    ▼
Google API
    │
    ▼
Authorization failure
    │
    ▼
Backend detects invalid authorization
    │
    ▼
Application marks Google connection unavailable
    │
    ▼
Frontend asks user to reconnect
```

The user should receive a clear message rather than an unexplained server error.

---

# 26. Spreadsheet Deleted by User

The user may manually delete the Health Tracker spreadsheet.

The application must not assume the spreadsheet always exists.

If the stored spreadsheet ID is no longer valid:

```text
API request
    │
    ▼
Spreadsheet not found
    │
    ▼
Application detects missing resource
    │
    ▼
Offer/re-run spreadsheet setup
```

The recovery strategy will be implemented during the Google integration milestone.

---

# 27. User-Owned Data

The application should minimize ownership of user health data.

The intended storage model is:

```text
User
  │
  ▼
Google Account
  │
  ▼
User-owned Google Spreadsheet
  │
  ▼
Health records
```

The application's backend acts as an authorized intermediary rather than becoming the primary long-term owner of the health records.

---

# 28. Concurrency Considerations

Google Sheets is not a traditional database.

The application must therefore avoid assumptions common to relational databases.

Potential issues include:

- Multiple requests occurring close together
- Users manually editing the spreadsheet
- Rows being inserted or deleted manually
- Spreadsheet structure being changed by the user
- Concurrent updates

The stable record ID helps protect record identity.

The application should also validate expected worksheet structure before performing critical operations.

More advanced concurrency handling will be introduced only if actual requirements justify it.

---

# 29. Manual Spreadsheet Editing

Users technically own and can modify their spreadsheet.

The application should therefore assume that spreadsheet data may be changed outside Health Tracker.

The Google Sheets integration should handle malformed or unexpected rows gracefully.

The application should not crash because a user manually changed an unrelated spreadsheet value.

---

# 30. Spreadsheet as a User Feature

The spreadsheet is not only a backend implementation detail.

One advantage of this architecture is that users retain direct access to their own health data.

They can potentially:

- View their records in Google Sheets
- Export their data
- Analyze their data independently
- Create their own charts
- Keep their own copy

Health Tracker should therefore avoid making the spreadsheet unnecessarily difficult to understand.

---

# 31. Future Health Modules

When a new tracker is introduced, the application may create a corresponding worksheet.

Example:

```text
Health Tracker
│
├── Blood Pressure
├── Weight
├── Blood Sugar
└── Heart Rate
```

Each worksheet should have a documented schema.

The Google Sheets service should provide reusable infrastructure while the health modules define their own data mapping.

---

# 32. Storage Abstraction

Although Google Sheets is the initial persistence layer, the application should avoid coupling the domain model directly to Google Sheets.

Conceptually:

```text
Domain
  │
  ▼
Persistence abstraction
  │
  ▼
Google Sheets implementation
```

A future implementation could potentially use:

```text
PostgreSQL
```

without requiring the frontend or health-domain logic to be completely rewritten.

This is a long-term architectural possibility, not a requirement for the initial implementation.

---

# 33. API Rate Limits and External Failures

Google APIs may impose rate limits or experience temporary failures.

The backend should:

- Detect external API failures
- Avoid leaking Google-specific errors to users
- Return meaningful application errors
- Retry only when appropriate
- Avoid uncontrolled retry loops

Retry behavior will be implemented only where justified by the specific API operation.

---

# 34. Logging

Google API credentials, access tokens, refresh tokens, and sensitive health records must not be written to normal application logs.

Logs should contain enough information to diagnose technical problems without unnecessarily exposing user data.

Example:

```text
Good:
Google Sheets request failed for authenticated user.

Bad:
Google access token: ...
Blood Pressure: 180/110
```

---

# 35. Security and Privacy Principle

Health Tracker handles sensitive personal health information.

The application should follow these principles:

1. Minimize stored information
2. Request minimal Google permissions
3. Keep secrets on the backend
4. Protect authenticated endpoints
5. Enforce authorization server-side
6. Avoid unnecessary health-data logging
7. Clearly communicate Google permissions
8. Allow users to retain ownership of their data

---

# 36. Current Scope

The initial Google integration will support:

- Google authentication
- Google authorization
- Health Tracker spreadsheet setup
- Blood Pressure worksheet
- Create Blood Pressure record
- Read Blood Pressure records
- Update Blood Pressure record
- Delete Blood Pressure record

The following are intentionally deferred until needed:

- Multiple Google accounts per application user
- Multiple Health Tracker spreadsheets
- Complex spreadsheet synchronization
- Offline synchronization
- Advanced conflict resolution
- Automated spreadsheet backups
- Multi-user/shared health records

---

# 37. Integration Philosophy

Google Sheets is intentionally being used as the user's data store.

The application should therefore treat Google Sheets as an external, user-owned resource rather than pretending it behaves exactly like a traditional database.

The architecture should isolate its limitations while preserving the benefits of user-owned data.

The goal is to provide a reliable application experience while allowing users to retain direct access to their underlying health records.
