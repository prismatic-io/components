## Changelog

### 2026-11-10

Refactored internal code

### 2026-11-09

Updated spectral to 10.39.1

### 2026-11-05

Updated spectral to 10.39.0

### 2026-11-04

Published the component as an npm package, so code-native integrations can install it and call its actions, triggers and data sources from code with TypeScript types

### 2026-11-02

Updated spectral to 10.34.1

### 2026-10-29

Updated the **New Incidents** trigger so the initial sync ignores the **Show New Incidents** toggle while it runs; later recurrences apply it normally

### 2026-10-20

- Added batching to the **New Incidents** trigger; enabling it changes the shape a downstream step receives
- Added a **Look-back Date** input to the **New Incidents** trigger; the backfill begins on the first recurrence and seeds each record once

### 2026-05-26

Added **New Incidents** polling trigger for detecting newly created incidents

### 2026-04-30

Various modernizations and documentation updates

### 2026-04-07

Various modernizations and documentation updates
