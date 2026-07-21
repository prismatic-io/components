## Changelog

### 2026-07-21

Grouped related inputs into structured objects across restaurant, employee, shift, and time entry actions:

- Grouped the **Page Size** and **Page Token** inputs into a **Pagination** structured object on **List Connected Restaurants**, with the **Fetch All** input remaining a top-level toggle
- Grouped the **First Name**, **Last Name**, and **Chosen Name** inputs into a **Name** structured object on **Create Employee** and **Update Employee**
- Grouped the **Start Date** and **End Date** inputs into a **Date Range** structured object on **List Shifts** and **List Time Entries**
- Grouped the **Modified Start Date** and **Modified End Date** inputs into a **Modified Date Range** structured object on **List Time Entries**
- Grouped the **In Date** and **Out Date** inputs into a **Shift Window** structured object on **Create Shift** and **Update Shift**

### 2026-06-03

Added the **New and Updated Time Entries** polling trigger to detect newly created and recently modified time entries on a configured schedule

### 2026-05-21

Added **Fetch All** input to the **List Connected Restaurants** action to automatically paginate through and return all results in a single execution

### 2026-04-30

Updated spectral version

### 2026-04-07

Various modernizations and documentation updates

### 2026-03-16

Improved input field documentation with formatted URL links for better readability

### 2026-03-13

Removed the **Debug Request** input from all action inputs. Debug logging is now controlled internally and no longer appears as a configurable field in actions.

### 2026-03-05

Added inline data source for time entries to enhance data selection capabilities
