## Changelog

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

