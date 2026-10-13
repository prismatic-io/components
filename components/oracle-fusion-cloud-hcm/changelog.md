## Changelog

### 2026-10-13

Added batching, initial sync, and a pagination fix to the polling triggers:
- Fixed the **Atom Feed Notifications** trigger silently dropping feed entries beyond the first page
- Added batching support to the **Atom Feed Notifications** and **New and Updated Records** polling triggers; enabling it changes the shape a downstream step receives
- Added initial sync via the **Look-back Date** input on the **Atom Feed Notifications** and **New and Updated Records** polling triggers; the backfill begins on the first recurrence and each record is seeded once

### 2026-08-10

Initial release of the Oracle Fusion Cloud HCM component with the following capabilities:
- **List Public Workers**, **Get Public Worker** for reading worker records, plus **List Workers**, **Get Worker**, **Create Worker**, **Update Worker** on the writable Workers resource for managing employee and worker records with individual name fields, worker information, and repeatable addresses, emails, phones, national identifiers, and work relationships
- **List Assignments**, **Get Assignment** for retrieving job, department, location, manager, and employment type details
- **List Departments**, **Get Department** for retrieving organizational units
- **List Jobs**, **Get Job** for retrieving job definitions
- **List Locations**, **Get Location**, **Create Location**, **Update Location**, **Delete Location** for managing work locations via the Locations V2 resource
- **List Positions**, **Get Position** for retrieving approved headcount positions
- **List Grades**, **Get Grade** for retrieving compensation grades
- **List Absences**, **Get Absence**, **Create Absence**, **Update Absence**, **Delete Absence** for managing absence entries
- **Fetch All** option on every list action to retrieve all pages of results in a single step
- **Select Job**, **Select Department**, **Select Location**, **Select Grade**, **Select Position**, and **Select Person ID** data sources for use in config page dropdowns
- **Raw Request** for sending arbitrary HTTP requests to the Oracle Fusion Cloud HCM REST API
- Supports **Basic Auth** and **OAuth 2.0** Client Credentials (via Oracle Identity Domains) authentication
