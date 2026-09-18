## Changelog

### 2026-09-18

Added an initial sync and opt-in batching to the **New and Updated Files** trigger, added output schemas and inline action calling across the component, grouped related action inputs into structured objects, and fixed path handling on the lock actions:

- Added an optional **Look-back Date** input to the **New and Updated Files** trigger for performing an initial sync of the folder's existing files. The initial sync begins when the instance is deployed, reporting each file modified on or after the specified date once; later recurrences are unaffected. Leave it empty to start from the first recurrence with no backfill. An optional **Initial Sync Page Size** input, presented while the instance deploys, sets how many existing entries each backfill request reads
- Added opt-in batching to the **New and Updated Files** trigger, dispatching each changed file individually or in configured batches so a large backlog drains in one recurrence instead of one page per recurrence; enabling it changes the shape a downstream step receives
- Updated the **Search Files**, **List Folder**, **Search Folders**, **List Shared Folders**, and **List Team's Folders** actions to group their paging controls into **Pagination**; **Fetch All** stays a top-level toggle
- Updated **Get Metadata for File or Folder** to group its response-shaping inputs into **Result Options**, **Create Shared Link** to group its password, expiration, and access controls into **Link Settings**, and **Share Folder** to group its access and membership controls into **Sharing Policies**
- Updated the **Webhook** trigger to match the Dropbox signature header regardless of the casing it arrives in, so verification no longer depends on how the header name is delivered
- Fixed **Get File Lock**, **Lock File**, and **Unlock File** failing when **Dynamic Paths** was supplied on its own and **File Path** was left empty; the actions now accept either path input without the other
- Fixed the **List Shared Links** description, which described listing folder contents rather than shared links
- Added output schemas to 29 actions for improved field mapping during configuration
- Added inline action calling support to 31 actions for improved example output during configuration

### 2026-05-28

Added **Fetch All** input to list and search actions to automatically retrieve all pages of results in a single call:

- **List Folder**
- **List Shared Folders**
- **List Shared Links**
- **List Sharing Folders**
- **List Team Folders**
- **Search Files**
- **Search Folders**

### 2026-05-18

**List Changes** now persists its Dropbox cursor in `crossFlowState` keyed by `context.flow.stableId` and the step name so it survives deployments while keeping per-step cursors when a flow contains multiple **List Changes** steps. Existing instance-state cursors are migrated transparently on the next run, with no re-baseline

### 2026-04-30

Updated spectral version

### 2026-03-16

Improved input field documentation with formatted URL links for better readability

### 2026-03-13

Removed the **Debug Request** input from all action inputs. Debug logging is now controlled internally and no longer appears as a configurable field in actions.

### 2025-11-19

Enhanced webhook triggers to support simulated test executions

### 2025-10-08

Fixed **List Changes** action losing cursor position on instance update to ensure reliable pagination
