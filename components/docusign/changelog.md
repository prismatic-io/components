## Changelog

### 2026-11-12

Updated the **OAuth 2.0** connection, several actions, and the **Account Level Trigger**:

- Updated the **OAuth 2.0** connection so the **Authorization Header** input is optional; the **Integration Key** and **Secret Key** are sent to DocuSign automatically, so the header no longer needs to be built by hand
- Fixed **Delete Contact** failing with a not-found error because its request omitted the account ID
- Fixed **Create Contact** and **Update Contact** rejecting their default request body; the default now uses the `contactList` key DocuSign expects
- Updated the **Account Level Trigger** to reject a webhook whose signature is the wrong length with its standard "Invalid or missing signature." error instead of a `RangeError`
- Updated **Create Account** to group its address and initial user inputs into **Address** and **Initial User** structured objects, and **List Folders** to group its page controls into **Pagination**; **Fetch All** stays a top-level toggle
- Added output schemas to 42 actions for improved field mapping during configuration
- Added inline action calling support to 49 actions for improved example output during configuration

### 2026-11-11

Updated the component description to better summarize what the component does

### 2026-11-10

Refactored internal code

### 2026-11-09

Updated spectral to 10.39.1

### 2026-11-05

Updated spectral to 10.39.0

### 2026-11-03

Published the component as an npm package, so code-native integrations can install it and call its actions, triggers and data sources from code with TypeScript types

### 2026-11-02

Updated spectral to 10.34.1 and switched the build from webpack to tsdown:
- tsdown 0.22.3

### 2026-06-11

Added **Fetch All** toggle to list actions (List Templates, List Folders, List Folder Items) that automatically paginates through all results using `startPosition`/`count` pagination; when disabled, existing single-page behavior is preserved

### 2026-04-30

Updated spectral version

### 2026-04-07

Added trigger documentation

### 2026-03-31

Various modernizations and documentation updates

### 2025-10-22

Enhanced webhook lifecycle management with improved trigger subscription handling and automated cleanup
