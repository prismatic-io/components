## Changelog

### 2026-10-21

Updated session handling and added configuration-time support across actions:

- Updated all actions and data sources to isolate each run's Firebase session, so one run can no longer pick up another connection's credentials or close a session another run is using
- Added inline action calling support across all actions for improved example output during configuration
- Added output schemas to the **List Collections**, **Create Document**, and **List Documents** actions for improved field mapping during configuration

### 2026-06-11

- Masked the **Private Key** connection field so the value is hidden in the UI
- Renamed the connection label to **Private Key**

### 2026-04-30

Updated spectral version

### 2025-10-21

Added inline data sources for collections and documents to enhance data selection capabilities
