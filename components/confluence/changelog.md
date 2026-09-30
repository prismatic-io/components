## Changelog

### 2026-09-30

- Grouped the pagination inputs on the **List Pages**, **List Pages in Space**, **List Spaces**, **List Attachments**, **Get Attachments for Page**, **List Content Properties for Page**, **List Content Properties for Attachments**, and **List Content Properties for Custom Content** actions into a **Pagination** object, and grouped the optional retrieval and expansion inputs on the **Get Page** action into an **Additional Fields** object
- Added inline action calling support to 31 actions for improved example output during configuration
- Added output schemas to 22 actions for improved field mapping during configuration
- Added opt-in batching to the **New and Updated Pages** and **New Spaces** triggers, dispatching each changed record individually or in configured batches so large backlogs drain in one poll cycle; enabling it changes the shape a downstream step receives
- Added an optional **Look-back Date** input for performing an initial sync of records on the **New and Updated Pages** and **New Spaces** triggers. The initial sync backfills every record modified on or after the specified date, seeding each once; later recurrences are unaffected. Leave it empty to start from the first recurrence with no backfill

### 2026-04-30

Updated spectral version

### 2026-03-31

Various modernizations and documentation updates

### 2026-02-26

Added inline data source for attachments to enable dynamic dropdown selection

### 2026-01-27

Added polling triggers for monitoring Confluence content:
- **New Spaces** - Polling trigger that checks for new spaces on a configured schedule
- **New and Updated Pages** - Polling trigger that monitors pages for new and updated content on a configured schedule, categorizing changes by type
