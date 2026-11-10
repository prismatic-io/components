## Changelog

### 2026-11-10

Refactored internal code

### 2026-11-09

Updated spectral to 10.39.1

### 2026-11-05

Updated spectral to 10.39.0

### 2026-11-03

Published the component as an npm package, so code-native integrations can install it and call its actions, triggers and data sources from code with TypeScript types

### 2026-11-02

Updated spectral to 10.34.1 and switched the build from webpack to tsdown:
- tsdown 0.22.3

### 2026-08-05

Various modernizations and documentation updates

### 2026-07-28

Updated the **Create Table** action to support on-demand (PAY_PER_REQUEST) billing mode by making provisioned capacity inputs optional

### 2026-05-28

Various modernizations and documentation updates

### 2026-05-05

Updated `found` flag accuracy across actions:
- **Get Item** now returns `{ found: false }` when the requested item does not exist, matching the documented response shape and enabling branching logic against `result.data.found`.
- **List Tables** now accurately reflects whether tables were returned in the `found` flag.

### 2025-12-16

Improved debug logging throughout the component to aid in troubleshooting integration issues. Debug inputs removed from each action in favor of debug mode.

### 2025-06-04

Added inline data sources for table selection to enhance data management capabilities
