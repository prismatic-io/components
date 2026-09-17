## Changelog

### 2026-09-17

Added ITAM asset and device management, expanded the **New and Updated Tickets** trigger, and deprecated the classic asset actions:

- Added ten actions for managing IT asset inventory: **Create or Update Asset (ITAM)**, **Get Asset (ITAM)**, **List Assets (ITAM)**, **Update Asset (ITAM)**, **Delete Asset (ITAM)**, **Create or Update Device (ITAM)**, **Get Device (ITAM)**, **List Devices (ITAM)**, **Update Device (ITAM)**, and **Delete Device (ITAM)**
- Added the **Select Asset (ITAM)** and **Select Device (ITAM)** inline data sources for selecting an asset or device from a dropdown
- Updated the seven classic asset actions and the **Select Asset** data source to show **(Deprecated)** in their labels; they continue to work as before, and new flows should use the ITAM actions instead
- Added opt-in batching to the **New and Updated Tickets** trigger, dispatching each changed ticket individually or in configured batches; enabling it changes the shape a downstream step receives
- Added an optional **Look-back Date** input to the **New and Updated Tickets** trigger for performing an initial sync of tickets. The initial sync begins on the first recurrence and backfills every ticket updated on or after that date, seeding each once and applying the same record filters every later recurrence applies; leave it empty to sync the last seven days
- Updated the **New and Updated Tickets** trigger to work through a large backlog one page at a time rather than loading every page in a single execution
- Updated **Create Asset (Deprecated)** and **Create Software** to group their optional inputs into an **Additional Fields** object
- Fixed the **Select Software** data source, whose dropdown was always empty regardless of how many applications the account had
- Fixed **Get Workspace**, which answered a blank **Workspace ID** with an API not-found error instead of reporting the missing value; **Workspace ID** is now required
- Added output schemas across all actions for improved field mapping during configuration
- Added inline action calling support to 10 actions for improved example output during configuration

### 2026-07-17

Restructured action inputs into structured objects for an improved user experience

- List actions (**List Agents**, **List Requesters**, **List Tickets**, **List Problems**, **List Assets**, and **List Workspaces**) group their pagination inputs into a **Pagination** object; **Fetch All** stays a top-level toggle
- **Create Requester** and **Update Requester** group their contact-channel inputs, including **Address**, into **Contact Information**
- **Update Requester** groups **Primary Email** into **Contact Information**; **First Name** and **Last Name** stay flat, as two fields don't meet the grouping floor
- **Create Agent** groups **Work Phone Number**, **Mobile Phone Number**, and **Address** into a new **Contact Information** object
- **Create Problem** and **Update Problem** group their category inputs into **Categorization**
- **Update Asset** groups **Name**, **Asset Tag**, **Impact**, **Usage Type**, and **Description** into an **Additional Fields** object
- **Update Software** groups **Name**, **Description**, **Application Type**, **Status**, **Notes**, **Category**, and **Source** into an **Additional Fields** object
- **Update Problem** groups **Subject**, **Email**, **Description**, **Due By**, **Priority**, **Status**, and **Impact** into an **Additional Fields** object
- **Update Agent** groups **Email**, **Address**, **Occasional**, **Signature**, and **Can See All Tickets From Associated Departments** into an **Additional Fields** object
- **Update Ticket** groups **Priority**, **Status**, **Source**, and **Bypass Mandatory** into an **Additional Fields** object

### 2026-04-30

Updated spectral version

### 2026-04-08

Added polling trigger **New and Updated Tickets** that checks for new and updated tickets in Freshservice on a configured schedule, with configurable filtering for new and updated records.

### 2026-04-01

Added Documentation updates and various modernizations

### 2026-03-16

Improved input field documentation with formatted URL links for better readability

### 2026-03-13

Removed the **Debug Request** input from all action inputs. Debug logging is now controlled internally and no longer appears as a configurable field in actions.

### 2025-09-02

Data sources and inline data sources added:
- Workspaces
- Agents
- Tickets
- Assets
- Problems
- Software
- Requestors
