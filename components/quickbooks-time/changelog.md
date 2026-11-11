## Changelog

### 2026-11-11

Refactored internal code

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

### 2026-10-13

Added batching and initial sync support to the **New Records** trigger:

- Fixed the **New Records** trigger, which never reported new timesheets, users, or job codes
- Added opt-in batching to the **New Records** trigger, dispatching each new record individually or in configured batches; enabling it changes the shape a downstream step receives
- Added an optional **Look-back Date** input to the **New Records** trigger for performing an initial sync of records. The initial sync begins on the first recurrence and backfills every record from the specified date onward, seeding each once and ignoring the trigger's visibility filter; later recurrences are unaffected. Leave it empty to start from the first recurrence with no backfill

### 2026-04-30

Updated spectral version

### 2026-04-21

Added **New Records** polling trigger that checks for new timesheets, users, or job codes in QuickBooks Time on a configured schedule

### 2026-04-07

Added global debug support across all actions for improved troubleshooting

### 2026-02-26

Added inline data sources for users, job codes, job code assignments, and timesheets to enable dynamic dropdown selection
