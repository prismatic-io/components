## Changelog

### 2026-10-09

- Added opt-in batching to the **New Records** trigger, dispatching each changed record individually or in configured batches; enabling it changes the shape a downstream step receives
- Added an optional **Look-back Date** input to the **New Records** trigger for performing an initial sync of calls. The initial sync begins on the first recurrence and backfills every call started on or after the specified date, seeding each once and ignoring the visibility filter. It applies to the Calls resource only and has no effect on Users. Leave it empty to start from the first recurrence with no backfill

### 2026-05-20

Applied automated security patches and code formatting updates

### 2026-04-30

Updated spectral version

### 2026-04-21

Added **New Records** polling trigger that checks for new calls or users in Gong on a configured schedule

### 2026-03-31

Various modernizations and documentation updates

### 2026-03-27

Added **Workspace ID** input to **List Calls in Folder** action to support inline datasource dependencies

### 2026-02-24

Added inline data source for Call IDs input to enhance data selection capabilities

### 2025-09-03

- Added data sources and inline data sources for Folders, Workspaces, Users, and Calls.
