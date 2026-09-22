## Changelog

### 2026-09-22

Reworked the polling triggers and updated what the actions offer during step configuration:

- Fixed the polling triggers permanently skipping records: a record changed in the same minute a recurrence ran was never reported, on that recurrence or any later one
- Added opt-in batching across all polling triggers, dispatching each changed record as its own flow execution or in configured batches rather than one execution carrying every record; enabling it changes the shape a downstream step receives
- Added an optional **Look-back Date** input across all polling triggers for performing an initial sync of records. The initial sync begins when the instance is deployed, backfilling every record modified on or after the specified date and seeding each once; later recurrences are unaffected. Leave it empty to start from the deployment with no backfill
- Updated **New and Updated Pages** and **New and Updated Data Sources** to stop reading once they reach records older than the polling window, instead of walking every page and data source in the workspace on every recurrence
- Updated the label of the **New and Updated Databases** trigger to **New and Updated Data Sources**, matching the data source records it returns
- Updated **Query Data Source** and **List Users** to group their **Start Cursor** and **Page Size** inputs under **Pagination**; **Fetch All** stays a top-level toggle
- Added output schemas to 15 actions for improved field mapping during configuration
- Added inline action calling support to 15 actions for improved example output during configuration

### 2026-09-14

Removed the **Create Database (Deprecated)**, **Get Database (Deprecated)**, **List Databases (Deprecated)**, and **Query Database (Deprecated)** actions that are no longer in use; use **Create Database**, **Retrieve Database**, **List Data Sources**, and **Query Data Source** instead

### 2026-04-30

Updated spectral version

### 2026-02-26

Added inline data source for users to enable dynamic dropdown selection

### 2026-01-23

Updated Notion component to support API v2025-09-03 with backward compatibility:

- **Updated API Version** - Now using Notion API v2025-09-03
- **Enhanced Query Database** - Added Data Source ID input to support databases with multiple data sources. Uses new `/data_sources/{id}/query` endpoint when Data Source ID is provided, falls back to legacy `/databases/{id}/query` endpoint for backward compatibility
- **Enhanced List Databases** - Added Result Type input to choose between data sources (recommended) and databases (legacy)
- **Updated Create Database Item** - Parent format now supports `data_source_id` type for database parents
- **Updated Create Database** - Fixed parent format to use `page_id` type (databases must be created under pages)
- **Updated Examples** - All example payloads now demonstrate the recommended `data_source_id` format for relations and parent objects

**Migration Guide**: Existing integrations using `database_id` will continue to work for single-source databases. For databases with multiple data sources, use the new `data_source_id` format.

### 2025-08-25

Added the **Internal Integration** connection type

### 2025-04-30

Added pagination support for improved handling of large datasets and better performance
