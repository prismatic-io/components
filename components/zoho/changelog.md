## Changelog

### 2026-10-20

- Added opt-in batching to the **New and Updated CRM Contacts** and **New and Updated CRM Leads** triggers, dispatching each changed record individually or in configured batches so large backlogs drain in one recurrence; enabling it changes the shape a downstream step receives
- Added opt-in batching to the **New and Updated Books Contacts** trigger, dispatching each changed record individually or in configured batches; enabling it changes the shape a downstream step receives
- Added an optional **Look-back Date** input to the **New and Updated CRM Contacts**, **New and Updated CRM Leads**, and **New and Updated Books Contacts** triggers for performing an initial sync of records. The initial sync begins on the first recurrence and backfills every record modified on or after the specified date, seeding each once; later recurrences are unaffected. Leave it empty to start from the first recurrence with no backfill

### 2026-08-21

Updated the **New and Updated CRM Leads**, **New and Updated CRM Contacts**, and **New and Updated Books Contacts** polling triggers to filter records server-side by their last modified time, so each poll returns only records changed since the previous poll instead of the entire dataset, reducing API-credit consumption

### 2026-07-14

Added an **Additional Fields** input to the **New and Updated CRM Leads** and **New and Updated CRM Contacts** triggers, letting you include extra CRM fields in the trigger results without making follow-up requests.

### 2026-04-30

Updated spectral version

### 2026-03-03

Enhanced pagination support for token-based page traversal for more reliable data retrieval across CRM and Books actions

### 2026-01-20

Enhanced **Channel ID** inputs to support inline data source for simpler value selection.

### 2024-12-02

Added the following new triggers to poll for record changes:

- **New and Updated CRM Contacts** trigger - Detects new and updated contacts in Zoho CRM on a configured schedule
- **New and Updated CRM Leads** trigger - Detects new and updated leads in Zoho CRM on a configured schedule
- **New and Updated Books Contacts** trigger - Detects new and updated contacts in Zoho Books on a configured schedule

Added the following notification management actions:

- **CRM - Notifications Trigger** - Receives real time notifications from Zoho CRM when specified events occur, automatically managing notification channel subscriptions on instance deploy and delete
- **CRM - Enable Notification** action - Enables instant notifications for actions on Zoho CRM modules
- **CRM - Disable Notification** action - Disables notification channels for Zoho CRM modules
- **CRM - Get Notification Details** action - Retrieves notification channel configuration and status
- **CRM - Update Notification** action - Updates notification channel settings and event subscriptions
- **CRM - Disable Specific Notification** action - Disables specific notification events while keeping the channel active
