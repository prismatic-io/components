## Changelog

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
