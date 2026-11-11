## Changelog

### 2026-11-11

Refactored internal code

### 2026-11-10

Published the component as an npm package, so code-native integrations can install it and call its actions, triggers and data sources from code with TypeScript types

### 2026-11-02

Updated spectral to 10.34.1 and switched the build from webpack to tsdown:
- tsdown 0.22.3

### 2026-04-30

Updated spectral version

### 2026-04-07

Added global debug support across all actions for improved troubleshooting

### 2025-12-05

**Update Meeting** input **Type Recurrence** is now optional.


### 2025-11-19

Enhanced the **Webhook** trigger to support simulated test executions, allowing integration flows to be tested without waiting for real Zoom events.

### 2025-07-25

Added inline data sources across multiple actions for easier resource selection:
- **Meetings** - Select from scheduled and past meetings
- **Recordings** - Choose from available cloud recordings
- **Users** - Pick from organization users
- **Webinars** - Select from scheduled webinars
- **Chat Messages** - Reference chat messages in workflows

### 2025-04-24

Improved action usability with two enhancements:
- Added **Select User** data source to actions requiring user IDs, enabling selection from a dropdown instead of manual ID entry
- Added debug logging to all actions for easier troubleshooting during workflow development
