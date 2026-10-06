## Changelog

### 2026-10-06

Fixed several action and trigger defects, and added initial sync, batching, grouped inputs, output schemas, and inline action calling:

- Fixed **Get Task Members** sending a DELETE request instead of a GET, so the action now returns the task's members
- Fixed **Raw Request** failing to authenticate with a **Personal Access Token** connection
- Fixed **New and Updated Tasks** never returning closed tasks or subtasks
- Fixed **Edit User on Workspace** renaming every edited user to "User Name"; it now keeps the current username unless the new optional **Username** input is set
- Fixed **Update Task** clearing the task's **Name**, **Description**, **Status**, and **Parent** when those inputs were left empty; optional inputs left empty are now omitted from requests across the component
- Added an optional **Look-back Date** input to the **New and Updated Tasks** trigger for performing an initial sync of tasks. The initial sync begins on the first recurrence and backfills every task modified on or after the specified date, seeding each once and ignoring the visibility filters; later recurrences are unaffected. Leave it empty to start from the first recurrence with no backfill
- Added opt-in batching to the **New and Updated Tasks** trigger, dispatching each changed task individually or in configured batches so large backlogs drain in one recurrence; enabling it changes the shape a downstream step receives, which gets each changed task with its change type instead of separate created and updated lists
- Updated **List Tasks** to group its date filters into **Date Range Filters** and its sort, archive, closed-task, and custom-field query controls into **Filters**
- Updated **Create Task** and **Update Task** to group their start date, due date, and time estimate inputs into **Schedule**, with **Create Task** also grouping its Markdown description, notification, and required custom field options into **Additional Fields**, and **Get Task Comments** to group its start date and start ID cursor into **Pagination**
- Added output schemas to 49 actions for improved field mapping during configuration
- Added inline action calling support to 64 actions for improved example output during configuration

### 2026-05-26

Added **New and Updated Tasks** polling trigger that monitors a Team (Workspace) or List for changes via the `date_updated_gt` filter on ClickUp's tasks API. Results are partitioned into `created` and `updated` buckets based on each task's `date_created`/`date_updated` Unix-millisecond timestamps

### 2026-04-30

Updated spectral version

### 2026-04-10

Updated Example Payloads

### 2026-03-31

Various modernizations and documentation updates

