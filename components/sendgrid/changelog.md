## Changelog

### 2026-09-17

Restructured action inputs, improved the designer configuration experience, and expanded the polling trigger for large data syncs:

- **Get All Lists** and **Get All Field Definitions** group their page size and page token inputs into **Pagination**; **Fetch All** stays a top-level toggle
- **Send Email** and **Send Multiple Emails** group their disposition, file type, and content ID inputs into **Attachment Details**
- Added an output schema to the **Get List by ID** action for improved field mapping during configuration
- Added inline action calling support to 18 actions for improved example output during configuration
- Added opt-in batching to the **New and Updated Messages** trigger, dispatching each changed record individually or in configured batches so a large result set is not held in a single execution; enabling it changes the shape a downstream step receives
- Added an optional **Look-back Date** input for performing an initial sync of records on the **New and Updated Messages** trigger. The initial sync backfills every record modified on or after the specified date, beginning on the first recurrence and seeding each record once; later recurrences are unaffected. SendGrid retains email activity for 30 days, so the sync starts no earlier than that, which is also where it starts when the input is left empty
- Added **Account Status Change** to the **Events** input on the **Create Webhook** and **Update Webhook** actions and the **Managed Webhook Events** trigger
- Fixed the **Managed Webhook Events** trigger failing signature validation when testing a flow in the designer
- Fixed the **Managed Webhook Events** trigger failing on every incoming event after an instance was redeployed, which persisted until the instance was recreated
- Updated the **Webhook** trigger description to remove an inaccurate claim that it validates incoming requests; the trigger passes requests through without verifying them

### 2026-07-23

Added output schemas to 14 actions to improve the low-code designer reference picker experience, and aligned the **Get Import Status** example payload to the documented response shape

### 2026-07-15

Resolved **Send Email** and **Send Multiple Emails** action issue related to sending a message without attachments.

### 2026-06-04

Added the **New and Updated Messages** polling trigger that retrieves email activity events from the SendGrid Email Activity Feed

### 2026-04-30

Updated spectral version

### 2026-03-31

Various modernizations and documentation updates

### 2026-03-16

Improved input field documentation with formatted URL links for better readability

### 2026-02-26

Added inline data source for webhooks to enable dynamic dropdown selection

### 2026-01-27

Added the **Managed Webhook Events** trigger to receive event webhook notifications from SendGrid. It will automatically create and manage a webhook subscription when an instance is deployed, and removes the subscription when the instance is deleted.

### 2025-06-18

Added an inline data source for Contacts and Lists to enhance list selection capabilities

### 2025-05-27

Added list management and contact import support for improved email campaign management
