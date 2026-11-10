## Changelog

### 2026-11-10

Published the component as an npm package, so code-native integrations can install it and call its actions, triggers and data sources from code with TypeScript types

### 2026-11-10

Refactored internal code

### 2026-11-02

Updated spectral to 10.34.1

### 2026-10-19

- Added opt-in batching to the **New Messages** trigger, dispatching each message individually or in configured batches; enabling it changes the shape a downstream step receives
- Added an optional **Look-back Date** input to the **New Messages** trigger for performing an initial sync of messages. The initial sync begins on the first recurrence and backfills every message still retained in the queue that was sent on or after the specified date, seeding each once; later recurrences are unaffected. Leave it empty to start from the first recurrence with no backfill

### 2026-08-05

Various modernizations and documentation updates

### 2026-05-28

Various modernizations and documentation updates

### 2026-04-30

Updated spectral version

### 2026-03-31

Various modernizations and documentation updates

### 2025-11-25

Enhanced webhook triggers to support simulated test executions for improved manual testing capabilities

### 2025-05-30

Added ability to create Dead Letter Queues for improved message handling and error recovery
