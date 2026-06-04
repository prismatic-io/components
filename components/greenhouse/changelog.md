## Changelog

### 2026-05-26

- Added the **New and Updated Applications** polling trigger using the Harvest API's `last_activity_after` filter. The trigger walks all paginated results and partitions them into created and updated buckets based on each application's `created_at` and `last_activity_at` timestamps
- Changed the **Secret Key** trigger input to a masked password field to prevent the value from being exposed in plaintext within the configuration UI

### 2026-04-30

Updated spectral version

### 2026-04-07

Added trigger documentation and global debug support across all actions for improved troubleshooting

### 2026-03-31

Various modernizations and documentation updates

### 2026-03-13

Removed the **Debug Request** input from all action inputs. Debug logging is now controlled internally and no longer appears as a configurable field in actions.

### 2026-02-26

Added inline data sources for offices, departments, applications, users, candidates, jobs, and templates to enable dynamic dropdown selection
