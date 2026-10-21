## Changelog

### 2026-10-21

- Added opt-in batching to the **New Envelopes** trigger, dispatching each changed record individually or in configured batches; enabling it changes the shape a downstream step receives
- Added an optional **Look-back Date** input for performing an initial sync of records. The initial sync backfills every envelope created on or after the specified date, seeding each once; later recurrences are unaffected. Leave it empty to start from the first recurrence with no backfill

### 2026-06-05

Added the **New Envelopes** polling trigger that returns envelopes created since the last run

### 2026-04-30

Updated spectral version

### 2026-03-13

Removed the **Debug Request** input from all action inputs. Debug logging is now controlled internally and no longer appears as a configurable field in actions.

### 2026-03-05

Added inline data source for envelope selection to enhance data selection capabilities
