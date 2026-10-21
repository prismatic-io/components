## Changelog

### 2026-10-21

- Added opt-in batching to the **New and Updated Sites** trigger, dispatching each changed record individually or in configured batches; enabling it changes the shape a downstream step receives
- Added an optional **Look-back Date** input for performing an initial sync of records. The initial sync backfills every record modified on or after the specified date, seeding each once; later recurrences are unaffected. Leave it empty to start from the first recurrence with no backfill

### 2026-04-30

Updated spectral version

### 2026-03-27

Initial release of System Surveyor component with integration capabilities:

- Site management actions: **Get Site Info**, **Get Sites and Folders**, **List Sites**, **List Deleted Sites**, **Get Site Contacts**, **Get Bill of Materials Data**, **List Site Surveys**
- **Get Survey** action for retrieving survey details
- **Sync Element Profile** action for creating or updating element profiles
- **Schedule Report** action for report generation
- **Register Webhook** action for webhook endpoint registration
- **New and Updated Sites** polling trigger for detecting newly created or modified sites
- **Select Site** and **Select Site Survey** data sources for improved input selection
- **Raw Request** action for making custom API calls
- **Health Check** action for verifying API connectivity
