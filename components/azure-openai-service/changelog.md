## Changelog

### 2026-11-11

Refactored internal code

### 2026-11-10

Published the component as an npm package, so code-native integrations can install it and call its actions, triggers and data sources from code with TypeScript types

### 2026-11-04

Updated spectral to 10.38.5 and switched the build from webpack to tsdown:
- tsdown 0.22.3

### 2026-07-30

Updated Azure Open AI SDK to v6.45.0

### 2026-04-30

Updated spectral version

### 2026-04-01

Migrated to the chat completions API with updated defaults, configuration, and model selection:
- Migrated completions actions to the chat completions API
- Updated default model from gpt-3.5-turbo-instruct to gpt-4o-mini
- Added configurable **API Version** connection field
- Added **Select Model** data source for model dropdown selection
- Added model input to **Create Image** action (replacing hardcoded dalle-3)
- Updated response payload field names

### 2026-03-25

- Updated documentation and various modernizations
