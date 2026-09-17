## Changelog

### 2026-09-17

Expanded the **New and Updated Records** polling trigger and restructured action inputs into structured objects:

- Updated list actions (**List Attachments**, **List Configuration Items**, **List Incidents**, **List Tables**, **List Table Records**, **List Users**, **List Knowledge Articles**, **List Featured Knowledge Articles**, **List Most Viewed Knowledge Articles**) to group their page size and offset inputs into **Pagination**; **Fetch All** stays a top-level toggle
- Updated knowledge list actions (**List Knowledge Articles**, **List Featured Knowledge Articles**, **List Most Viewed Knowledge Articles**) to group their optional query controls into **Filters**
- Updated **Create User** and **Update User** to group their name and email inputs into **Name & Contact Information**
- Added inline action calling support to 34 actions for improved example output during configuration
- Added opt-in batching to the **New and Updated Records** trigger, dispatching each changed record individually or in configured batches so large backlogs drain in one recurrence; enabling it changes the shape a downstream step receives
- Added an optional **Look-back Date** input for performing an initial sync of records. The initial sync backfills every record modified on or after the specified date, seeding each once and ignoring the trigger's visibility filters; later recurrences are unaffected. Leave it empty to start from the first recurrence with no backfill

### 2026-07-14

Added an **OAuth 2.0 Client Credentials** connection, allowing authentication with ServiceNow system (service) accounts.

### 2026-05-21

Added **Fetch All** toggle input to list actions (**List Incidents**, **List Table Records**, **List Tables**, **List Users**, **List Attachments**, **List CMDB Instances**, **List Knowledge Articles**, **List Featured Knowledge Articles**, **List Most Viewed Knowledge Articles**, **Get User By Username**) to automatically retrieve all pages of results, bypassing the offset and limit inputs

### 2026-05-20

Applied automated security patches and code formatting updates

### 2026-04-30

Updated spectral version

### 2026-04-08

Added "New and Updated Records" polling trigger (`pollChangesTrigger`) that queries any ServiceNow table for records created or updated since the last poll, with configurable filtering for new vs. updated records.

### 2026-04-07

Various modernizations and documentation updates

### 2025-09-24

Added inline data sources for attachments

### 2025-07-22

Added CMDB (Configuration Management Database) actions for comprehensive IT asset and configuration management
