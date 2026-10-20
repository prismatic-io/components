## Changelog

### 2026-10-20

Updated the **New Records** trigger to support large data syncs:

- Added opt-in batching to the **New Records** trigger, dispatching each changed record individually or in configured batches; enabling it changes the shape a downstream step receives
- Added an optional **Look-back Date** input to the **New Records** trigger for performing an initial sync of **Datasets**, the one resource type that records a creation date. The initial sync begins on the first recurrence and backfills every dataset created on or after the specified date, seeding each once and ignoring the visibility filter; later recurrences are unaffected. Leave it empty to start from the first recurrence with no backfill

### 2026-04-30

Updated spectral version

### 2026-04-21

Added **New Records** polling trigger that checks for new groups, datasets, or reports in Microsoft Power BI on a configured schedule

### 2026-04-07

Added global debug support across all actions for improved troubleshooting

### 2026-03-16

Improved input field documentation with formatted URL links for better readability

### 2025-10-29

Added inline data sources for workspaces, datasets, and tables with pagination support
