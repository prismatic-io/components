## Changelog

### 2026-11-09

Updated spectral to 10.39.1

### 2026-11-05

Updated spectral to 10.39.0

### 2026-11-04

Published the component as an npm package, so code-native integrations can install it and call its actions, triggers and data sources from code with TypeScript types

### 2026-11-02

Updated spectral to 10.34.1 and switched the build from webpack to tsdown:
- tsdown 0.22.3

### 2026-09-01

Restructured action inputs into structured objects for an improved user experience.

- **Create Form** groups its optional form-body inputs into **Additional Fields**
- **Create or Update Webhook** groups its destination and response-event inputs into **Delivery Settings**
- List actions (**List Forms**, **List Responses**, **List Workspaces**, **List Account Workspaces**) group their paging and search inputs into **Pagination**, where **List Forms** also holds its sort controls; **Fetch All** stays a top-level toggle

### 2026-04-30

Updated spectral version

### 2026-04-07

Various modernizations and documentation updates

### 2026-02-26

Added inline data source for responses to enable dynamic dropdown selection

### 2025-10-02

Added inline data sources for forms, workspaces, and account workspaces to enhance data selection capabilities
