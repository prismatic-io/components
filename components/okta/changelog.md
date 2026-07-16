## Changelog

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
