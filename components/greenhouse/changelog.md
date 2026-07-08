## Changelog

### 2026-07-08

Restructured action inputs into structured objects for an improved configuration experience

- **Create Candidate** and **Edit Candidate** group their contact inputs into **Contact Information**; **Edit Candidate** additionally groups its optional name inputs into **Name Information** (Create Candidate's name inputs are required and stay flat)
- The list actions (**List Candidates**, **List Applications**, **List Jobs**, **List Users**, and **List Attachments**) group their created, updated, and last-activity date filters into **Date Range Filters**
- **List Applications**, **List Attachments**, **List Users**, and **List Jobs** group their record-ID filters into **ID Filters**
- **Edit Application** groups its source, referrer, recruiter, coordinator, and prospect IDs into an **Assignment IDs** structured object
- **Reject Application** groups its rejection email inputs into a **Rejection Email** structured object
- Grouped pagination inputs into a **Pagination** structured object across the list actions (breaking: input keys changed); update saved integration configurations to use the new nested keys:
  - **List Jobs (Harvest v1/v2)**, **List Candidates (Harvest v1/v2)**, **List Applications (Harvest v1/v2)**, **List Users (Harvest v1/v2)**: `per_page` → `pagination.per_page`, `page` → `pagination.page`
  - **List Jobs**, **List Candidates**, **List Applications**, **List Users**, **List Attachments** (Harvest v3): `perPage` → `pagination.perPage`, `cursor` → `pagination.cursor`; `fetchAll` stays a top-level input

### 2026-06-12

- Added full Harvest v3 API support alongside the existing v1/v2 surface; the v1/v2 API sunsets on August 31, 2026, so existing actions keep working unchanged until then and their labels now carry a **(Harvest v1/v2)** suffix
- Added the **OAuth 2.0 Client Credentials (Harvest V3)** connection for the Harvest v3 API
- Added 25 v3 actions with clean labels: **List/Get/Edit/Delete Application**, the new **Reject Application** and **Unreject Application** (v3 moves rejection out of application edits), **List/Get/Create/Edit/Delete Candidate**, the new **List/Create/Delete Attachment** actions (v3 moves candidate attachments to a dedicated resource), **List/Get/Create/Edit Job**, **List/Get/Create/Edit User**, **Activate User** and **Deactivate User** (replacing v1 enable/disable), and a v3 **Raw Request**
- Added the v3 **New and Updated Applications** polling trigger using the `last_activity_at[gte]` filter with cursor-based pagination; the v1 trigger remains available as deprecated
- Added v3 data sources for applications, candidates, custom fields, departments, jobs, offices, users, and the new **Fetch Rejection Reasons** powering the Reject Application dropdown
- Changed the **API Key** connection label to **API Key (Harvest v1/v2)** — it only reaches the sunsetting v1/v2 API
- Added the deprecated v1 **New and Updated Applications** polling trigger using the Harvest API's `last_activity_after` filter, walking all paginated results and partitioning them into created and updated buckets based on each application's `created_at` and `last_activity_at` timestamps
- Changed the **Secret Key** trigger input to a masked password field to prevent the value from being exposed in plaintext within the configuration UI

### 2026-04-30

Updated spectral version

### 2026-04-07

Added trigger documentation and global debug support across all actions for improved troubleshooting

### 2026-03-31

Various modernizations and documentation updates

### 2026-03-13

Removed the **Debug Request** input from all action inputs. Debug logging is now controlled internally and no longer appears as a configurable field in actions.

### 2026-02-26

Added inline data sources for offices, departments, applications, users, candidates, jobs, and templates to enable dynamic dropdown selection
