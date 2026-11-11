## Changelog

### 2026-11-11

Updated the component description to better summarize what the component does

### 2026-11-10

Refactored internal code

### 2026-11-09

Updated spectral to 10.39.1

### 2026-11-05

Updated spectral to 10.39.0

### 2026-11-04

Published the component as an npm package, so code-native integrations can install it and call its actions, triggers and data sources from code with TypeScript types

### 2026-11-03

Updated spectral to 10.34.1

### 2026-10-20

- Added batching to the **New Records** trigger; enabling it changes the shape a downstream step receives
- Updated the **Poll Changes** trigger label to **New Records**

### 2026-05-21

Added **Fetch All** toggle input to all list actions (List Employees, List Terminated Employees, List Positions, List Teams, List Documents, List Projects, List Time Off Requests) to automatically paginate through and return every record in a single execution

### 2026-05-20

Applied automated security patches and code formatting updates

### 2026-04-30

Updated spectral version

### 2026-04-21

Added **New Records** polling trigger that checks for new employees, time-off requests, teams, and positions in Sage HR on a configured schedule, using ID-based change detection

### 2026-04-10

Updated example payloads

### 2026-04-07

Added global debug support across all actions for improved troubleshooting

### 2026-03-05

Added inline data sources for employees and documents to enhance data selection capabilities
