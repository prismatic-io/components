## Changelog

### 2026-11-13

Updated the **Drive Subscription** trigger to keep its Microsoft Graph subscription active, and improved action and data source configuration:
- Fixed the **Drive Subscription** trigger no longer receiving notifications after its Microsoft Graph subscription expired; the trigger now accepts a schedule and renews the subscription on each scheduled run through a new **Scheduled Renewal** branch, to just under the Microsoft Graph maximum for drive resources
- Added a **Lifecycle Event** branch to the **Drive Subscription** trigger that handles Microsoft Graph lifecycle notifications, renewing the subscription when Graph asks for reauthorization and recreating it when Graph removes it
- Updated the **Drive Subscription** trigger to allow its subscription requests more time to complete
- Fixed the **Renew Subscription** action extending a subscription by the entered number of minutes instead of days
- Updated the **Update File** action to resolve the new parent folder path under the drive root, matching **Move File**
- Added the **Select Sites**, **Select Drives from Sites**, and **Select Folders from Drives** data sources for selecting several sites, drives, and top-level folders in the configuration wizard; each takes one or more parents (a single ID, a list of IDs, or the selection from the previous data source), skips a site or drive that Microsoft Graph refuses or no longer has when several are selected instead of failing the whole list, and **Select Folders from Drives** keys combine the drive ID and folder ID, separated by a colon
- Fixed the **Item ID** dropdown on the **Delete File**, **Get Item**, and **List Children** actions showing no options; it now lists the top-level files and folders of the selected **Drive ID** through a new **Select Drive Item** data source
- Fixed the **List Folders from Source** data source failing when **Directory** is a folder path such as `/Reports/2024`; it now lists that folder
- Fixed the **Select Site**, **List Drives from Source**, **List Groups from Source**, and **List Users from Source** data sources returning only the first page of results; they now return every page, and **Select Site** now lists sites under the **OAuth 2.0** connection, where it previously returned none
- Updated the **List Drives from Source**, **List Groups from Source**, **List Users from Source**, and **Select Site** data sources to return their options in the picklist result format
- Updated the **Files in Directory** data source label to **List Files in Directory**
- Updated the **OAuth 2.0** connection to show the **Scopes** field
- Updated the **List My Drives**, **List Drives By User**, **List Drives By Group**, **List Drives By Site**, **List Groups**, **List Sites**, **List Children**, **List Items In Directory**, and **List Files Shared With Me (Deprecation Notice)** actions to group **Page Limit** and **Page Token** into **Pagination**; **Fetch All** stays a top-level toggle
- Updated the **List Changes** action to group its query options into **Query Parameters**
- Added inline action calling support to 27 actions for improved example output during configuration
- Added output schemas to 24 actions for improved field mapping during configuration

### 2026-11-11

Refactored internal code

### 2026-11-10

Published the component as an npm package, so code-native integrations can install it and call its actions, triggers and data sources from code with TypeScript types

### 2026-11-09

Updated file handling ahead of Microsoft's pre-authenticated URL deprecation and standardized the subscription action labels:
- Updated the **Download File** action to use the official Microsoft Graph `/content` endpoint instead of the deprecated `@microsoft.graph.downloadUrl` property
- Updated the **Files in Directory** data source to return item IDs instead of download URLs as the selected value
- Updated the **Create a Subscription** and **Delete a Subscription** action labels to **Create Subscription** and **Delete Subscription**; action keys are unchanged, so existing steps keep working

### 2026-11-06

Updated spectral to 10.38.5 and switched the build from webpack to tsdown:
- tsdown 0.22.3

### 2026-07-27

Updated the **Fetch All** option on list actions so results are returned in the same `{ value: [ ... ] }` shape as a single page call; previously enabling Fetch All returned a bare array, so integrations that read the `value` property received no items

### 2026-06-26

- Notice of Deprecation the **List Files Shared With Me** action; its underlying Microsoft Graph endpoint is degraded and scheduled for removal around November 2026, so use the **List Shared** action instead. Added a deprecation notice to the action description
- Updated the **List Subscriptions** action so the **Show Instance Subscriptions** toggle is honored; previously it always filtered to instance subscriptions regardless of the setting
- Updated the **Update File** action so it no longer sends empty name or path values when those optional inputs are left blank, preventing unintended clearing of existing values

### 2026-06-11

Added **Fetch All** toggle to list actions (List My Drives, List Drives By User, List Drives By Group, List Drives By Site, List Sites, List Groups, List Children, List Items In Directory, List Files Shared With Me) that automatically follows `@odata.nextLink` pagination to retrieve all pages of results in a single call; when disabled, existing single-page behavior with Page Limit and Page Token inputs is preserved

### 2026-04-30

Updated spectral version

### 2026-04-07

Added global debug support across all actions for improved troubleshooting

### 2026-03-05

Added inline data source for subscriptions to enable dynamic dropdown selection

### 2026-02-26

Added inline data source for sites to enable dynamic dropdown selection

### 2025-12-09

Enhanced webhook lifecycle management with automatic subscription handling:
- Added **Drive Subscription** trigger with automatic subscription creation on instance deploy and deletion on instance removal
- Added **Renew Subscription** action for extending subscription expiration dates
