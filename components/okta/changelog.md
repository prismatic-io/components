## Changelog

### 2026-10-20

- Added opt-in batching to the **New System Logs** trigger, dispatching each event individually or in configured batches so large backlogs drain in one recurrence; enabling it changes the shape a downstream step receives
- Added opt-in batching to the **New Users** and **Updated Users** triggers, dispatching each user individually or in configured batches; enabling it changes the shape a downstream step receives
- Added an optional **Look-back Date** input to the **New Users**, **Updated Users**, and **New System Logs** triggers for performing an initial sync of records. The initial sync backfills every record on or after the specified date, beginning on the first recurrence and seeding each once; later recurrences are unaffected. Leave it empty to start from the first recurrence with no backfill
- Fixed the **Updated Users** trigger returning the entire directory on its first recurrence; it now starts tracking from the first recurrence unless a **Look-back Date** is set
- Fixed users created or changed while the **New Users** and **Updated Users** triggers were reading being skipped on the next recurrence
- Updated the **New System Logs** trigger to resume from where the previous recurrence ended, following Okta's recommended polling pattern, rather than re-querying by time, which could skip or duplicate events

### 2026-07-16

Restructured action inputs into structured objects for an improved user experience

- The list actions (**List Users**, **List Groups**, **List Group Members**, **List Applications**, **List Policies**, **Get System Logs**, **List Realms**) group their paging inputs into **Pagination**, while **Fetch All** stays a top-level toggle
- **List Users**, **List Groups**, and **List Realms** group their sort inputs into **Sorting**
- **List Users** and **List Groups** group their query inputs into **Filters**, and **Get System Logs** groups its time-range and query inputs into **Filters**; the query input in these **Filters** groups is now labeled **Query**
- **List Applications** groups its query-optimization inputs into **Result Options**
- **Assign Application to User** groups its credential and profile inputs into **Assignment Details**
- **Create User** groups its provisioning inputs into **Provisioning Options** and its optional profile inputs into **Additional Fields**, and **Update User** groups its remaining optional profile inputs into **Additional Fields** while keeping **Login**, **Email**, **First Name**, and **Last Name** top-level to mirror **Create User**

### 2026-04-30

Updated spectral version

### 2025-10-28

Added **OAuth 2.0 Client Credentials** connection type for enhanced authentication options

### 2025-10-15

Enhanced event hook options with improved user-friendly labels and added new event types including user impersonation, unsuspend, and admin app access events

### 2025-10-01

Initial release of Okta component with comprehensive integration capabilities
