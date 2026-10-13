## Changelog

### 2026-10-13

Added an initial sync and opt-in batching to the **New and Updated Payments** trigger, and capped how many payments one recurrence returns without batching:

- Added an optional **Look-back Date** input to the **New and Updated Payments** trigger for performing an initial sync of payments. The initial sync begins on the first recurrence and backfills every payment created or updated on or after the specified date, seeding each once and ignoring the trigger's filters; later recurrences are unaffected. Leave it empty to start from the first recurrence with no backfill
- Added opt-in batching to the **New and Updated Payments** trigger, dispatching each changed payment individually or in configured batches so large backlogs drain in one recurrence; enabling it changes the shape a downstream step receives
- Updated the **New and Updated Payments** trigger to return at most 1,000 payments per recurrence when batching is off, oldest update first, so a larger backlog drains across later recurrences instead of in one execution

### 2026-07-02

Grouped pagination and sorting inputs into structured objects and added a Fetch All option to list actions

- List and search actions (**List Customers**, **Search Customers**, **Search Team Members**, **List Payments**, **List Payment Refunds**, **Search Catalog Items**, **Search Catalog Objects**, **Search Orders**, **Batch Retrieve Inventory Counts**, **List Invoices**, **Search Invoices**, and **List Webhook Subscriptions**) group their cursor and page-size inputs into a **Pagination** structured object (breaking: input keys changed)
- **List Customers** groups its sort inputs into a **Sorting** structured object (breaking: input keys changed)
- Added a **Fetch All** input to **List Customers**, **List Catalog**, **List Invoices**, **List Payments**, **List Payment Refunds**, and **List Webhook Subscriptions** to automatically retrieve all pages in a single call; **Fetch All** stays a top-level toggle above **Pagination**

### 2026-05-26

Added the **New and Updated Payments** polling trigger using the Payments API's `updated_at_begin_time` filter. The trigger walks the cursor stream sorted by `UPDATED_AT` and partitions records into created and updated buckets based on each payment's `created_at` and `updated_at` timestamps

### 2026-04-30

Updated spectral version

### 2026-04-08

Updated Square API reference links

### 2026-03-31

Various modernizations and documentation updates

### 2026-02-26

Added inline data source for refunds to enable dynamic dropdown selection

### 2025-11-17

Added Jobs API support with actions for managing jobs:

- **List Jobs** - List jobs in a seller account, sorted by title
- **Create Job** - Create a new job with title and tip eligibility
- **Retrieve Job** - Retrieve a specific job by ID
- **Update Job** - Update job title, tip eligibility, or version

Added inline data sources for Jobs, Team Members, Invoices, Orders, Payments, and Webhook Subscriptions to enhance data selection capabilities
