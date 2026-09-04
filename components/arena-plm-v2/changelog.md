## Changelog

### 2026-09-04

Initial release of the Arena Solutions component.

- Added 317 actions for managing items, BOMs, changes, requests, quality processes, requirements, suppliers, tickets, training plans and files
- Added **API Key**, **Username and Password**, and **OAuth 2.0 Client Credentials** connection types
- Added the **New Events** polling trigger, which reports events created in an Arena outbound integration feed and dispatches each event individually or in configured batches once batching is enabled; enabling it changes the shape a downstream step receives
- Added an optional **Look-back Date** input on the **New Events** trigger for performing an initial sync of events. The initial sync begins on the first recurrence, backfills every event created on or after the specified date and seeds each once. Leave it empty to start from the first recurrence with no backfill
- Added output schemas to 312 actions for improved field mapping during configuration
- Added data sources for selecting categories, category attributes, change category routings, number sequence prefixes, quality process templates, exports, outbound integrations and outbound event integrations from live Arena data, plus a **Notification JSON Form** data source for configuring notification delivery and message fields
- Added a **Pagination** structured object to list actions, where **Fetch All** stays a top-level toggle, and an **Address** structured object to supplier addresses
- Added **Raw Request** for sending arbitrary requests to endpoints the dedicated actions do not cover
