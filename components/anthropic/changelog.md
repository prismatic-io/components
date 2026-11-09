## Changelog

### 2026-11-09

Updated spectral to 10.39.1

### 2026-11-05

Updated spectral to 10.39.0

### 2026-11-04

Published the component as an npm package, so code-native integrations can install it and call its actions, triggers and data sources from code with TypeScript types

### 2026-11-02

Updated spectral to 10.34.1 and switched the build from webpack to tsdown:
- tsdown 0.22.3

### 2026-08-14

- Corrected the **Limit** range on the **List Models** action from 1-3 to 1-1000 to match Anthropic's documented maximum; **Fetch All** now pages at 1000 records instead of 3
- Updated the default model from **claude-3-5-sonnet-latest** to **claude-sonnet-4-6** across all actions
- Grouped pagination inputs on the **List Models** action into a **Pagination** structured object, with **Fetch All** remaining a top-level toggle
- Added output schemas to the **Chat**, **Count Tokens**, **Get Model**, and **List Models** actions for improved field mapping during configuration
- Added inline action calling support across all actions for improved example output during configuration

### 2026-04-30

Updated spectral version

### 2026-03-31

Various modernizations and documentation updates

### 2026-03-25

- Updated documentation and various modernizations

### 2025-05-21

Initial release of Anthropic component with AI chat completion, token counting, and model management capabilities
