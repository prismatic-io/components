## Changelog

### 2026-09-17

- Added opt-in batching to the **New and Updated Files** and **Drive Activity** triggers, dispatching each changed record individually or in configured batches so large backlogs drain in one recurrence; enabling it changes the shape a downstream step receives
- Added an optional **Look-back Date** input for performing an initial sync of records on the **New and Updated Files** and **Drive Activity** triggers. The initial sync begins when the instance is deployed and backfills every record modified on or after the specified date, seeding each once; the triggers' own filters continue to apply throughout. Leave it empty to start from the first recurrence with no backfill
- Added output schemas to 16 actions for improved field mapping during configuration
- Added inline action calling support to 22 actions for improved example output during configuration
- Updated **List Files**, **Search Files**, **List Folders**, and **Search Folders** to group their page-size and page-token inputs into **Pagination**, and **Search Files** to group its query controls into **Filters**; **Fetch All** stays a top-level toggle
- Updated **Page Size** so that leaving it empty uses the Google Drive default page size rather than 20, and a non-numeric value is rejected instead of being silently treated as 20
- Updated the **OAuth2** connection setup guidance to include the Drive Activity scope that the **Drive Activity** trigger requires
- Fixed the **New and Updated Files** trigger dropping every change past the first page whenever more than one page had accumulated, and resetting to the present instead of resuming from where it left off
- Fixed the **Drive Activity** trigger returning activity outside the configured **Trigger Events**, **File ID**, **Folder or Drive ID**, and **Consolidation Strategy** selections, and re-reporting activity it had already delivered on every recurrence
- Fixed the **Query Drive Activity** action ignoring its **File ID**, **Folder or Drive ID**, **Filter**, **Consolidation Strategy**, and **Page Token** inputs on the first page of results, and failing outright with **Fetch All** enabled whenever a page carried no activity
- Fixed **Search Files**, **Search Folders**, and **List Folders** failing or matching the wrong files when a **Search**, **Parent Folder ID**, or **Folder ID** value contained an apostrophe or a backslash
- Fixed the **List Files** and **List Folders** dropdowns showing two identical, indistinguishable rows when two items shared a name
- Fixed the **List Files** dropdown erroring when "My Drive" was selected
- Fixed the **Select Drive** dropdown failing when a page of results contained no drives

### 2026-05-18

**List Changes** (and the **New and Updated Files** polling trigger that wraps it) now persists its Google Drive page token in `crossFlowState` keyed by `context.flow.stableId` and `context.stepId` so it survives deployments while keeping per-step page tokens when a flow contains multiple **List Changes** steps. Existing instance-state page tokens are migrated transparently on the next run, with no re-baseline

### 2026-04-30

Updated spectral version

### 2026-03-31

Various modernizations and documentation updates

### 2025-11-19

Enhanced **Search Files** and **Search Folders** actions with shared drive support and improved query handling

### 2025-11-17

Enhanced list and search capabilities with automatic pagination:
- Added **Fetch All** option to List Files, List Folders, Search Files, Search Folders, and List Drives actions to automatically retrieve all results across multiple pages
- Improved **Raw Request** action to respect global debug settings for enhanced troubleshooting

### 2025-09-19

Enhanced **Get File** action to better handle larger file downloads with improved performance and memory optimization

### 2025-05-05

Enhanced **Drive Activity** trigger to watch multiple folders for improved monitoring capabilities
