## Changelog

### 2026-11-18

Improved the triggers, action results, and configuration experience:
- Fixed the **User Changes** and **Group Changes** triggers keeping the previous subscription on redeploy, so a changed **Change Type** never took effect; each deploy now replaces the subscription with one built from the current configuration
- Fixed the **User Changes** and **Group Changes** triggers logging Microsoft Graph request details on every deploy and instance deletion when debug logging was off
- Fixed **Upsert Application** returning an empty result when it updates an existing application; it now returns a success flag
- Updated **Update User**, **Upsert Group**, and **Update Subscription** to omit blank optional inputs from the request instead of sending them as empty values
- Updated the **Delete User**, **Delete Group**, **Delete Application**, **Delete Subscription**, and **Remove Member From Group** actions to return the removed item's ID and a confirmation message alongside the success flag
- Added inline action calling support to 25 actions for improved example output during configuration
- Added output schemas to 25 actions for improved field mapping during configuration
- Updated the component description to better summarize what the component does

### 2026-11-11

Refactored internal code

### 2026-11-10

Published the component as an npm package, so code-native integrations can install it and call its actions, triggers and data sources from code with TypeScript types

### 2026-11-06

Updated spectral to 10.38.5 and switched the build from webpack to tsdown:
- tsdown 0.22.3

### 2026-09-01

Restructured action inputs into structured objects for an improved user experience.

- Updated **List Users**, **List Groups**, **List Group Members**, and **List Applications** to group their OData system query options into **OData Query Parameters**; **Fetch All** stays a top-level toggle
- Updated **List Changes** to group its OData system query and change-tracking options into **OData Query Parameters**
- Updated **Update User** to group its user profile inputs into **User Fields**, and **Upsert Group** to group its group configuration inputs into **Group Fields**

### 2026-06-02

Added the **OAuth 2.0 Client Credentials** connection for service-to-service authentication

### 2026-04-30

Updated spectral version

### 2026-03-13

Updated trigger names and actions for improved usability:

- Removed the **Debug Request** input from all actions; debug logging is now controlled internally
- Added documentation for **Webhook**, **Group Changes**, and **User Changes** triggers
- Renamed **Group Trigger** to **Group Changes** and **User Trigger** to **User Changes**
- Renamed **List Group** to **List Groups** and **Remove Member of Group** to **Remove Member From Group**

### 2026-03-05

Added inline data sources for subscriptions, users, and group members to enhance data selection capabilities

### 2026-02-24

Added inline data source for Group ID input to enhance data selection capabilities

### 2026-01-20

Made **Authorize URL** and **Token URL** configurable as inputs in the **OAuth 2.0** connection type
