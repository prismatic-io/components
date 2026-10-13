## Changelog

### 2026-10-13

Updated the **New and Updated Records** polling trigger with batching and an initial sync:

- Added opt-in batching to the **New and Updated Records** trigger, dispatching each changed record individually or in configured batches; enabling it changes the shape a downstream step receives
- Added an optional **Look-back Date** input for performing an initial sync of records. The initial sync begins on the first recurrence and backfills every record modified on or after the specified date, seeding each once and ignoring the trigger's visibility filters; later recurrences are unaffected. Leave it empty to start from the first recurrence with no backfill

### 2026-04-30

Updated spectral version

### 2026-04-21

Added **New and Updated Records** polling trigger that checks for new and updated change records or projects in SAP S/4HANA on a configured schedule

### 2026-02-26

Added inline data sources for change records, projects, and purchase requisitions to enable dynamic dropdown selection

### 2026-01-22

Enhanced **Raw Request** and **Raw Request - OData** actions header return structure.

### 2026-01-14

Added **OAuth 2.0 Authorization Code** connection for direct access to SAP S/4HANA Cloud Public Edition. This connection uses OAuth 2.0 Authorization Code flow for authentication and is recommended for production integrations. Supports both Public Client and Confidential Client configurations.

### 2026-01-08

Added **Basic Auth** connection for direct access to SAP S/4HANA Cloud Public Edition. Users can now authenticate to their production SAP S/4HANA Cloud tenants.
