## Changelog

### 2026-09-04

- Added opt-in batching to the **New and Updated Records** polling trigger, dispatching each changed record individually or in configured batches so large backlogs drain in one recurrence; enabling it changes the shape a downstream step receives
- Added an optional **Look-back Date** input to the **New and Updated Records** polling trigger for performing an initial sync of records; the initial sync begins on the first recurrence and backfills every record created or modified on or after the specified date, seeding each once. Leave it empty to begin incremental polling with no backfill
- Fixed the **New and Updated Records** polling trigger permanently skipping records when a single recurrence matched more records than it could page through
- Fixed the **Webhook** trigger rejecting test executions when a **Webhook Authentication Key** was configured
- Updated the **List Entity Types** and **Run Fetch XML Query** actions to group their paging inputs into a **Pagination** structured object; **Fetch All** stays a top-level toggle
- Added inline action calling support to the **Get Attribute**, **Get Entity**, **Get Entity Metadata**, and **Get Current User** actions for improved example output during configuration
- Added output schemas to the **Get Current User**, **Get Entity Metadata**, **Get Entities Metadata**, **List Attributes**, **List Entities**, and **List Entity Types** actions for improved field mapping during configuration

### 2026-05-28

Added **New and Updated Records** polling trigger that checks for changes to any Microsoft Dynamics 365 entity via the `modifiedon` OData filter. Records are partitioned into `created` and `updated` buckets based on each record's `createdon`/`modifiedon` timestamps

### 2026-05-13

Various modernizations and documentation updates.

### 2026-05-14

Added bulk pagination support to list actions across **entities**, **entity types**, and **queries**, allowing users to fetch all pages of results in a single action invocation

### 2026-04-30

Updated spectral version.

### 2026-04-07

Added trigger documentation and global debug support across all actions for improved troubleshooting.

### 2026-03-31

Various modernizations and documentation updates.

