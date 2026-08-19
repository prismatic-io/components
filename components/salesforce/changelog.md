## Changelog

### 2026-08-19

Updated the **New and Updated Records** polling trigger:

- Updated the trigger to carry unreported records forward to the next recurrence, so a backlog larger than **Max Records To Fetch** is no longer dropped and a bulk load stamping many records with one timestamp still drains; **Max Records To Fetch** now caps how many records are retrieved at a time rather than how many the trigger will ever report
- Added an optional **Look-back Date** input for performing an initial sync of records. The initial sync backfills every record created on or after the specified date, seeding each once and ignoring the field and visibility filters; recurrences after the sync are unaffected. Leave it empty to start from the first recurrence with no backfill
- Added opt-in batching to the **New and Updated Records** trigger, dispatching each changed record individually or in configured batches so large backlogs drain in one recurrence; enabling it changes the shape a downstream step receives
- Updated deleted-record reporting so a trigger that has not run in more than 15 days continues instead of failing, since Salesforce serves no more than 15 days of deletions, and so deletions at the edge of a window are reported on the next recurrence rather than skipped

### 2026-07-02

Restructured action inputs into structured objects for an improved user experience

- **Create Lead** / **Update Lead** combine their name and contact-channel inputs into a **Name & Contact Information** group, group their address inputs into **Address**, and group their optional secondary inputs into **Additional Fields**
- **Create Contact** / **Update Contact** combine their name and contact-channel inputs into a **Name & Contact Information** group, group their address inputs into **Mailing Address** and **Other Address**, and group their optional secondary inputs into **Additional Fields**
- **Create Account** / **Update Account** group their address inputs into **Shipping Address** and **Billing Address**, and group their optional secondary inputs into **Additional Fields**
- List actions (**List Contacts**, **List Leads**, **List Opportunities**, **List Customers**, **List Users**, **List Profiles**) and **Find Records** group their pagination controls into a **Pagination** structured object; **Fetch All** stays a flat top-level toggle

### 2026-05-11

Resolved `DUPLICATE_DEVELOPER_NAME` failure on **Flow Outbound Message Webhook** redeploy in orgs with managed packages shipping `WorkflowOutboundMessage` records:
- Namespace prefix now read from the `Organization` record instead of `WorkflowOutboundMessage` (which could return a managed package prefix)
- Added debug-gated diagnostics to the Outbound Message delete path for easier namespace-related troubleshooting
- Underlying Salesforce error detail now logged when an expected "no ... named" response is suppressed
### 2026-04-30

Updated spectral version

### 2026-03-27

Added **Show Deleted Records** option to the **New and Updated Records** polling trigger to optionally include recently deleted records in polling results.

Added field selection options to the **New and Updated Records** polling trigger to optimize memory usage:
- Added **Selected Fields** input to limit which fields are returned per record using SOQL queries
- Added **Return IDs Only** input to return only record IDs and date fields for minimal payload size

### 2026-03-18

Various documentation improvements

### 2026-03-16

Improved input field documentation with formatted URL links for better readability

### 2026-02-04

Added OAuth 2.0 Client Credentials connection for server-to-server authentication without user interaction.

### 2025-10-17

Enhanced Flow management and data selection capabilities:
- Improved the **Flow Outbound Message Trigger** to verify Namespace prefix settings for deploying and deleting outbound messages
- Added **Delete Instanced Flows and Outbound Messages** action for cleanup of flows and outbound messages associated with a specific endpoint URL
- Enhanced **Subscribe to Record Changes** action with improved flow creation and webhook subscription management
- Improved record type selection with inline data source functionality and filter query capability for better data selection

### 2025-09-15

Added comprehensive Flow management actions as a functional replacement for workflow rules:
- **Create Flow** - Create record triggered flows with outbound message functionality
- **Activate Flow** - Activate existing flows
- **Deactivate Flow** - Deactivate active flows
- **Update Flow** - Update flow metadata and configuration
- **Delete Flow** - Remove flows from the org
- **Get Flow** - Retrieve flow details
- **List Flows** - List all flows in the org
- **Flow Outbound Message Trigger** - Webhook trigger that receives Salesforce outbound messages from flows, providing real time event processing for record changes

### 2025-05-09

Added inline data sources for bulk jobs, contacts, customers, leads, opportunities, profiles, record types, and users to enhance data selection capabilities
