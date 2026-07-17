## Changelog

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
