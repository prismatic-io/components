## Changelog

### 2026-08-13

Restructured action inputs into structured objects for an improved user experience.

- List actions (**List Users**, **List Managed Devices**, **List Mobile Apps**, **List Managed Apps**, and **List Detected Apps**) group their OData inputs into **Pagination** and **Filters**; **Fetch All** stays a top-level toggle
- **List Directory Audits** groups its OData inputs into **Pagination** and **Filters**; **Fetch All** stays a top-level toggle
- **List Domains** groups its OData inputs into **Pagination** and **Filters**
- **List Groups**, **List Group Members**, and **List Software Update Status Summary** group their OData query inputs into **Filters**
- **Update User** groups **First Name** and **Last Name** into a **Name** structured object
- **Update Software Update Status Summary** groups device-level compliance counts into **Device Counts** and user-level compliance counts into **User Counts**
- **Create Managed App**, **Update Managed App**, **Create Group**, and **Update Group** group their secondary metadata inputs into **Additional Fields**
- Renamed the **Resource Trigger** trigger to **Resource Change**

### 2026-04-30

Updated spectral version

### 2026-04-07

Added global debug support across all actions for improved troubleshooting

### 2026-04-06

Added Fetch All pagination support to **List Managed Devices**, **List Users**, **List Detected Apps**, **List Managed Apps**, and **List Group Members** actions

### 2026-02-26

Added inline data sources for users, subscriptions, directory audits, device configurations, device compliance policies, and compliance policy setting summaries to enable dynamic dropdown selection

### 2025-12-09

Fixed an issue related to **Add Group Member** action to correctly add members to groups

### 2025-10-17

Enhanced webhook trigger reliability with automatic subscription renewal and cleanup of orphaned webhooks

### 2025-07-11

Added group member management actions:
- **Add Group Member** - Add a single member to a Microsoft Intune group
- **Add Group Members** - Add multiple members to a group in bulk

### 2025-05-15

Added **Client Credentials** connection type for server-to-server authentication with Microsoft Intune
