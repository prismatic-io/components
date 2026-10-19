## Changelog

### 2026-10-19

- Added opt-in batching to the **New and Updated Records** trigger, dispatching each changed record individually or in configured batches; enabling it changes the shape a downstream step receives
- Added an optional **Look-back Date** input to the **New and Updated Records** trigger for performing an initial sync of records. The initial sync begins on the first recurrence and backfills every record modified on or after the specified date, seeding each once and ignoring the visibility filters; later recurrences are unaffected. Leave it empty to start from the first recurrence with no backfill

### 2026-07-16

Restructured action inputs into structured objects and corrected input labels for an improved user experience.

- **Create Ticket** and **Update Ticket** group their optional datetime inputs into **Ticket Timestamps** and secondary optional inputs into **Additional Fields**
- **Create Ticket Message** groups its optional datetime inputs into **Message Timestamps** and secondary optional inputs into **Additional Fields**
- List actions (**List Customers**, **List Tickets**, **List Events**, **List Messages**) group their **Cursor** and **Limit** inputs into **Pagination**; **Fetch All** stays a top-level toggle
- The ticket channel input on **Create Ticket** and **Update Ticket** now displays as **Channel** instead of **Assignee User ID**, and the message receiver input on **Create Ticket Message** now displays as **Receiver** instead of **Receiver ID**

### 2026-05-05

Added **New and Updated Records** trigger for detecting new and updated records of a selected resource type in Gorgias

### 2026-04-30

Updated spectral version

### 2026-03-16

Improved input field documentation with formatted URL links for better readability

