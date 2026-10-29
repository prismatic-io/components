## Changelog

### 2026-10-29

Initial release of the Microsoft Planner component for managing plans, buckets, tasks, and task details through the Microsoft Graph Planner API:

- Added 26 actions across plans, buckets, and tasks, including **Raw Request** for arbitrary API calls
- Added **OAuth 2.0 Authorization Code** and **OAuth 2.0 Client Credentials** connections
- Added inline data sources for selecting groups, plans, buckets, tasks, and users
- Added the **New Tasks** polling trigger that checks a plan for newly created tasks, with opt-in batching that dispatches each task individually or in configured batches; enabling it changes the shape a downstream step receives. Planner records no modification timestamp, so edited, completed, and deleted tasks are not detected
- Added an optional **Look-back Date** input on the **New Tasks** trigger for performing an initial sync of tasks. The initial sync begins on the first recurrence, backfills every task created on or after the specified date, and seeds each once. Leave it empty to start from the first recurrence with no backfill
- Added output schemas to 25 actions for improved field mapping during configuration
- Added inline action calling support to 25 actions for improved example output during configuration
