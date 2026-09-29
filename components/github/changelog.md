## Changelog

### 2026-09-29

- Added opt-in batching to the **New and Updated Records** trigger, dispatching each changed record individually or in configured batches, with each recurrence returning at most 500 records (oldest first) so large backlogs drain over later recurrences; enabling it changes the shape a downstream step receives
- Added an optional **Look-back Date** input to the **New and Updated Records** trigger for performing an initial sync of records. The initial sync begins on the first recurrence and backfills every record modified on or after the specified date, seeding each once and ignoring the visibility filters. Leave it empty to start from the first recurrence with no backfill
- Added output schemas to 15 actions for improved field mapping during configuration
- Added inline action calling support to 18 actions for improved example output during configuration
- Updated the **Repos List For Org**, **Orgs List For Authenticated User**, **Issues List For Repo**, **Issues List Comments**, and **Pulls List** actions to group their page and per-page inputs into **Pagination** for an improved user experience; **Fetch All** stays a top-level toggle on **Issues List For Repo**
- Added documentation for the **Webhook** trigger and prerequisites for the **OAuth 2.0** connection
- Fixed the **New and Updated Records** trigger so a record created during the same second the previous recurrence ran is delivered as a new record instead of being classed as updated, which dropped it when **Show Updated Records** was off
- Fixed the **Event Webhook** trigger so redeploying an instance no longer leaves an extra GitHub webhook registered on the repository, which previously caused each event to be delivered once per deployment; changing **Owner**, **Repository Name**, or **Events** now deletes the existing webhook before creating its replacement
- Fixed the **Issues List For Repo** action so the **Per Page** input is sent to GitHub as the API page-size parameter and **Fetch All** advances through pages instead of repeatedly fetching the first page

### 2026-06-02

Added **New and Updated Records** polling trigger that monitors a repository's issues and pull requests, routing newly created records to the `created` branch and modified records to the `updated` branch

### 2026-04-30

Updated spectral version

### 2026-04-07

Added global debug support across all actions for improved troubleshooting

### 2026-01-21

Added **Event Webhook** trigger that automatically creates and manages GitHub webhooks using lifecycle handlers

### 2025-11-19

Enhanced webhook triggers to support simulated test executions

### 2025-11-05

- Added inline data sources for organizations, issues, pull requests, and users to enhance data selection capabilities
- Added pagination support with sortBy functionality for improved data handling
- Enhanced **List Pull Requests** action with repository-specific filtering
