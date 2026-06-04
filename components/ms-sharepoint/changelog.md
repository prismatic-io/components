## Changelog

### 2026-05-21

Updated the **List Site Lists** action to include a search query parameter when fetching all lists, ensuring complete results when using delegated authentication

### 2026-04-30

Updated spectral version

### 2026-02-26

Added cross-component connection support for the **Microsoft Excel** component, enabling **SharePoint** connections to access Excel workbooks. Added inline data source for site lists to enable dynamic dropdown selection

### 2026-01-23

Enhanced the **New and Updated Folder Items** trigger to support recursive subfolder monitoring. When the new **Include Subfolders** input is enabled, the trigger now detects changes in all nested subfolders within the specified folder.

### 2025-12-09

Added webhook lifecycle features for managing SharePoint subscription creation, renewal, and deletion:
- **Drive Subscription** trigger for receiving real-time SharePoint change notifications with automatic subscription management
- **Delete All Instance Subscriptions** action for removing all subscriptions associated with an instance endpoint
- **Renew Subscription** action to extend subscription expiration

### 2025-09-16

Added new polling triggers for comprehensive SharePoint monitoring:
- **New and Updated Drive Items** trigger for monitoring drive modifications
- **New and Updated Site Items** trigger for tracking site updates
- **New and Updated Folder Items** trigger for detecting folder content changes

Renamed the OAuth connection configuration key to improve clarity.

### 2025-07-21

Added support for Microsoft Graph sovereign cloud endpoints, enabling SharePoint integration with government and regional cloud instances.

### 2025-07-15

Added **OAuth 2.0 Client Credentials** connection type for server-to-server authentication scenarios where user delegation is not required.
