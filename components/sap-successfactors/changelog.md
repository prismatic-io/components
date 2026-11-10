## Changelog

### 2026-11-10

Refactored internal code

### 2026-11-05

Updated spectral to 10.38.5 and switched the build from webpack to tsdown:
- tsdown 0.22.3

### 2026-06-23

Notice of Deprecation for the **Basic Authentication** connection. SAP SuccessFactors will be deactivating HTTP Basic Authentication on November 20, 2026:

- Added a deprecation notice to the **Basic Authentication** connection and its documentation
- Promoted **API Key Authentication** as the recommended connection method going forward.

### 2026-05-05

Added **New and Updated Records** polling trigger for detecting new and modified records across multiple resource types, with the following capabilities:

- Supports Candidate, Job Application, Job Requisition, and Onboarding Candidate Info records
- Performs server-side filtering by last modified date for efficient change detection
- Works with both **Basic Authentication** and **API Key Authentication** connections

### 2026-04-30

Updated spectral version

### 2026-02-24

Added inline data sources for Job Application ID and Candidate ID inputs to enhance data selection capabilities

### 2025-10-02

- Enhanced SAML assertion handling with improved error reporting and promisified authentication flow
