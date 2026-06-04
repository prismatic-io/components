## Changelog

### 2026-05-26

Added the **New and Updated Issues** polling trigger that monitors Jira on a configured schedule using the `/search/jql` endpoint with a JQL `updated` filter. Results are partitioned into created and updated buckets based on each issue's `created` timestamp

### 2026-04-30

Updated spectral version

### 2026-04-23

Modernized authentication and connection setup with no change to connection behavior or configuration

### 2026-04-08

Made webhook creation idempotent to prevent duplicate webhooks on redeploy

### 2026-02-26

Added **Select Version** inline data source for selecting project versions to enable dynamic dropdown selection

### 2026-02-04

Added **OAuth 2.0 Client Credentials** connection type for service account and machine-to-machine authentication scenarios

### 2025-12-10

Added **Issue Events** trigger with automatic webhook lifecycle management for issue, comment, and attachment events

### 2025-11-04

Enhanced issue search and pagination capabilities:
- Migrated **Search Issues** and **Find Issue** actions to JQL endpoint for improved query reliability
- Added **Fields** input to control which issue fields are returned across search actions
- Improved **Find Issue** action with corrected JQL query syntax
- Replaced **List Issues** action with **List Issues by Project** to fulfill JQL requirements
- Replaced **Select Issue** data source with **Select Issue by Project** to fulfill JQL requirements
- Removed **Query (Deprecated)** action

### 2025-04-25

Added inline data sources for boards, issues, priorities, and webhooks to enhance integration capabilities
