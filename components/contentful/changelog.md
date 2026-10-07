## Changelog

### 2026-10-07

Added inline action calling, output schemas, trigger initial sync and batching, and webhook request verification, and improved trigger and upload reliability:

- Added inline action calling support to 54 actions for improved example output during configuration
- Added output schemas to 47 actions for improved field mapping during configuration
- Added opt-in batching to the **New and Updated Entries** trigger, dispatching each changed entry individually or in configured batches; enabling it changes the shape a downstream step receives
- Added an optional **Look-back Date** input to the **New and Updated Entries** trigger for performing an initial sync of entries. The initial sync begins on the first recurrence and backfills every entry modified on or after the specified date, seeding each once and ignoring the visibility filters. Leave it empty to start from the first recurrence with no backfill
- Added an optional **Webhook Signing Secret** input to the **Event Subscription** and **Webhook** triggers that rejects requests failing Contentful's request verification
- Updated the **New and Updated Entries** trigger to deliver every changed entry when more change between recurrences than a single recurrence fetches; the remainder is delivered on the following recurrences
- Updated the **Event Subscription** trigger to reuse its existing Contentful webhook on redeploy, updating its events in place rather than creating another webhook that invoked the flow again; duplicates left by earlier deploys, and the webhook in a previously configured space, are removed
- Updated **Upload File** to send the file's raw bytes, so the upload stores the file's content
- Updated the **Scopes** input on the **OAuth 2.0** connection to a dropdown of the scopes Contentful accepts

### 2026-06-03

Added the **New and Updated Entries** polling trigger that monitors entries for changes

### 2026-05-20

Applied automated security patches and code formatting updates

### 2026-04-30

Updated spectral version

### 2026-04-06

Added **Archive Entry**, **Unarchive Entry**, **Put Entry**, **Patch Entry**, and **List Published Entries** actions

### 2026-03-24

Added **Template ID** input to the **Select Environment Template** inline data source for selecting environment templates from a dropdown

### 2026-03-05

Added inline data sources for content types, entries, assets, and webhooks to enhance resource selection with dropdown pickers

Updated OAuth scope default to use a single scope per authorization request, resolving an authorization error on Contentful's consent page caused by the previous multi-scope default
