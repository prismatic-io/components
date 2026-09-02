## Changelog

### 2026-09-02

Restructured action inputs into structured objects for an improved user experience.

- List actions group their paging inputs into **Pagination**: offset-based on **List Posts**, **List Categories**, **List Tags**, and **List Changelog Entries**; cursor-based on **List Comments**, **List Votes**, **List Users**, **List Companies**, and **List Status Changes**. **Fetch All** stays a top-level toggle
- **List Posts** groups its search, sort, and status filters into **List Controls**
- **Create Post**, **Update Post**, **Create Comment**, **Update Company**, **Create or Update User**, and **Create Changelog Entry** group their less common optional inputs into **Additional Fields**
- Added output schemas to every action except **Raw Request**, so a later step can reference response fields without running the action first
- Added inline action calling support to 26 actions for improved example output during configuration
- Added optional batching to the **New and Updated Posts** trigger; enabling it changes the shape a downstream step receives
- Added a **Look-back Date** input to the **New and Updated Posts** trigger for performing an initial sync of records. The initial sync begins on the first recurrence, seeds each record once, and ignores the trigger's filters
- Fixed **Create Changelog Entry** silently discarding every value supplied in **Additional Fields**; those values now reach Canny
- Fixed the **Webhook** trigger rejecting every test invocation with a signature error; it now skips signature verification when the platform runs a test execution

### 2026-06-02

Added the **New and Updated Posts** polling trigger, which checks for posts created or with a status change since the last run

### 2026-04-21

Initial release of the Canny component with support for boards, posts, comments, votes, categories, tags, users, companies, changelog entries, and status changes.
