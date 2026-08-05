## Changelog

### 2026-08-05

Deprecated the **Create Payment** action and restructured action inputs into structured objects for an improved user experience:

- List actions group page and page-size inputs into **Pagination**; **Fetch All** stays a top-level toggle
- **Create Invoices** and **Update Invoice** group royalty-related inputs into **Royalty Details**
- **Update Invoice Items** groups miscellaneous optional inputs into **Additional Fields**
- **Create Installed Equipment** and **Update Installed Equipment** group warranty date inputs into **Warranty Dates**
- **Create Technician** and **Update Technician** group optional profile inputs into **Additional Fields**

### 2026-05-20

Various modernizations and documentation updates

### 2026-04-30

Updated spectral version

### 2026-04-21

Added **New and Updated Records** polling trigger that checks for new and updated jobs, appointments, invoices, customers, and other records in ServiceTitan on a configured schedule

### 2026-03-13

Removed the **Debug Request** input from all action inputs. Debug logging is now controlled internally and no longer appears as a configurable field in actions.

### 2026-02-26

Added inline data sources for business units, user roles, job cancel reasons, customer contacts, and payments to enable dynamic dropdown selection
