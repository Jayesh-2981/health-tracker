# Data Model

## 1. Overview

Health Tracker initially stores health records in the user's Google Sheet.

The application still defines an explicit logical data model.

The storage format must not become the application's domain model.

---

## 2. User

The authenticated application user is identified through Google authentication.

Conceptually:

```text
User
----
id
google_id
email
name
picture
created_at
last_login_at
```
