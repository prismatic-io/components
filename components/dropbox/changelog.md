## Changelog

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
