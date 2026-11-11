## Changelog

### 2026-11-11

Updated the component description to better summarize what the component does

### 2026-11-10

Refactored internal code

### 2026-11-09

Updated spectral to 10.39.1

### 2026-11-05

Updated spectral to 10.39.0

### 2026-11-03

Published the component as an npm package, so code-native integrations can install it and call its actions, triggers and data sources from code with TypeScript types

### 2026-10-20

Added opt-in batching and an initial sync to the **New Emails** polling trigger:

- Added opt-in batching to the **New Emails** trigger, dispatching each new email individually or in configured batches; enabling it changes the shape a downstream step receives
- Added an optional **Look-back Date** input to the **New Emails** trigger for performing an initial sync of emails. The initial sync begins on the first recurrence and backfills every email received on or after the specified date, seeding each once; later recurrences are unaffected. Leave it empty to start from the first recurrence with no backfill

### 2026-04-30

Updated spectral version

### 2026-04-07

Added global debug support across all actions for improved troubleshooting

### 2026-02-18

- Added **New Emails** polling trigger to fetch new emails from a specified mailbox on a recurring schedule

### 2025-07-21

- Modified **Download Message** action for enhanced functionality and improved message handling
- Added metadata fields to the **Download Attachment** action for better message processing capabilities
- Modernized IMAP component and added more metadata fields to actions for improved email management and processing
