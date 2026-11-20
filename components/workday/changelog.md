## Changelog

### 2026-11-20

Initial production release of the Workday component, removing it from the Beta program:

- Fixed actions, data sources, and the **New Event Steps** trigger failing with 404 or 503 errors on every Workday REST service except Prism Analytics and WQL (requests now carry the tenant from the **Token URL** of an **OAuth 2.0** connection or the **REST API Endpoint** of a **Refresh Token** connection), and the **Changed WQL Query Rows** trigger being rejected by Workday with an Invalid WHERE clause error
- Fixed data sources listing at most 20 options; each now lists up to 10,000, and **Select Worker** now returns each worker's Workday ID as the selected value
- Fixed **Upload Files by Container ID** uploading an empty file when a **Refresh Token** connection fetched a new access token and resent the request
- Added the **List Time Off Balances** action for reading a worker's time off balances, optionally limited to one category and as of an effective date, taken as the calendar date entered
- Added the **Select Business Process Type**, **Select Currency**, **Select Customer**, **Select Notification Type**, and **Select Supervisory Organization** data sources as dropdowns on the inputs that take those IDs
- Added a required **Worker ID** input to **List Events**, since Workday returns no events without one, and an optional **Worker ID** to **Get Event by ID** and **Get Event Attachments** that filters the **Event ID** dropdown
- Added **Lines** to **Create Supplier Invoice Request** with one row per invoice line, a **Currency** input to **Create Payment**, which Workday requires with **Amount**, and **Calendar Date** (sent as the date entered), **Reported Quantity**, and **Time Entry Code ID** to **Create Worker Time Block** and **Update Worker Time Block**
- Updated **Create Supplier Invoice Request** to send **Tax Amount** and **Control Total Amount** as Workday currency amounts, **Create Payment** to send **Payment Date** as the calendar date entered so neither the tenant's time zone nor a UTC offset moves it to another day, **Create Worker Time Block** to name the worker in the request, **Send Message** to send **Contacts** in the form Workday expects, **Update Table by ID** to leave a blank **Display Name** or **Name** out of the request instead of sending an empty value, and **Run WQL Query** and **Changed WQL Query Rows** to use the tenant from the **Token URL** of an **OAuth 2.0** connection when **Tenant** is left blank
- Updated **Days** on **Create Time Off Request** to take one row per day, and **Contacts** on **Send Message** to take a list of contact IDs with a worker dropdown, in place of JSON arrays
- Updated **Create Job Change**, **Create Worker Business Title Change**, and **Update Time Clock Event by ID** to group **Instance ID**, **Instance Href**, and **Instance Descriptor**, now optional, into an **Instance Reference** structured object, **Create Supplier Invoice Request** to group **Requester ID**, **Payment Terms ID**, and **Reference Type ID** into an **Assignment IDs** structured object, and **Supplier Invoice Instance ID** and **Supplier Invoice Instance Descriptor** to optional on **Submit Supplier Invoice Request**
- Updated **Create Supplier Invoice Request Attachment** to add an extension from the file's suggested extension or, failing that, its content type to the default file name, since Workday rejects a name without one, and to ask for **File Name** when neither gives one
- Updated error messages to include Workday's error text and leave out the response headers, and to decode the error body of **Get Invoice PDF**

### 2026-11-19

Updated dependencies and refactored internal code:
- tsdown 0.23.7

### 2026-11-11

Updated the component description to better summarize what the component does

### 2026-11-10

Refactored internal code

### 2026-11-09

Updated spectral to 10.39.1

### 2026-11-05

Updated spectral to 10.39.0

### 2026-11-04

Published the component as an npm package, so code-native integrations can install it and call its actions, triggers and data sources from code with TypeScript types

### 2026-10-26

Added refresh token authentication, report and query actions, and polling triggers, and updated existing actions:

