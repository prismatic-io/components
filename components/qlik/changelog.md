## Changelog

### 2026-11-03

Published the component as an npm package, so code-native integrations can install it and call its actions, triggers and data sources from code with TypeScript types

### 2026-11-02

Updated spectral to 10.34.1

### 2026-10-20

- Added batching to the **New and Updated Records** trigger; enabling it changes the shape a downstream step receives
- Added a **Look-back Date** input to the **New and Updated Records** trigger; the backfill begins on the first recurrence, seeds each record once, and ignores the trigger's filters

### 2026-05-05

Added **New and Updated Records** polling trigger for monitoring Qlik resource changes:

- Supported Spaces, Users, Data Files, and Data Stores as selectable resource types
- Compatible with both **API Key** and **OAuth 2.0** connections
- Emitted each new or updated record since the previous poll as a separate instance

### 2026-04-30

Updated spectral version

### 2026-04-07

Added global debug support across all actions for improved troubleshooting

### 2026-03-05

Added inline data sources for spaces, data stores, data files, users, datasets, data assets, and apps to enhance data selection capabilities
