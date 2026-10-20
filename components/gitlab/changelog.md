## Changelog

### 2026-10-20

Initial release of GitLab component for GitLab.com and self-managed instances, with **Access Token** and **OAuth 2.0** connections that can each reach an instance on a private network through the on-prem agent:

- Added 37 actions for projects, groups, users, branches, commits, repository files, issues, merge requests, notes, pipelines, labels, milestones, project members, and webhooks, including a **Raw Request** action, with data sources for selecting projects, groups, branches, labels, milestones, and users
- Added the **Webhook**, **Webhook Events**, and **New and Updated Records** triggers; **New and Updated Records** detects created and updated issues or merge requests in a project and offers opt-in batching, dispatching each changed record individually or in configured batches; enabling it changes the shape a downstream step receives
- Added an optional **Look-back Date** input to the **New and Updated Records** trigger for performing an initial sync of records. The initial sync begins on the first recurrence and backfills every record modified on or after the specified date, seeding each once and ignoring the trigger's filters; once it completes, later recurrences are unaffected. Leave it empty to start from the first recurrence with no backfill
- Added output schemas to 36 actions for improved field mapping during configuration
- Added inline action calling support to 36 actions for improved example output during configuration
