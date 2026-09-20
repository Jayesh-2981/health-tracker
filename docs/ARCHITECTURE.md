# Architecture

## 1. Overview

Health Tracker is a full-stack web application consisting of:

- React frontend
- PHP backend
- Google OAuth authentication
- Google Sheets persistence

The backend acts as the security and integration boundary between the browser and Google APIs.

---

## 2. High-Level Architecture

```text
+----------------------+
|       Browser        |
|                      |
|   React Application  |
+----------+-----------+
           |
           | HTTP / JSON
           |
           v
+----------------------+
|      PHP API         |
|                      |
| Controllers          |
| Services             |
| Middleware           |
| Repositories         |
+----------+-----------+
           |
           |
     +-----+------+
     |            |
     v            v
Authentication  Health Services
     |            |
     |            v
     |       Google Service
     |            |
     +-----+------+
           |
           v
+----------------------+
|    Google APIs       |
|                      |
| OAuth                |
| Google Sheets API    |
+----------+-----------+
           |
           v
+----------------------+
| User's Google Sheet  |
+----------------------+
```
