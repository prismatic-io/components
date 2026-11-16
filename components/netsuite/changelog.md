## Changelog

### 2026-11-16

Updated the client credentials connection, record actions and SuiteQL support:

- Added the **Select Record Type** data source for selecting a record type the account exposes through REST web services
- Added the optional **Query Parameters** input to the **SuiteQL Query** action and the **Select SuiteQL** data source for binding values to a query's `?` placeholders
- Updated the **Record Type** input on the **Create Record**, **Get Record**, **List Records**, **Update Record** and **Delete Record** actions and the **Select Record** data source to accept the script ID of a custom record or custom transaction type; **New and Updated Records** still accepts only the standard record types
- Fixed the **Record ID** input on **Get Record**, **Update Record** and **Delete Record** rejecting external IDs in the `eid:` format; characters such as `#` and `/` after `eid:` are now encoded, and an empty **Record ID** is rejected
- Fixed the **NetSuite OAuth Client Credentials** connection failing with EC private keys on the P-384 and P-521 curves, which now sign with ES384 and ES512
- Updated the **NetSuite OAuth Client Credentials** connection to reuse its access token until shortly before it expires, and to request the scopes configured on the connection (REST web services by default) instead of also requesting the RESTlets and SuiteAnalytics scopes
- Fixed requests failing for sandbox accounts when the **Token URL** uses the account ID as NetSuite displays it, such as `123456_SB1`; it now resolves to the `123456-sb1` host
- Updated requests that NetSuite rejects with HTTP 429 to retry with backoff, and error messages to include NetSuite's error code and detail
- Updated the **List Records** action and the **Select Record** data source to leave an empty **Query** out of the request
- Updated the **Raw Request** action to reject a **Service Type** other than record or query

### 2026-11-10

Refactored internal code

### 2026-11-09

Updated spectral to 10.39.1

### 2026-11-05

Updated spectral to 10.39.0

### 2026-11-03

Published the component as an npm package, so code-native integrations can install it and call its actions, triggers and data sources from code with TypeScript types

### 2026-10-28

Various modernizations and documentation updates

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