- Added the **Refresh Token** connection for authenticating with an API Client for Integrations and a refresh token, without browser sign-in
- Added the **Get RaaS Report**, **Run WQL Query**, and **Verify Connection** actions for reading custom reports, running Workday Query Language queries, and confirming that a connection can authenticate
- Added the **Changed RaaS Report Rows**, **Changed WQL Query Rows**, and **New Event Steps** polling triggers, with opt-in batching that dispatches each record individually or in configured batches; enabling batching changes the shape a downstream step receives
- Added an optional **Look-back Date** input across all polling triggers for performing an initial sync of records. The initial sync begins on the first recurrence and backfills every record from the specified date on, seeding each once; later recurrences are unaffected. Leave it empty to start from the first recurrence with no backfill
- Added output schemas to 53 actions for improved field mapping during configuration
- Added inline action calling support to 57 actions for improved example output during configuration
- Added **Fetch All** and **Pagination** to **List Organizations**, **List Message Templates**, **List Invoices**, and **Get Time Clock Events**; **Fetch All** stays a top-level toggle
- Updated **Create Time Off Request**, **Create Supplier Invoice Request**, and **Update Time Clock Event by ID** to group related inputs into the **Business Process Parameters**, **Amounts**, and **Assignment IDs** structured objects respectively
- Updated Time Tracking endpoints from v5 to v7, which removes the **Clock Event Date Time** and **Clock Event Time Zone ID** inputs from **Update Time Clock Event by ID**
- Updated **Send Message** to take its email and push notification content as individual **Message Details** fields (**Email Detail Name**, **Email Detail Subject**, **Email Detail Body**, **Email Detail Reply To**, **Push Detail Message**, **Push Detail Redirect URL**, and **Push Detail ID**) in place of the JSON **Email Detail** and **Push Detail** inputs, and **Create Table** and **Update Table by ID** to take **Tags** as a separate input with one row per tag in place of the JSON value in **Additional Fields**
- Updated **Create Message Template** and **Update Message Template by ID** to take **Email Detail** (**Name**, **Subject**, **Body**, and **Reply To**) and **Push Detail** (**Message**, **Redirect URL**, and **ID**) as structured objects in place of JSON values, and **Create Job Change** to take **Proposed Organizations** as one row per organization with an **ID** and a **Descriptor** in place of a JSON array
- Updated the **Query Params** input to **Extra Parameters** on 14 actions that accept query-string parameters, and the JSON **Additional Fields** input to **Extra Body** on **Create Supplier Invoice Request**, **Create Message Template**, **Update Message Template by ID**, **Initiate Job Change**, **Initiate Organization Assignment Change**, **Create Worker Time Block**, **Update Time Clock Event by ID**, and **Update Worker Time Block**
- Updated **Initiate Job Change** and **Initiate Organization Assignment Change** to send the **Worker ID** as the worker in the request body, which removes the **Change Job Worker ID** and **Change Org Worker ID** inputs
- Updated inputs to match the Workday API: **Create Supplier Invoice Request** now requires **Company ID**, **Supplier ID**, and **Invoice Date**, **List Organizations** requires **Organization Type ID**, **List Data Changes** requires **Data Change Type** or **Data Change Name**, **Create Message Template** and **Update Message Template by ID** require a new **Notification Type ID**, **Update Message Template by ID** requires **Message Template Name**, and **Create Supplier Invoice Request Attachment** uploads the content of a new required **File** input; also added an optional **Organization Type ID** to the **Select Organization** data source and to **Get Organization by ID**, where it filters the organization dropdown, optional **Supervisory Organization ID** and **Location ID** inputs to **Initiate Job Change**, and an optional **Position ID** input to **Initiate Organization Assignment Change**
- Fixed **List People** ignoring **Fetch All**, **Fetch All** stopping early when Workday returned fewer records than the requested **Limit**, **Get Invoice PDF** returning a corrupted file, invalid JSON in code inputs being sent in the request instead of rejected, the **Select Data Change** data source failing to load, and **Create Payment**, **Create Supplier Invoice Request Attachment**, **Create Table**, **Send Message**, and **Update Table by ID** failing when their optional **Additional Fields**, **Attachment Details**, or **Message Details** input was left unset

