## Changelog

### 2026-09-25

Expanded the **New and Updated Tickets** trigger and the **Create Webhook** event list, corrected several defects in published actions, and restructured action inputs into structured objects:

- Added an optional **Look-back Date** input to the **New and Updated Tickets** trigger for performing an initial sync. The initial sync begins on the first recurrence and backfills every ticket created or updated on or after the specified date, seeding each ticket once and ignoring the visibility filters. Leave it empty to start from the first recurrence with no backfill
- Added opt-in batching to the **New and Updated Tickets** trigger, dispatching changed tickets individually or in configured batches and draining a large backlog within one recurrence instead of one window per recurrence; enabling it changes the shape a downstream step receives
- Added the ticket event types to **Events** on **Create Webhook**, which previously offered only the organization and user events, so a webhook can subscribe directly to ticket events
- Fixed **Ticket Type** and **Ticket Priority** selections being silently discarded on **Create Ticket** and **Update Ticket**
- Fixed **List Article Subscriptions** returning a not-found error, and the filters on **Search Articles** and **List Articles** being ignored
- Fixed list actions with **Fetch All** enabled returning partial results as if they were complete
- Fixed the **New and Updated Tickets** trigger returning no tickets on its first recurrence and silently skipping changed tickets on later recurrences, including any ticket changed in the minute before a recurrence ran
- Fixed unset optional inputs reaching Zendesk as empty values rather than being omitted on **Create Article**, **Create Category**, **Create Section**, and **Create Post**, where an unset **Position** pinned the new record to the top of its list, an unset **Body** or **Section Description** was saved as empty text, and leaving **Content Tag IDs** empty sent an empty list; also fixed the **Article ID**, **Section ID**, and **Category ID** dropdowns rendering empty on eight actions that carried no **Locale**, which now offer an optional **Locale** that populates the dropdown
- Updated the search and list actions to group related inputs: **Unified Search**, **List Articles**, **List Posts**, **List Topics**, **List Article Subscriptions**, **List Post Subscriptions**, **List Section Subscriptions**, and **List Topic Subscriptions** group their cursor and page-size inputs into **Pagination**, with **Fetch All**, where present, staying a top-level toggle; **Search Articles** and **Search Posts** group their date inputs into **Date Range Filters** and their remaining query controls into **Filters**; and **List Articles** and **List Sections** group their sorting and scoping inputs into **Filters**
- Updated the user, ticket, article, and post write actions to group related inputs: **Create User** and **Update User** into **Account Settings** and **Profile Details**, with **Update User** also grouping its name, email, and phone inputs into **Name & Contact Information**; **Create Ticket** and **Update Ticket** into **Classification**; **Update Article** into **Assignment IDs** and **Display Options**; and **Update Post** into **Moderation Flags**
- Added inline action calling support to 68 actions for improved example output during configuration
- Added output schemas to 68 actions for improved field mapping during configuration

### 2026-05-26

Added the **New and Updated Tickets** polling trigger using the Zendesk Incremental Tickets Export cursor stream. The trigger drains pages until `end_of_stream` and persists both the cursor and the last polled timestamp for accurate created vs. updated partitioning

### 2026-04-30

Various modernizations and documentation updates

### 2026-03-16

Improved input field documentation with formatted URL links for better readability

### 2026-03-13

Enhanced OAuth 2.0 connections with PKCE S256 support for improved authorization security. Removed the **Debug Request** input from all action inputs.

### 2026-03-05

Added inline data sources for topic, article, section, and post subscriptions to enable dynamic dropdown selection

### 2026-02-26

Added inline data sources for users, tickets, topics, and posts to enable dynamic dropdown selection

### 2025-11-19

Enhanced webhook triggers to support simulated test executions

### 2025-08-04

Security improvements to the API token connection
