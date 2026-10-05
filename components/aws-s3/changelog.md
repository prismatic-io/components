## Changelog

### 2026-10-05

Added new inputs and polling trigger capabilities, and fixed issues in file polling, bucket listing, and webhook message verification:

- Added an optional **Version ID** input to the **Get Object** and **Head Object** actions for retrieving a specific object version
- Added an optional **Topic ARN** input to the **Webhook** trigger that rejects messages from any other Amazon SNS topic
- Added opt-in batching to the **New and Updated Files** trigger, dispatching each file individually or in configured batches so large backlogs drain in one recurrence; enabling it changes the shape a downstream step receives
- Added opt-in batching to the **New Buckets** trigger, dispatching each bucket individually or in configured batches; enabling it changes the shape a downstream step receives
- Added an optional **Look-back Date** input on the **New and Updated Files** and **New Buckets** triggers for performing an initial sync. The initial sync begins on the first recurrence and backfills every file modified, or bucket created, on or after the specified date, seeding each once; later recurrences are unaffected. Leave it empty to start from the first recurrence with no backfill
- Updated **List Objects** to group its **Max Keys** and **Continuation Token** inputs into a **Pagination** structured object
- Added inline action calling support across all actions for improved example output during configuration
- Added output schemas to 29 actions for improved field mapping during configuration
- Updated action labels: **Bucket SNS Event Trigger Configuration** is now **Add Bucket SNS Event Notification**, and the **Upload Stream - Create Stream**, **Upload Stream - Write Data**, and **Upload Stream - Close Stream** actions are now **Create Upload Stream**, **Write Upload Stream**, and **Close Upload Stream**
- Fixed the **New and Updated Files** trigger missing files: files beyond the first 1,000 keys in a bucket were never detected, and a file modified in the same second a recurrence started was never returned
- Fixed the **List Buckets** action, the **Select Bucket** data source, and the **New Buckets** trigger failing for AWS accounts with a general purpose bucket quota above 10,000, where Amazon S3 rejects unpaginated bucket listings
- Fixed the **Webhook** trigger accepting messages not signed by Amazon SNS, including forged subscription confirmations it would then confirm against any URL

### 2026-08-05

Various modernizations and documentation updates

### 2026-05-28

Various modernizations and documentation updates

### 2026-04-30

Updated spectral version

### 2025-12-05

- Added **New and Updated Files** polling trigger to detect file changes in S3 buckets on a configured schedule

### 2025-07-11

Added **External ID** optional input to **Assume Role** connection for enhanced security when assuming cross-account IAM roles
