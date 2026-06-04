## Changelog

### 2026-04-30

Updated spectral version

### 2026-03-20

Added initial SAP ECC component:
- **Send SOAP Request** action to send SOAP requests to SAP ECC
- **Call BAPI** action with session-aware transaction support
- **Commit Transaction** toggle on **Call BAPI** and **Send SOAP Request** actions, which calls `BAPI_TRANSACTION_COMMIT` on the same HTTP session after the primary request succeeds
- Improved connection labels, input descriptions, and placeholder text for clarity
