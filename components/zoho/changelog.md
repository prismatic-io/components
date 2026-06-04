## Changelog

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
