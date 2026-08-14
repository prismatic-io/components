## Changelog

### 2026-08-14

Enhanced action configuration and connection security:
- Grouped the paging and query-control inputs on **List Devices**, **List Groups**, and **List Packages** into the **Pagination** and **Filters** structured objects; **Fetch All** remains a top-level toggle
- Fixed **List Devices** to send configured custom query parameters, which were previously discarded
- Changed the **API Key** connection field to a masked password field
- Added output schemas to the **Create Deployment**, **Get Device**, **List Devices**, **List Groups**, **Get Package**, and **List Packages** actions for improved field mapping during configuration
- Added inline action calling support across all actions for improved example output during configuration

### 2026-06-09

Added the **New Records** polling trigger for Devices and Groups, which checks for records added since the last run

### 2026-04-30

Updated spectral version

### 2025-08-29

Added data sources and inline data sources for Devices, Groups, and Packages:
- Updated all string input placeholders to follow Guru standards (using "Enter..." pattern)
- Fixed connection label to follow standards (removed component name from label)
- Added marketing categories configuration
