## Changelog

### 2026-10-13

Added batching and initial sync support to the **New and Updated Records** polling trigger:

- Added opt-in batching to the **New and Updated Records** trigger, dispatching each changed record individually or in configured batches; enabling it changes the shape a downstream step receives
- Added an optional **Look-back Date** input for performing an initial sync of records. The initial sync begins on the first recurrence and backfills every record modified on or after the specified date, seeding each once and ignoring the trigger's visibility filters; later recurrences are unaffected. Leave it empty to start from the first recurrence with no backfill

### 2026-05-05

Added **New and Updated Records** polling trigger that detects newly created and recently modified records across seven resource types: Business Partners, Items, Orders, Invoices, Purchase Orders, Warehouses, and Price Lists. Filtering is pushed to the SAP Business One Service Layer for efficient server-side queries, with date-based filtering reflecting the day-level precision of the underlying update timestamp

### 2026-04-30

Updated spectral version

### 2026-01-26

Added **API Version** selection to connection settings, allowing you to choose between v1 (OData 3.0) or v2 (OData 4.0) APIs. v2 is recommended for new integrations to access the latest OData 4.0 features and improved performance, while v1 remains available to ensure existing integrations continue working without modification.
