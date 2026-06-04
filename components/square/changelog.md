## Changelog

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
