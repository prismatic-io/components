## Changelog

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
