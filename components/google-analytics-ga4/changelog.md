## Changelog

### 2026-08-17

Restructured list action inputs into structured objects and improved paging reliability:

- Grouped the page and page-size inputs on **List Accounts** and **List Properties** into **Pagination**; **Fetch All** stays a top-level toggle
- Fixed **Fetch All** on **List Properties**, and the properties dropdown, so the account filter is applied to every page rather than only the first
- Fixed list actions, data sources, and the **New and Updated Records** trigger to return an empty result instead of erroring when no records match
- Added output schemas to the **List Accounts**, **List Properties**, **Get Property**, **Run Report**, and **Send Measurement Protocol Events** actions for improved field mapping during configuration
- Added inline action calling support across all actions for improved example output during configuration

### 2026-05-05

Added **New and Updated Records** trigger supporting Accounts and Properties

### 2026-04-30

Updated spectral version

### 2026-03-31

Various modernizations and documentation updates

### 2026-03-27

Added optional **Account ID** input to **Run Report** action to support inline datasource dependencies

### 2026-03-16

Improved input field documentation with formatted URL links for better readability

### 2025-10-17

Added inline data sources for accounts and properties to enhance data selection capabilities
