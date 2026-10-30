## Changelog

### 2026-10-30

Restructured action inputs into structured objects, added output schemas and inline action calling, and fixed several issue, project, user, and version actions:

- Updated the **Get Status List**, **List Assignable Users for Project**, **List Board Sprints**, **List Boards**, **List Issues by Project**, **List Priorities**, **List Projects**, and **List Versions** actions to group their paging inputs into **Pagination**
- Updated **Create Issue** and **Update Issue** to group their due date and version inputs into **Additional Fields**
- Updated **Create Version** and **Update Version** to group their status flags and schedule dates into **Release Details**
- Added output schemas to 38 actions for improved field mapping during configuration
- Added inline action calling support to 43 actions for improved example output during configuration
- Fixed **Create Issue** and **Update Issue** failing when **Fix Versions** was set; the value is now sent as the list of versions Jira expects
- Fixed **Create User** failing on every request; it now calls Jira's user endpoint
- Fixed **Update Version** failing on every request; it now calls Jira's version update endpoint
- Fixed **Search Issues** and the **Summary** search of **Find Issue** failing when the search text contained a double quote mark or a backslash
- Fixed **Find Issue** returning an empty result when a **Number** search failed on authentication, permissions, rate limits, or a server error; these errors are now reported
- Fixed **Find Project** ignoring **Search Type**, which returned projects whose key matched a **Name** search or whose name matched a **Key** search; it now matches only the selected attribute

### 2026-10-20

- Added opt-in batching to the **New and Updated Issues** trigger, dispatching each changed issue individually or in configured batches so large backlogs drain in one recurrence; enabling it changes the shape a downstream step receives
- Added an optional **Look-back Date** input to the **New and Updated Issues** trigger for performing an initial sync of issues. The initial sync begins on the first recurrence and backfills every issue modified on or after the specified date, seeding each once and ignoring the visibility filters; later recurrences are unaffected. Leave it empty to start from the first recurrence with no backfill
- Fixed the **New and Updated Issues** trigger never delivering the issues beyond the page limit when more issues changed between recurrences than one recurrence could read; the remainder is now delivered on later recurrences
- Fixed the **New and Updated Issues** trigger returning few or no issues for Jira accounts in a time zone west of UTC and repeatedly returning the same issues for accounts in a time zone east of UTC; it now filters by date in the account's time zone

### 2026-05-26

Added the **New and Updated Issues** polling trigger that monitors Jira on a configured schedule using the `/search/jql` endpoint with a JQL `updated` filter. Results are partitioned into created and updated buckets based on each issue's `created` timestamp

### 2026-04-30

Updated spectral version

### 2026-04-23

Modernized authentication and connection setup with no change to connection behavior or configuration

### 2026-04-08

Made webhook creation idempotent to prevent duplicate webhooks on redeploy

### 2026-02-26

Added **Select Version** inline data source for selecting project versions to enable dynamic dropdown selection

### 2026-02-04

Added **OAuth 2.0 Client Credentials** connection type for service account and machine-to-machine authentication scenarios

### 2025-12-10

Added **Issue Events** trigger with automatic webhook lifecycle management for issue, comment, and attachment events

### 2025-11-04

Enhanced issue search and pagination capabilities:
- Migrated **Search Issues** and **Find Issue** actions to JQL endpoint for improved query reliability
- Added **Fields** input to control which issue fields are returned across search actions
- Improved **Find Issue** action with corrected JQL query syntax
- Replaced **List Issues** action with **List Issues by Project** to fulfill JQL requirements
- Replaced **Select Issue** data source with **Select Issue by Project** to fulfill JQL requirements
- Removed **Query (Deprecated)** action

### 2025-04-25

Added inline data sources for boards, issues, priorities, and webhooks to enhance integration capabilities
