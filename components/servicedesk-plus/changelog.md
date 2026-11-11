## Changelog

### 2026-11-11

Refactored internal code

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

### 2026-10-20

Added batching to the **New Records** trigger; enabling it changes the shape a downstream step receives

### 2026-07-20

Restructured action inputs into structured objects for an improved user experience.

- List actions (**List Problems**, **List Problem Notes**, **List Problem Tasks**, **List Requests**, **List Request Tasks**, **List Assets**, **List Configuration Items**, **List Products**, **List Product Types**) group their paging inputs into **Pagination**; **Fetch All** stays a top-level toggle
- **Create Problem** and **Update Problem** group their problem-time inputs into **Problem Times**
- **Create Problem Task** and **Update Problem Task** group their effort inputs into **Estimated Effort**
- **Create Product** and **Update Product** group their product-spec inputs into **Product Details**
- **Create Asset** and **Update Asset** group their **Asset Tag**, **State History Comments**, and **Bar Code** inputs into **Additional Fields**

### 2026-05-20

Applied automated security patches and code formatting updates

### 2026-04-30

Updated spectral version

### 2026-04-21

Added **New Records** polling trigger that checks for new requests, problems, or assets in ServiceDesk Plus on a configured schedule, using ID-based change detection

### 2026-03-31

Various modernizations and documentation updates

### 2026-03-16

Improved input field documentation with formatted URL links for better readability

### 2026-03-13

Removed the **Debug Request** input from all action inputs. Debug logging is now controlled internally and no longer appears as a configurable field in actions.

### 2025-11-13

The **Token URL** has been made as an editable field on the **OAuth 2.0** connection.
