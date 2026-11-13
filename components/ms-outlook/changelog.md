## Changelog

### 2026-11-13

Added an option to skip the message fetch on the **Mail Message Webhook** trigger, and updated existing actions and triggers:

- Added the **Skip Message Fetch** input to the **Mail Message Webhook** trigger, so the trigger can respond to Microsoft Graph without fetching each message and fewer notifications are retried; notifications then carry no `messageData`
- Updated the **Delete Calendar**, **Delete Event**, **Cancel Event**, **Delete Mail Folder**, **Delete Message**, and **Delete Subscription** actions to return a result with `success`, `id`, and `message` instead of an empty response
- Added output schemas to 7 actions for improved field mapping during configuration
- Updated the **Update Event** action to group its **Location Name**, **Subject**, and **Body (HTML)** inputs into an **Event Details** structured object
- Updated **Update Event** to accept an empty **Attendees** value instead of rejecting it
- Updated **Get Schedule Availability** to leave the interval out of the request when **Availability View Interval** is empty, instead of sending 0
- Updated **Send Message** to trim the addresses in **To**, **CC**, and **BCC** and drop the empty entries that extra commas leave, and to fail with a clear error before sending when **To** holds no address
- Updated the **Calendar Event Webhook** and **Mail Message Webhook** triggers to skip the message or event fetch for a notification that carries no resource ID, instead of reading the whole collection

### 2026-11-11

Refactored internal code

### 2026-11-10

Added attachment actions and data sources, and updated existing actions:

- Added the **List Message Attachments**, **List Event Attachments**, **Download Message Attachment**, and **Download Event Attachment** actions for listing the attachments on a mail message or calendar event and downloading an attachment's file contents
- Added the **Select Message Attachment** and **Select Event Attachment** data sources for choosing the attachment to download on the **Download Message Attachment** and **Download Event Attachment** actions
- Updated **Get Mail Message** to return `filename`, `size`, `contentId`, and `related` on each attachment alongside its `contentType` and `data`
- Updated the **Update Event** action to group its start, end, and timezone inputs into a **Schedule** structured object
- Updated **Update Calendar** to leave the name out of the request when **Name** is empty, so updating only the color no longer sends an empty name
- Added inline action calling support to 31 actions for improved example output during configuration
- Added output schemas to 22 actions for improved field mapping during configuration
- Fixed **List Supported Timezones**, **List Supported Languages**, **Create Event Subscription**, **Create Mail Folder Subscription**, and deploying the **Calendar Event Webhook** and **Mail Message Webhook** triggers failing with an "only valid with delegated authentication flow" error when using the **OAuth 2.0 Client Credentials** connection

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

- Added opt-in batching to the **New and Updated Messages** trigger, dispatching each changed message individually or in configured batches so large backlogs drain in one recurrence; enabling it changes the shape a downstream step receives
- Added an optional **Look-back Date** input to the **New and Updated Messages** trigger for performing an initial sync. The initial sync begins on the first recurrence and seeds each message created or updated on or after the specified date once, ignoring the visibility filters. Leave it empty to start from the first recurrence with no backfill

### 2026-07-21

Grouped the **Page Limit** and **Page Skip** inputs into a single **Pagination** structured object on the **List Events**, **List Mail Messages**, **List Calendars**, and **List Mail Folders** actions

### 2026-05-26

Added **New and Updated Messages** polling trigger that checks for new and updated mail messages in Microsoft Outlook on a configured schedule, with optional filtering by mail folder and toggles for showing new or updated messages

### 2026-04-30

Updated spectral version

### 2025-12-17

Added **Mail Message Webhook** trigger with automatic subscription lifecycle management. This trigger monitors mail messages in your Outlook mailbox and automatically creates webhook subscriptions when instances deploy and removes them when instances are deleted. Supports:
- Monitoring a specific mail folder or the entire mailbox
- Filtering by change types (created, updated, deleted)
- Scheduled renewal to maintain active subscriptions beyond Microsoft Graph API's maximum subscription duration

Enhanced **Calendar Event Webhook** and **Mail Message Webhook** triggers with scheduled renewal support, enabling long-running webhook subscriptions that automatically renew before expiration to maintain continuous monitoring

### 2025-12-05

Added **Additional Authorization Parameters** field to **OAuth 2.0 Authorization Code** connection, enabling custom query string parameters in the authorization URL to control OAuth behavior such as forcing the consent screen or pre-filling user email addresses

### 2025-11-25

Fixed **Webhook** trigger to function correctly when no connection input is configured, resolving "Cannot read properties of undefined" errors during manual webhook execution

### 2025-11-04

Added **Calendar Event Webhook** trigger with automatic subscription creation and deletion on instance deploy/delete functionality

### 2025-10-03

Added fetch all support for subscription list actions to improve handling of large subscription datasets

### 2025-08-12

Added **OAuth 2.0 Client Credentials** connection type

### 2025-04-28

Fixed handling of null cc and bcc inputs to prevent errors when optional email fields are empty
