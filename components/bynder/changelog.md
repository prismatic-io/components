## Changelog

### 2026-10-19

- Added opt-in batching to the **New and Updated Records** trigger, dispatching each changed record individually or in configured batches; enabling it changes the shape a downstream step receives
- Added an optional **Look-back Date** input to the **New and Updated Records** trigger for performing an initial sync of records. The initial sync begins on the first recurrence and backfills every record created or modified on or after the specified date, seeding each once and ignoring the trigger's visibility filters; later recurrences are unaffected. Leave it empty to start from the first recurrence with no backfill

### 2026-04-30

Updated spectral version

### 2026-04-21

Added **New and Updated Records** polling trigger that checks for new and updated assets, collections, campaigns, jobs, and orders in Bynder on a configured schedule

### 2026-03-31

Various modernizations and documentation updates

### 2026-03-05

Added inline data sources for assets, brands, orders, users, security profiles, and metaproperties to enhance data selection capabilities
