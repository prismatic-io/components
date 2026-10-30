## Changelog

### 2026-10-30

Fixed webhook, folder listing, and shared link errors, and tightened webhook signature validation:

- Fixed the **List Webhooks** action and the **List Folder** action with **Fetch All** disabled, which returned blank entries instead of the webhooks or folder items
- Fixed the **Delete Instance Webhooks** action, the **Select Webhook** data source, and **List Webhooks** with **Show Only Instance Webhooks** enabled, which failed whenever the Box account had a webhook
- Fixed the **Create Webhook** action, which failed when a webhook for the same target already existed instead of skipping creation
- Fixed the **Managed Webhook** trigger rejecting every signed delivery after its **Primary Signature Key** or **Secondary Signature Key** was changed without also changing the target or event types
- Fixed the **Managed Webhook** trigger failing on instance deletion, or on a redeploy that changed its target or event types, when its webhook had already been removed from Box
- Updated the **Managed Webhook** trigger to replace an existing webhook that delivers to the same flow when Box reports a conflict on deploy, and to fail with an error naming the conflict when the existing webhook delivers elsewhere
- Updated the **Manual Webhook** and **Managed Webhook** triggers to reject an unsigned delivery whenever a signature key is configured; before, a delivery without signature headers skipped validation
- Fixed the **Get Shared Link for File** and **Get Shared Link for Folder** actions, which failed with a type error when the item had no shared link; they now report that the file or folder has no shared link
- Updated the **Find File for Shared Link** and **Find Folder for Shared Link** actions to omit the password when **Shared Link Password** is empty, instead of sending the text "null"
- Added output schemas to the **Delete Object**, **Delete Webhook**, and **Delete Instance Webhooks** actions for improved field mapping during configuration

### 2026-10-13

Fixed errors in the polling triggers and path-based actions, and added batching and initial sync support:

- Fixed an error that caused the **New and Updated Files** and **New Folders** polling triggers, the **Select File or Folder** data source, and the **List Folder** action with **Fetch All** enabled to fail, along with every path-based action given any path other than the root folder: **List Folder**, **Download File**, **Upload File**, **Create Folder**, **Get File Download URL**, **Delete Object**, **Get Path Details**, **Move Object**, and **Copy Object**
- Fixed the **New File Comments** trigger, which failed whenever the file had comments, and updated it to check every page of the file's comments instead of only the first
- Added opt-in batching to the **New and Updated Files**, **New Folders**, and **New File Comments** triggers, dispatching each changed record individually or in configured batches; enabling it changes the shape a downstream step receives
- Added an optional **Look-back Date** input across all polling triggers for performing an initial sync of records. The initial sync backfills every record modified after the specified date, seeding each once; later recurrences are unaffected. Leave it empty to start from the first recurrence with no backfill

### 2026-09-14

Removed the **List Folder (Deprecated)** action that is no longer in use; use **List Folder** instead

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
