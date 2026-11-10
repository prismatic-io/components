## Changelog

### 2026-11-10

Refactored internal code

### 2026-11-04

Updated spectral to 10.38.5 and switched the build from webpack to tsdown:
- tsdown 0.22.3

### 2026-07-21

Grouped related inputs into structured objects across the topic and subscription actions:

- Grouped **Page Token** and **Page Size** into a **Pagination** object on **List Topics** and **List Subscriptions**
- Grouped **Push Endpoint**, **Attributes**, and **OIDC Token** into a **Push Configuration** object on **Update Push Config**
- Added an **Additional Fields** object to **Create Subscription**, **Update Subscription**, **Create Topic**, and **Update Topic**

### 2026-04-30

Updated spectral version

### 2026-04-07

Added global debug support across all actions for improved troubleshooting

### 2025-10-28

Added inline data sources for topics and subscriptions to enhance data selection capabilities
