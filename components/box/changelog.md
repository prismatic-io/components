## Changelog

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
