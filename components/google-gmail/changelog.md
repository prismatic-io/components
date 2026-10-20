## Changelog

### 2026-10-20

Added large data sync capabilities to the **New and Updated Emails** polling trigger:

- Added opt-in batching to the **New and Updated Emails** trigger, dispatching each changed record individually or in configured batches; enabling it changes the shape a downstream step receives
- Added an optional **Look-back Date** input to the **New and Updated Emails** trigger for performing an initial sync of email messages. The initial sync begins on the first recurrence and backfills every message received on or after the specified date, seeding each once; later recurrences are unaffected. Leave it empty to start from the first recurrence with no backfill

### 2026-04-30

Updated spectral version

### 2026-01-08

Added **Managed Push Notification Events** trigger to receive real time mailbox notifications

### 2025-11-21

Added **New and Updated Emails** polling trigger to check for mailbox changes at scheduled intervals

### 2025-11-14

Fixed an issue with **Raw Request** and **Service Account** authentication.

### 2025-10-13

Added subject impersonate user input option for enhanced email management capabilities.
