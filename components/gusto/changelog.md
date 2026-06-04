## Changelog

### 2026-05-21

Added **Fetch All** input to list actions to retrieve all records across pages in a single call:
- **List Companies**
- **List Company Admins**
- **List Employees**
- **List Pay Schedules**
- **Get Webhook Events**

### 2026-05-05

Enhanced employee and webhook capabilities:
- Updated to Gusto API version 2026-02-01
- Added **Self Onboarding** and **Additional Fields** inputs to **Create Employee** action
- Made **Email** required on **Find Employee By Email** action
- Updated **Get Webhook Events** action to replace deprecated page/per pagination with **Resource UUID**, **Limit**, and **Sort Order** inputs

### 2026-04-07

Added trigger documentation

### 2026-03-31

Various modernizations and documentation updates

### 2026-03-16

Improved input field documentation with formatted URL links for better readability

### 2026-02-26

Added inline data sources for employees and pay schedules to enable dynamic dropdown selection

### 2025-07-16

Removed deprecated API token connection in favor of OAuth 2.0

### 2025-07-14

Added API version support for compatibility with latest Gusto API
