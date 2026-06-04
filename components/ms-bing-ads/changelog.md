## Changelog

### 2026-04-30

Updated spectral version

### 2026-04-21

Fixed **Add Offline Conversions Goal** action where `IsExternallyAttributed` was placed mid-sequence in the SOAP request, causing the strict `xs:sequence` parser to report `ConversionGoalNameNotPassed`; moved the element to the end so derived `OfflineConversionGoal` fields follow all base `ConversionGoal` fields per schema inheritance order

### 2026-04-16

Fixed **Add Offline Conversions Goal** action that was entirely non-functional due to malformed SOAP request payloads, causing all calls to fail with server-side parse errors

### 2026-04-14

Added sandbox environment toggle to the **OAuth 2.0** connection for switching between production and sandbox API endpoints

### 2025-04-30

Added global debug and inline data source features for enhanced debugging and data selection capabilities
