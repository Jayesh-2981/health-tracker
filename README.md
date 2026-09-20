# Health Tracker

Health Tracker is a web application for recording, managing, and visualizing personal health data.

The project is being built as a portfolio-quality full-stack application using React on the frontend and plain PHP on the backend.

## Project Goal

The initial goal is to build a Blood Pressure tracker that allows an authenticated user to:

- Sign in using Google
- Connect the application to their Google account
- Store health records in their own Google Sheet
- Create blood pressure records
- View blood pressure records
- Edit blood pressure records
- Delete blood pressure records
- Visualize blood pressure trends
- View useful information on a dashboard

The architecture will be designed so additional health trackers can be added later without rewriting the application's core architecture.

## Initial Health Module

The first health module is:

- Blood Pressure

Future modules may include:

- Weight
- Blood Sugar
- Heart Rate
- Temperature
- Other health measurements

## Technology Stack

### Frontend

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

### Backend

- PHP
- XAMPP
- Composer
- REST-style API
- Native PHP sessions

### Authentication

- Google OAuth 2.0

### Data Storage

- Google Sheets API
- User-owned Google Spreadsheet

The initial version of the application does not require an application database.

### Testing

Frontend:

- Vitest
- React Testing Library

Backend:

- PHPUnit

### Version Control

- Git
- GitHub

## Architecture

The application follows this high-level flow:

```text
Browser
   |
   v
React Frontend
   |
   | HTTP / JSON
   v
PHP REST API
   |
   +--------------------+
   |                    |
   v                    v
Authentication       Health Services
   |                    |
   |                    v
   |              Google Sheets Service
   |                    |
   +----------+---------+
              |
              v
        Google APIs
              |
              v
      User's Google Sheet
```
