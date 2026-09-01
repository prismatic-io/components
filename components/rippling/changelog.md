## Changelog

### 2026-09-01

Grouped related optional inputs into structured objects for clearer configuration:

- **All list actions**: grouped pagination inputs (Limit and Offset on V1 actions; Order By and Cursor on V2 actions; Next and Limit on **Get Company Activity (V1)**) into a **Pagination** object; **Fetch All** remains a top-level toggle
- **Post Ats Candidates Push Candidate (V1)**: grouped Name, Email, and Phone Number into a **Name & Contact Information** object; Salary Unit, Salary Per Unit, Signing Bonus, Equity Shares, and Currency into a **Compensation** object; and Job Title, Start Date, Department, Employment Type, and Attachments into an **Additional Fields** object
- **Get Leave Requests (V1)**: grouped Start Date, End Date, From, and To into a **Date Range Filters** object
- **Put Groups Group Id (V1)** and **Patch Groups Group Id (V1)**: grouped Name, Spoke ID, Users, and Version into an **Additional Fields** object
- **Update Custom Object (V2)**: grouped Name, Description, Category, Plural Label, and Owner Role into an **Additional Fields** object

### 2026-05-14

Added bulk pagination support to V1 and V2 list actions, allowing users to fetch all pages of results in a single action invocation

### 2026-04-30

Updated spectral version

### 2026-04-21

Added **New and Updated Records** polling trigger that checks for new and updated workers, users, departments, and teams in Rippling on a configured schedule

### 2026-03-05

Added inline data sources for workers, departments, teams, users, work locations, employment types, job functions, supergroups, business partner groups, and object categories to enable dynamic dropdown selection

### 2026-02-25

Added comprehensive V2 API actions with improved filtering, expansion, and sorting support:

- **Business Partner Groups** - List, Get, Create, and Delete business partner groups
- **Business Partners** - List, Get, Create, and Delete business partners
- **Companies** - List companies
- **Custom Fields** - List custom fields
- **Custom Objects** - List, Get, Create, Update, and Delete custom objects
- **Departments** - List and Get departments
- **Employment Types** - List and Get employment types
- **Entitlements** - List entitlements
- **Job Functions** - List and Get job functions
- **Object Categories** - List, Get, Create, Update, and Delete object categories
- **Supergroups** - List and Get supergroups
- **Teams** - List and Get teams
- **Users** - List and Get users
- **Work Locations** - List and Get work locations
- **Workers** - List and Get workers
- **Get SSO Me** - Retrieve current user information
- **Raw Request (V2)** - Make custom V2 API requests
