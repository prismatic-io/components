## Changelog

### 2026-10-21

- Added opt-in batching to the **New and Updated Records** trigger, dispatching each changed record individually or in configured batches so large backlogs drain in one recurrence; enabling it changes the shape a downstream step receives
- Added an optional **Look-back Date** input for performing an initial sync of records. The initial sync backfills every record modified on or after the specified date, beginning on the first recurrence and seeding each record once while ignoring the visibility filters. Leave it empty to start from the first recurrence with no backfill

### 2026-05-28

Added **New and Updated Records** polling trigger that monitors orders for changes, branching newly created orders to `created` and previously existing orders to `updated`, with an optional **Retailer ID** input to scope the query in multi-tenant environments

### 2026-04-30

Updated spectral version

### 2026-04-07

Added global debug support across all actions for improved troubleshooting
