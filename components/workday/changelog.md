## Changelog

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
