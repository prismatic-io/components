## Changelog

### 2026-10-21

- Added opt-in batching to the **New and Updated Events** trigger, dispatching each changed record individually or in configured batches so large backlogs drain in one recurrence; enabling it changes the shape a downstream step receives
- Added an optional **Look-back Date** input for performing an initial sync of records. The initial sync backfills every record modified on or after the specified date, seeding each once; later recurrences are unaffected. Leave it empty to start from the first recurrence with no backfill

### 2026-04-30

Updated spectral version

### 2026-03-31

Various modernizations and documentation updates

### 2026-01-26

Added calendar event monitoring capabilities:
- **Calendar Change Events** - Lifecycle webhook trigger that automatically manages Google Calendar push notification subscriptions when instances are deployed or deleted, with support for Push Notifications and Log Messages branches
- **New and Updated Events** - Polling trigger that monitors calendars for new and updated events on a configured schedule

### 2025-07-31

Modernized component with inline data sources for selecting Calendars and Events.

### 2025-04-26

Enhanced event management capabilities:
- Added "Send Updates" option to **Update Event** and **Delete Event** actions
- Implemented email invitations to attendees on **Create Event**
- Added Conference Event field support
- Fixed attendee input handling
