## Changelog

### 2026-10-01

Added batching, initial sync, and configuration improvements to the Monday.com component:

- Added opt-in batching to the **New and Updated Items** trigger, dispatching each changed record individually or in configured batches so large backlogs drain in one recurrence; enabling it changes the shape a downstream step receives
- Added an optional **Look-back Date** input for performing an initial sync of records on the **New and Updated Items** trigger. The initial sync backfills every record modified on or after the specified date, beginning on the first recurrence and seeding each record once; later recurrences are unaffected. Leave it empty to start from the first recurrence with no backfill
- Added inline action calling support to the **Archive Board**, **Create Board**, **Create Webhook**, **Delete Webhook**, **Get Board**, **Get Items By Column Value**, **List Boards**, and **List Webhooks** actions for improved example output during configuration
- Added output schemas to the **Archive Board**, **Create Board**, **Create Webhook**, **Delete Webhook**, **Get Board**, **Get Items By Column Value**, **List Boards**, and **List Webhooks** actions for improved field mapping during configuration

### 2026-09-14

Removed the **Get Items By Column Value (Deprecated)** action that is no longer in use; use **Get Items By Column Value** instead

### 2026-08-26

Grouped the **Page Offset** and **Result Limit** inputs on the **List Boards** action into a **Pagination** structured object; **Fetch All** stays a top-level toggle

### 2026-07-31

Updated to Monday API version 2026-07

### 2026-05-26

Added the **New and Updated Items** polling trigger for Monday.com boards. The trigger filters items via the `__last_updated__` column using GraphQL `items_page` (cursor pagination) and partitions records into created and updated buckets based on each item's `created_at` and `updated_at` timestamps

### 2026-04-30

Various modernizations and documentation updates

### 2026-03-19

Added webhook support and quality of life updates:
- Updated to Monday API version 2026-01
- Improved input field documentation with formatted URL links for better readability
- **Webhook** trigger that automatically manages webhook subscriptions on instance deploy and removal
- **Create Webhook** action to create a webhook subscription for a specified board
- **Delete Webhook** action to delete an existing webhook subscription by ID
- **List Webhooks** action to list all webhook subscriptions for a board
- **Select Webhook** data source for selecting a webhook in configuration
- Updated **OAuth 2.0** connection to support webhook permissions

### 2025-08-19

Updated API version configuration across all Monday actions to use version 2025-07

### 2025-07-22

Updated to Monday API version 2025-07

### 2025-07-11

Added inline data source for board selection and GraphQL fragment support for advanced queries

### 2025-04-01

Updated to Monday API version 2025-04 with enhanced board and item management capabilities
