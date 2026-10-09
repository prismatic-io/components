## Changelog

### 2026-10-09

- Added opt-in batching to the **New and Updated Records** trigger, dispatching each changed record individually or in configured batches; enabling it changes the shape a downstream step receives
- Added an optional **Look-back Date** input to the **New and Updated Records** trigger for performing an initial sync of records. For resources tracked by timestamp, the initial sync begins on the first recurrence and backfills every record created or modified on or after the specified date, seeding each once and ignoring the visibility filters. Leave it empty to start from the first recurrence with no backfill

### 2026-06-30

Grouped related optional inputs into structured objects across list, user, task, and project actions.

- Grouped **Limit** and **Offset** into a **Pagination** object on **List Accounts**, **List DataSets**, **List Pages**, **List Groups**, **List Users in Group**, **List Users**, **List Project List Tasks**, **List Stream Executions**, **List Streams**, and **Get Activity Log Entries**; **Fetch All** stays separate
- Grouped profile details (**Alternate Email**, **Employee Number**, **Locale**, **Location**, **Phone**, **Timezone**, **Title**) into a **Contact Information** object on **Create User** and **Update User**
- Grouped task attributes (**Contributors**, **Description**, **Due Date**, **Owned By**, **Priority**, **Tags**, and task body) into a **Task Details** object on **Create Task** and **Update Task**
- Grouped project attributes (**Name**, **Description**, **Due Date**, **Public**, and project body) into a **Project Details** object on **Update Project**

### 2026-05-14

Added bulk pagination support to list actions across **accounts**, **datasets**, **groups**, **pages**, **projects**, **streams**, and **users**, allowing users to fetch all pages of results in a single action invocation

### 2026-04-30

Updated spectral version

### 2026-04-10

Updated Example Payloads

### 2026-04-08

Added **New and Updated Records** polling trigger for monitoring new and updated records across Domo resource types including DataSets, Streams, Users, Projects, Groups, and Pages with automatic change detection

### 2026-04-07

Added global debug support across all actions for improved troubleshooting

### 2026-03-31

Various modernizations and documentation updates

### 2026-03-05

Added inline data sources for stream executions, tasks, users, DataSets, accounts, account types, groups, pages, projects, project lists, and streams to enhance data selection capabilities
