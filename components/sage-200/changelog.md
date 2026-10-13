## Changelog

### 2026-10-13

Added batching and an initial sync to the **New and Updated Records** polling trigger:

- Added opt-in batching to the **New and Updated Records** trigger, dispatching each changed record individually or in configured batches; enabling it changes the shape a downstream step receives
- Added an optional **Look-back Date** input for performing an initial sync of records. The initial sync begins on the first recurrence and backfills every record modified on or after the specified date, seeding each once and ignoring the trigger's visibility filters; later recurrences are unaffected. Leave it empty to start from the first recurrence with no backfill

### 2026-06-11

Added **Fetch All** toggle to all list actions (List Customers, List Customer Contacts, List Customer Delivery Addresses, List Customer Price Bands, List Price Bands, List Products, List Product Groups, List Sales Order, List Tax Codes, List Pricing Source Types, List Pricing Types) that automatically paginates through all results using `$top`/`$skip` OData parameters; when disabled, existing single-call behavior is preserved

### 2026-05-05

Updated **New and Updated Records** trigger to use Sage 200's server-side OData `$filter=date_time_updated gt <iso>` query, replacing the previous full-fetch with client-side filtering

### 2026-04-30

Updated spectral version

### 2026-03-16

Improved input field documentation with formatted URL links for better readability

### 2026-03-05

Added inline data sources for customer contacts, customer delivery addresses, products, sales orders, price bands, product groups, and tax codes to enhance data selection capabilities
