## Changelog

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
