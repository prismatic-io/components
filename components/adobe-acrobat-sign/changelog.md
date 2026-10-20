## Changelog

### 2026-10-20

Updated the **New and Updated Agreements** polling trigger with batching and initial sync support:

- Added opt-in batching to the **New and Updated Agreements** trigger, dispatching each changed record individually or in configured batches so large backlogs drain in one recurrence; enabling it changes the shape a downstream step receives
- Added an optional **Look-back Date** input for performing an initial sync of records. The initial sync begins on the first recurrence and backfills every record modified on or after the specified date, seeding each once and ignoring the visibility filters; later recurrences are unaffected. Leave it empty to start from the first recurrence with no backfill

### 2026-08-05

Removed the deprecated `webhookNotificationApplicableUsers` field from the webhook trigger's example payload, aligning the documentation with Adobe Acrobat Sign's July 2025 webhook payload change

### 2026-07-01

Restructured action inputs into structured objects for an improved user experience.

- List actions (**List Agreements**, **List Groups**, **List Group Events**, **List Group Users**, **List Users**, and **List Webhooks**) group their pagination inputs into a **Pagination** structured object; **Fetch All** stays a top-level toggle
- **Create Webhook** and **Update Webhook** group their application inputs into a **Webhook Application** structured object
- **Create User**, **Update User**, and **Create Account** group their optional inputs into an **Additional Fields** structured object

### 2026-06-03

Added **New and Updated Agreements** polling trigger that fetches agreements created or modified since the last poll

### 2026-05-26

Improved API rate-limit compliance and pagination across list actions and data sources:

### 2026-04-30

Updated spectral version

### 2026-04-07

Added trigger documentation

### 2026-03-31

Various modernizations and documentation updates

### 2026-03-30

Added **Additional Agreement Participants** input to the **Create Agreement** action to support multiple signers and participant roles

### 2025-10-03

Added inline data sources for agreements, users, groups, and webhooks to enhance data selection capabilities
