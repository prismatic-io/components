## Changelog

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
