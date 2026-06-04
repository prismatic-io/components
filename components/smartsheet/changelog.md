## Changelog

### 2026-05-26

Added **New and Updated Sheets** polling trigger. The trigger polls `/sheets` with Smartsheet's server-side `modifiedSince` filter and partitions returned sheets locally into `created` and `updated` buckets by comparing each sheet's own `createdAt` / `modifiedAt` against the last-polled boundary. Inputs: connection, **Show New Records**, **Show Updated Records**. Polling state stores `lastPolledAt` (ISO 8601). Pagination reuses the existing `paginateByPage` helper — when Smartsheet migrates `/sheets` to token-based pagination ahead of the 2026-06-03 sunset, the helper call will be swapped for `paginateByToken`

### 2026-05-08

Updated list actions to use Smartsheet's new cursor-based pagination ahead of the June 3, 2026 deprecation of `includeAll`, `page`, `pageSize`, `totalCount`, and `totalPages`:

- **List Workspaces**, **Select Workspace**, and **Select Folder** now paginate automatically using Smartsheet's `lastKey` cursor
- **List Webhooks**, **Create Webhook**, **Delete Instance Webhooks**, and **Select Webhook** now paginate automatically; webhook results are now ordered by creation date descending (previously name ascending)
- **Get Workspace** and **Get Folder** now fetch metadata and children in parallel to replace the removed single-call expansion endpoint; **List Folders** now filters children client-side by type
- **Templates: List** now auto-paginates across all workspaces when no scope is provided; added optional **Workspace ID For Templates** input to limit results to a single workspace
- **Include All**, **Page**, and **Page Size** inputs are retained for backward compatibility but no longer have any effect; labels updated with `(Deprecated)` suffix
- **Templates: List Public** is not yet migrated — replacement endpoint research is pending
- Breaking change: **Get Workspace** and **Get Folder** responses no longer include `ownerInfo` or `sheetVersion` fields, which Smartsheet removed from the replacement endpoint
- **Load All** on **Get Workspace** no longer has any effect — Smartsheet's API no longer supports recursive nested expansion in a single response; input retained for backward compatibility

### 2026-04-30

Various modernizations and documentation updates

### 2026-04-23

Added optional **Subscope Column IDs** input to the **Create Webhook** action, enabling column-level webhook filtering

### 2026-03-31

Various modernizations and documentation updates

### 2026-03-30

Various modernizations and documentation updates

### 2026-03-05

Added inline data sources for contacts and users to enable dynamic dropdown selection

### 2025-08-29

Initial release of Smartsheet component with comprehensive sheet and workspace management capabilities
