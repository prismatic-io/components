## Changelog

### 2026-09-22

- Added inline action calling support to the **Get Record**, **List Records**, **Create Record**, **Update Record**, **Delete Record**, and **SuiteQL Query** actions for improved example output during configuration
- Added output schemas to the **Get Record** and **SuiteQL Query** actions for improved field mapping during configuration
- Added opt-in batching to the **New and Updated Records** trigger, dispatching each changed record individually or in configured batches so large backlogs drain in one recurrence; enabling it changes the shape a downstream step receives
- Added an optional **Look-back Date** input for performing an initial sync of records on the **New and Updated Records** trigger. The initial sync backfills every record modified on or after the specified date, seeding each once and ignoring the field and visibility filters; later recurrences are unaffected. Leave it empty to start from the first recurrence with no backfill

### 2026-08-11

Restructured pagination inputs into structured objects and added output schemas for an improved user experience

- The **List Records** and **SuiteQL Query** actions and the **Select Record** and **Select SuiteQL** data sources group their pagination inputs into a **Pagination** structured object
- **Limit** is now optional on those actions and data sources, defaulting to 1000 records per page when left blank
- Added output schemas to the **Create Record**, **Update Record**, and **List Records** actions for improved field mapping during configuration

### 2026-04-30

Updated spectral version

### 2026-03-24

Added PKCE (S256) support to the **OAuth 2.0 Authorization Code** connection to comply with NetSuite's upcoming mandatory PKCE requirement in 2027.1.

### 2026-01-23

Added **New and Updated Records** polling trigger to monitor for new and updated records with support for record type filtering and additional query conditions. Includes toggle controls to filter for only new records, only updated records, or both. Added component-wide global debug support, replacing per-action debug inputs for streamlined configuration.

### 2025-10-28

Enhanced record management actions to include response headers for improved API metadata access and debugging.

### 2025-10-20

Added comprehensive example payloads for all actions to enhance integration development and documentation.
