## Changelog

### 2026-08-31

Improved Box trigger and webhook reliability and restructured action inputs:

- Fixed the **New and Updated Files** and **New Folders** polling triggers so they no longer run the flow on every recurrence when nothing has changed
- Fixed signature validation on the **Managed Webhook** trigger, which previously rejected every signed delivery for flows configured with signature keys
- Fixed **Delete Instance Webhooks** so it deletes every matching webhook instead of stopping after the first page of results
- Updated the **Managed Webhook** trigger to recreate its Box subscription when the selected trigger types change, and to carry its stored state forward so changing the target no longer leaves an orphaned webhook in Box
- Added **Primary Signature Key** and **Secondary Signature Key** inputs to the **Manual Webhook** trigger, so a webhook created in the Box Developer Console can be verified without running the **Create Webhook** action
- Updated the **New File Comments** trigger to return its results in the same location as the other polling triggers

  Reconfiguration notice: **New File Comments** now returns its polled comments under `body.data.newComments` on the trigger results, matching the other polling triggers, instead of `data.newComments`. Check any step that references those results.

- Grouped the pagination inputs on the **List Folder**, **List Folder (Deprecated)**, and **List Webhooks** actions into a **Pagination** structured object; **Fetch All** stays a top-level toggle
- Grouped the optional shared link password, permissions, and vanity name inputs on the **Add Shared Link to File**, **Update Shared Link on File**, **Add Shared Link to Folder**, and **Update Shared Link on Folder** actions into **Additional Fields**
- Added inline action calling support across all actions for improved example output during configuration
- Added output schemas to 21 actions for improved field mapping during configuration

### 2026-08-03

Upgraded the Box SDK from `box-node-sdk` v3 to v10:
- Migrated client initialization and all file, folder, user, upload, download, and webhook operations to the new SDK
- Replaced webhook signature validation with a native, dependency-free implementation (HMAC-SHA256) that also rejects stale deliveries to guard against replay attacks
- Fixed the **Update Shared Link on File** action, which was calling an incorrect URL and failing
- Added example payloads for the shared link, delete, and webhook cleanup actions

### 2026-04-30

Updated spectral version

### 2026-03-31

Various modernizations and documentation updates

### 2025-01-23

Added new triggers for improved event monitoring:
- **Managed Webhook** automatically creates and manages webhook subscriptions when instances are deployed and removes them when deleted
- **New or Updated Files** polls for new or modified files in a specified folder on a schedule
- **New Folders** polls for newly created folders within a target folder on a schedule
- **New File Comments** polls for new comments on a specific file on a schedule

### 2025-11-19

Enhanced webhook triggers to support simulated test executions

### 2025-09-15

Upgraded to the latest Box SDK version with enhanced object operations and improved webhook functionality
