## Changelog

### 2026-09-03

- Added opt-in batching to the **New and Updated Records** trigger, dispatching each changed record individually or in configured batches so a large backlog drains within one recurrence; enabling it changes the shape a downstream step receives
- Updated the **New and Updated Records** trigger to fetch at most one page of records per recurrence, so without batching a large backlog now drains across several scheduled recurrences instead of arriving in a single execution; a recurrence whose entire page shares a single **Cursor Field** value is exempt, because the position cannot resume inside such a group, and emits every remaining record instead
- Fixed records being silently skipped when they were committed to the table while the trigger was still reading it; records are now returned ordered by the cursor field ascending
- Added an optional **Default Cursor Value** input for performing an initial sync of records. The initial sync begins on the first recurrence and backfills every record past the specified value, seeding each once. Leave it empty to start from the first recurrence with no backfill
- Added an optional **Max Records Per Recurrence** input for bounding how many records a single recurrence returns; leave it empty to use the default of 1,000.
- Added an output schema to the **Query** action for improved field mapping during configuration

### 2026-06-29

Various modernizations and documentation updates

### 2026-04-30

Updated spectral version

### 2026-03-13

Removed the **Debug Request** input from all action inputs. Debug logging is now controlled internally and no longer appears as a configurable field in actions.

### 2025-11-25

Enhanced webhook triggers to support simulated test executions for improved manual testing capabilities
