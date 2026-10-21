## Changelog

### 2026-10-21

- Added opt-in batching to the **New and Updated Records** trigger, dispatching each changed record individually or in configured batches so large backlogs drain in one recurrence; enabling it changes the shape a downstream step receives
- Added an optional **Look-back Date** input for performing an initial sync of records. The initial sync backfills every record modified on or after the specified date, beginning on the first recurrence, seeding each once, and ignoring the visibility filters. Leave it empty to start from the first recurrence with no backfill

### 2026-05-28

Added **New and Updated Records** polling trigger that polls an Airtable table for records modified at or after the last poll, using the `LAST_MODIFIED_TIME()` formula function as the server-side filter. Records with `createdTime` after the last poll are emitted in the `created` bucket; older records modified since the last poll go to the `updated` bucket. Optional inputs allow scoping by view and combining additional Airtable formulas with the modification-time filter

### 2026-04-30

Various modernizations and documentation updates

### 2025-12-17

Added new triggers for receiving Airtable change notifications:

- Added **Base Change Notifications** trigger with automatic webhook creation, cursor-based payload retrieval, and scheduled auto-refresh to prevent webhook expiration
- Added **Webhook** trigger for receiving manually configured Airtable webhooks
