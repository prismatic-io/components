## Changelog

### 2026-05-13

Added **JSM Operations** and **Assets / CMDB** support:

- Added **Integration Events** actions — **Create Integration Alert**, **Acknowledge Integration Alert**, **Close Integration Alert**, **Add Integration Alert Note**, and **Get Integration Alert Request** — backed by a new **GenieKey** API key connection for the Atlassian Ops integration ingestion API.
- Added **Ops Alerts** actions — **List Ops Alerts**, **Get Ops Alert**, **Create Ops Alert**, **Delete Ops Alert**, **Acknowledge Ops Alert**, **Close Ops Alert**, and **Snooze Ops Alert** — for the JSM Operations REST API.
- Added **Ops Schedules** actions — **List Ops Schedules**, **Get Ops Schedule**, and **Get Ops On-Call** — plus a **Select Ops Schedule** data source.
- Added **Assets / CMDB Objects** actions — **Search Asset Objects**, **Get Asset Object**, **Create Asset Object**, **Update Asset Object**, and **Delete Asset Object** — and **Schemas** actions — **List Asset Schemas**, **Get Asset Schema**, and **List Schema Object Types** — plus **Select Asset Schema** and **Select Asset Object Type** data sources.
- Expanded the **OAuth 2.0** connection's default scopes to cover Ops Management (`read`/`write`/`delete:ops-alert`, `read`/`write`/`delete:ops-config`) and Assets/CMDB (`read`/`write`/`delete:cmdb-object`, `cmdb-schema`, `cmdb-type`, and `read:cmdb-attribute`).
- Added shared cloudId resolution and pagination helpers for the JSM Ops (`offset`/`size` with `links.next`) and Assets (`startAt`/`maxResults`/`isLast`) response envelopes.
- **On New Request** Trigger — triggers on new service requests in a service desk
- **On New Ops Alert** Trigger — triggers on new alerts in JSM Operations

### 2026-04-30

Initial release of Jira Service Management component with support for **OAuth 2.0** and **Basic Authentication**, service request management, organizations, customers, request types, queues, webhook triggers, service desk ↔ customer and organization associations, organization properties, portal-only customer management, and dynamic data source dropdowns
