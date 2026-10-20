## Changelog

### 2026-10-20

- Added opt-in batching to the **New and Updated Records** trigger, dispatching each changed record individually or in configured batches; enabling it changes the shape a downstream step receives
- Added an optional **Look-back Date** input to the **New and Updated Records** trigger for performing an initial sync of records. The initial sync begins on the first recurrence and backfills every record modified on or after the specified date, seeding each once and ignoring the visibility filters. Leave it empty to start from the first recurrence with no backfill
- Fixed the **New and Updated Records** trigger re-delivering the same newest records on every recurrence and never delivering the older ones when more changes had accumulated than one recurrence could read; it now continues from where the previous recurrence stopped

### 2026-05-27

Added **New and Updated Records** polling trigger that checks for newly created and recently modified components or change orders on a configured schedule

### 2026-04-30

Updated spectral version

### 2026-03-24

Added **Component ID** input to the **Select Component** inline data source for selecting components from a dropdown

### 2026-03-02

Added global debug logging across all actions for improved troubleshooting of API requests and responses

### 2025-12-08

Enhanced Duro API connection with expanded environment support:

- Added EU environment option for European data residency
- Added custom Duro environment field for private or testing environments

### 2024-06-27

Initial release of Duro PLM component with product lifecycle management capabilities
