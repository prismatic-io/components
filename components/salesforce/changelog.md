## Changelog

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
