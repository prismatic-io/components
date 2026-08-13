## Changelog

### 2026-08-13

Restructured list action pagination inputs, added output schemas, and enabled inline action calling:

- Grouped the **Start** and **Page Size** inputs into a **Pagination** structured object across all list actions (**List Vendors**, **List Transactions**, **List Bills**, **List Reimbursements**, **List Departments**, **List Locations**, **List Business Entities**, **List General Ledger Accounts**, **List Custom Accounting Fields**, and **List Custom Accounting Field Options**); **Fetch All** stays a top-level toggle
- Added output schemas to 38 actions for improved field mapping during configuration
- Added inline action calling support across all actions so the app builder can show example output during configuration
- Documented the **Authorize URL** and **Token URL** environment selection on the **OAuth 2.0** connection
- List actions run without **Fetch All** now use the Ramp server-side default page size instead of 50

### 2026-05-20

Applied automated security patches and code formatting updates

### 2026-04-30

Updated spectral version

### 2026-04-21

Added **New and Updated Records** polling trigger that checks for new and updated transactions, bills, reimbursements, vendors, and other financial records in Ramp on a configured schedule

### 2026-03-13

Removed the **Debug Request** input from all action inputs. Debug logging is now controlled internally and no longer appears as a configurable field in actions.

### 2026-03-05

Added inline data sources for transactions, reimbursements, custom accounting fields, and custom accounting field options to enhance data selection capabilities
