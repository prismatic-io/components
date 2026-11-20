## Changelog

### 2026-11-20

Fixed the **Drive Subscription** and **Site Item Changes** triggers, and updated the **Delete Subscription** result and connection validation:
- Fixed the **Drive Subscription** trigger reusing its existing Microsoft Graph subscription on a redeploy, so a changed **Resource**, **Change Type**, **Client State**, or connection never took effect; a redeploy now creates a new subscription and removes the previous one, retrying a delete Microsoft Graph refuses on later deploys and when the instance is deleted
- Fixed the **Site Item Changes** trigger dropping the changes of one of two drives that share a display name and tracking later recurrences against the wrong drive; changes from drives with the same name are now combined under that name
- Updated the **Delete Subscription** action to return a record with `success`, `id`, and `message` instead of an empty response
- Updated the connections to fail with a connection error when no access token is available, instead of sending the request to Microsoft Graph without one
- Updated the component description to better summarize what the component does
- Added an output schema to the **Delete Subscription** action for improved field mapping during configuration

### 2026-11-19

Updated dependencies and refactored internal code:
- tsdown 0.23.7

### 2026-11-16

Fixed subscription renewal and moved file downloads off Microsoft's retiring pre-authenticated URL, added multi-select site, drive, and folder data sources, and improved the list actions and polling triggers:
- Fixed the **Drive Subscription** trigger no longer receiving notifications once its Microsoft Graph subscription expired; when the trigger runs on a schedule it now renews the subscription on a **Scheduled Renewal** branch, extending it to just under the Microsoft Graph maximum and recreating it if it has lapsed, and it handles Graph lifecycle notices on a new **Lifecycle Event** branch
- Updated the **Download File** action to use the official Microsoft Graph `/content` endpoint instead of the deprecated `@microsoft.graph.downloadUrl` property, which Microsoft stops pre-authenticating on April 1, 2027; the **Get File** description now points binary files to **Download File**
- Fixed the **Renew Subscription** action treating **Expiration Days** as minutes instead of days; renewals are now capped at the Microsoft Graph maximum
- Fixed the **Raw Request** action ignoring the connection's **Base URL** and always sending to the global Microsoft Graph endpoint
- Fixed the **List Items in Site List** action ignoring **Opt In Fields** when no page size or page token was set
- Added the **Select Sites**, **Select Drives from Sites**, and **Select Folders from Drives** data sources for selecting several sites, drives, and top-level folders in a configuration wizard; the drive and folder data sources take one or more parents (a single ID, a list, or the selection from the previous data source) and, when several are selected, skip a site or drive Microsoft Graph refuses or no longer has instead of failing the whole list, and each **Select Folders from Drives** key joins the drive ID and folder ID with a colon
- Updated the **Drive Item Changes** and **Folder Item Changes** triggers to skip the flow when a recurrence finds no changes, as **Site Item Changes** already did
- Updated the polling trigger labels from **New and Updated Drive Items**, **New and Updated Folder Items**, and **New and Updated Site Items** to **Drive Item Changes**, **Folder Item Changes**, and **Site Item Changes**; trigger keys are unchanged, so existing flows keep working
- Updated **List Drives**, **List Files in Drive**, **List Folder Files in Drive**, **List Followed Sites**, **List Items in Site List**, and **List Sites** to group their page size and page token inputs into **Pagination**, and **List Changes** to group its delta query options into **Query Parameters**; **Fetch All** stays a top-level toggle where offered
- Updated the actions that take **Pagination** to send no page size when **Page Limit** is blank, instead of a page size of 0
- Added output schemas to 30 actions for improved field mapping during configuration
- Added inline action calling support to 33 actions for improved example output during configuration

### 2026-11-11

Refactored internal code

### 2026-11-10

Refactored internal code

### 2026-11-09

Updated spectral to 10.39.1

### 2026-11-06

Updated dependencies:
- spectral 10.38.5 in the shared ms-utils package

### 2026-11-05

Updated spectral to 10.39.0

### 2026-11-03

Published the component as an npm package, so code-native integrations can install it and call its actions, triggers and data sources from code with TypeScript types

### 2026-10-20

- Added opt-in batching to the **New and Updated Drive Items**, **New and Updated Folder Items**, and **New and Updated Site Items** triggers, dispatching each changed record individually or in configured batches so large backlogs drain in one recurrence; enabling it changes the shape a downstream step receives

### 2026-09-14

Removed the **List Files in Drive (Deprecated)** and **List Folder Files in Drive (Deprecated)** actions that are no longer in use; use **List Files in Drive** and **List Folder Files in Drive** instead

### 2026-08-05

Improved datasource filtering, drive scoping, and pagination consistency across drive actions and triggers:
- Added **Site ID** and **List ID** datasource-scoping inputs so the **Drive** and **Item** dropdowns are pre-populated in the UI
- Fixed the **List Drives** and **List Folders** datasources to query the correct SharePoint drive instead of defaulting to the user's personal OneDrive
- Removed the unused **Directory** datasource input
- Fixed the **Fetch All** option on the **List Sites**, **List Followed Sites**, **List Site Lists**, **List Drives**, **List Files in Drive**, and **List Folder Files in Drive** actions so results are returned in the same `{ value: [ ... ] }` shape as a single-page response

### 2026-05-21

Updated the **List Site Lists** action to include a search query parameter when fetching all lists, ensuring complete results when using delegated authentication

### 2026-04-30

Updated spectral version

### 2026-02-26

Added cross-component connection support for the **Microsoft Excel** component, enabling **SharePoint** connections to access Excel workbooks. Added inline data source for site lists to enable dynamic dropdown selection

### 2026-01-23

Enhanced the **New and Updated Folder Items** trigger to support recursive subfolder monitoring. When the new **Include Subfolders** input is enabled, the trigger now detects changes in all nested subfolders within the specified folder.

### 2025-12-09

Added webhook lifecycle features for managing SharePoint subscription creation, renewal, and deletion:
- **Drive Subscription** trigger for receiving real-time SharePoint change notifications with automatic subscription management
- **Delete All Instance Subscriptions** action for removing all subscriptions associated with an instance endpoint
- **Renew Subscription** action to extend subscription expiration

### 2025-09-16

Added new polling triggers for comprehensive SharePoint monitoring:
- **New and Updated Drive Items** trigger for monitoring drive modifications
- **New and Updated Site Items** trigger for tracking site updates
- **New and Updated Folder Items** trigger for detecting folder content changes

Renamed the OAuth connection configuration key to improve clarity.

### 2025-07-21

Added support for Microsoft Graph sovereign cloud endpoints, enabling SharePoint integration with government and regional cloud instances.

### 2025-07-15

Added **OAuth 2.0 Client Credentials** connection type for server-to-server authentication scenarios where user delegation is not required.
