## Changelog

### 2026-10-13

- Added batching to the **New and Updated Indices** polling trigger; enabling it changes the shape a downstream step receives
- Added an initial sync to the **New and Updated Indices** polling trigger via the **Look-back Date** input; the backfill seeds every index updated after the specified date once on the first recurrence

### 2026-05-20

Applied automated security patches and code formatting updates

### 2026-04-30

Updated spectral version

### 2026-04-21

Added **New and Updated Indices** polling trigger that checks for new and updated search indices in Algolia on a configured schedule

### 2026-04-10

Updated example payloads

### 2026-04-07

Added global debug support across all actions for improved troubleshooting

### 2026-03-31

Various modernizations and documentation updates

### 2026-03-05

Added inline data source for index selection to enhance data selection capabilities across index-related actions
