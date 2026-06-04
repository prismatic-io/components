## Changelog

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
