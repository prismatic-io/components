## Changelog

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
