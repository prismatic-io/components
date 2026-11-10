## Changelog

### 2026-11-10

Refactored internal code

### 2026-11-09

Updated spectral to 10.39.1

### 2026-11-05

Updated spectral to 10.39.0

### 2026-11-04

Published the component as an npm package, so code-native integrations can install it and call its actions, triggers and data sources from code with TypeScript types

### 2026-11-03

Updated spectral to 10.34.1

### 2026-10-19

- Added opt-in batching to the **New IDocs** trigger, dispatching each IDoc individually or in configured batches; enabling it changes the shape a downstream step receives

### 2026-04-30

Updated spectral version

### 2026-03-20

Added initial SAP ECC component:
- **Send SOAP Request** action to send SOAP requests to SAP ECC
- **Call BAPI** action with session-aware transaction support
- **Commit Transaction** toggle on **Call BAPI** and **Send SOAP Request** actions, which calls `BAPI_TRANSACTION_COMMIT` on the same HTTP session after the primary request succeeds
- Improved connection labels, input descriptions, and placeholder text for clarity