Reconfiguration notice: **Send Message** no longer reads JSON values in the **Email Detail** and **Push Detail** inputs of **Message Details**, and **Create Table** and **Update Table by ID** no longer read a JSON **Tags** value in **Additional Fields**. Re-enter that email and push content in the new **Message Details** fields, and those tags as rows in **Tags**. **Create Message Template** and **Update Message Template by ID** no longer read JSON in **Email Detail** and **Push Detail**, and **Create Job Change** no longer reads a JSON **Proposed Organizations** array; re-enter that content in the individual fields and as **ID** and **Descriptor** rows, noting that an organization **Href** can no longer be sent. Values saved in **Query Params** on the 14 affected actions, in **Additional Fields** on the 8 affected actions, in **Supplier Invoice ID** on **Create Supplier Invoice Request**, and in **Template Descriptor** on **Create Message Template** and **Update Message Template by ID** are no longer read; re-enter them in **Extra Parameters**, **Extra Body**, **Supplier Invoice ID**, and **Template Descriptor**. **Create Message Template** and **Update Message Template by ID** now fail without a **Notification Type ID**, and **Update Message Template by ID** without a **Message Template Name**, so enter both. **Update Time Clock Event by ID** no longer sends **Clock Event Date Time** or **Clock Event Time Zone ID**, which Time Tracking v7 does not accept, so there is nothing to re-enter; check any step that relied on it to change a clock event's time or time zone. **Initiate Job Change** and **Initiate Organization Assignment Change** no longer read **Change Job Worker ID** or **Change Org Worker ID** and always send the **Worker ID** as the body worker, so there is nothing to re-enter; check any step that targeted a different worker in the body.

### 2026-07-16

Restructured action inputs into structured objects for an improved user experience:

- Grouped the **Email Detail**, **Push Detail**, and **Contacts** inputs of **Send Message** into a single **Message Details** structured object
- Grouped the **File Length**, **File Name**, and **Supplier Invoice Request Attachment Descriptor** inputs of **Create Supplier Invoice Request Attachment** into a single **Attachment Details** structured object
- Grouped the optional secondary inputs of **Create Payment** (**Ready to Auto Apply**, **Reference**, **Transaction Number**, **Memo**, **Payment Descriptor**) into a single **Additional Fields** structured object
- Grouped the optional secondary inputs of **Create Table** and **Update Table by ID** (**Description**, **Documentation**, **Enable For Analysis**, **Tags**) into a single **Additional Fields** structured object
- Grouped the **Limit** and **Offset** inputs into a single **Pagination** structured object across all 13 paginated list actions (Get Time Off Details, Get Supplier Invoice Request Attachments, List Supplier Invoice Requests, Get Event Attachments, List Events, Get Worker Business Title Changes, List People, List Data Changes, List Tables, Get Staffing Workers, Get Worker Explicit Skills, Get Worker Service Dates, List Workers). The **Fetch All** toggle remains a top-level input

### 2026-06-11

Added **Fetch All** toggle to all paginated list actions (List People, List Supplier Invoice Requests, Get Supplier Invoice Request Attachments, List Events, Get Event Attachments, Get Worker Business Title Changes, List Data Changes, List Tables, Get Workers, Get Staffing Workers, Get Worker Explicit Skills, Get Worker Service Dates, Get Time Off Details) that automatically paginates through all results using limit/offset; when disabled, existing single-page behavior is preserved

### 2026-04-30

Updated spectral version

### 2026-04-22

Added Staffing (v7) service integration with six new actions:
- **Get Staffing Workers** - Retrieve a list of workers
- **Get Staffing Worker By ID** - Retrieve a specific worker by ID
- **Get Worker Service Dates** - Retrieve service dates for a worker
- **Get Worker Explicit Skills** - Retrieve explicit skills for a worker
- **Initiate Job Change** - Start a job change business process for a worker
- **Initiate Organization Assignment Change** - Start an organization assignment change for a worker

Upgraded Time Tracking endpoints from v3 to v5, Absence Management endpoints from v1 to v5, and Person endpoints from v3 to v4

### 2026-03-16

Improved input field documentation with formatted URL links for better readability

### 2026-02-26

Added inline data source for workers to enable dynamic dropdown selection
