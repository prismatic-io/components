## Changelog

### 2026-10-22

- Fixed the **New and Updated Records** trigger skipping previously created orders that were modified since the last recurrence
- Fixed Debug Mode printing the connection's password, client secret and access token to the execution logs while authenticating with Fluent Commerce
- Fixed the **Attributes** input on the **Create Customer** action so configured attributes are sent to Fluent Commerce instead of being silently dropped
- Updated **Create Customer** to omit **Last Name**, **Phone Number**, **Country**, and **Time Zone** when left empty instead of sending them to Fluent Commerce as empty text
- Updated the **Fluent Commerce OAuth 2.0 Password Grant** connection to report a clear error when Fluent Commerce returns no access token
- Updated Debug Mode to log each GraphQL request's query and variables for the actions
- Added inline action calling support to the **Get Current User**, **Get Customer by Email**, **Create Customer**, and **Create Product** actions for improved example output during configuration
- Added output schemas to the **Get Current User**, **Get Customer by Email**, **Create Customer**, and **Create Product** actions for improved field mapping during configuration

### 2026-10-21

- Added opt-in batching to the **New and Updated Records** trigger, dispatching each changed record individually or in configured batches so large backlogs drain in one recurrence; enabling it changes the shape a downstream step receives
- Added an optional **Look-back Date** input for performing an initial sync of records. The initial sync backfills every record modified on or after the specified date, beginning on the first recurrence and seeding each record once while ignoring the visibility filters. Leave it empty to start from the first recurrence with no backfill

### 2026-05-28

Added **New and Updated Records** polling trigger that monitors orders for changes, branching newly created orders to `created` and previously existing orders to `updated`, with an optional **Retailer ID** input to scope the query in multi-tenant environments

### 2026-04-30

Updated spectral version

### 2026-04-07

Added global debug support across all actions for improved troubleshooting
