# Google Sheets Integration

## 1. Purpose

Google Sheets is the initial persistence layer for Health Tracker.

Each user should be able to store their health data in a spreadsheet associated with their own Google account.

---

## 2. High-Level Flow

```text
User
 |
 v
React
 |
 v
PHP API
 |
 v
Google OAuth
 |
 v
Google Account
 |
 v
Google Sheets API
 |
 v
User's Spreadsheet
```
