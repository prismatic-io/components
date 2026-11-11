## Changelog

### 2026-11-11

Refactored internal code

### 2026-11-10

Published the component as an npm package, so code-native integrations can install it and call its actions, triggers and data sources from code with TypeScript types

### 2026-11-04

Updated spectral to 10.38.5 and switched the build from webpack to tsdown:
- tsdown 0.22.3

### 2026-06-11

Added **Fetch All** toggle to all list actions (List Sources, List Destinations, List Warehouses, List Users, List Transformations, List Functions, List Destination Subscriptions, Get Destination Catalog, Get Sources Catalog, Get Warehouses Catalog, Get Events Volume From Workspace) that automatically follows cursor-based pagination to retrieve all pages of results in a single call; when disabled, existing single-page behavior with Count and Cursor inputs is preserved

### 2026-04-30

Updated spectral version

### 2026-04-07

Added global debug support across all actions for improved troubleshooting

### 2026-03-05

Added inline data sources for functions, transformations, users, destination metadata, source metadata, warehouse metadata, and destination subscriptions to enhance data selection capabilities
