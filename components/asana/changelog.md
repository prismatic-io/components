## Changelog

### 2026-05-26

Added **New and Updated Tasks** polling trigger that monitors a project for changes via the `modified_since` parameter on Asana's `/tasks` endpoint. Results are partitioned into `created` and `updated` buckets based on each task's `created_at`/`modified_at` ISO 8601 timestamps

### 2026-05-18

Webhook HMAC secrets are now persisted in `crossFlowState` keyed by `context.flow.stableId` so they survive deployments. The **Webhook** trigger continues to read its array of secrets, and the per-resource event triggers their single secret, from instance-state as a fallback when no crossFlowState value exists yet — customers whose webhooks are already registered see no interruption. The legacy instance-state slot is migrated to `crossFlowState` and cleared on the next inbound notification or heartbeat for that flow

### 2026-04-30

Updated spectral version

### 2026-03-31

Various modernizations and documentation updates

### 2026-03-16

Improved input field documentation with formatted URL links for better readability

### 2026-02-26

Added inline data sources for portfolios, custom fields, and attachments to enable dynamic dropdown selection

### 2025-12-02

Added support for granular scopes to the **OAuth 2.0** connection, allowing users to request specific permissions (e.g., tasks:read, projects:write) instead of full account access

### 2025-10-17

Enhanced webhook lifecycle management with improved event trigger handling and automated cleanup

### 2025-09-19

Added inline data sources for projects, sections, tags, tasks, teams, users, and workspaces to enhance data selection capabilities
