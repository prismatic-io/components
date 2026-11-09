## Changelog

### 2026-11-09

Added Local Services lead, Customer Match, and change status capabilities and a **Service Account** connection, moved the default to Google Ads API v26, and fixed several trigger and action issues:

- Added the **List Local Services Leads**, **List Lead Conversations**, **Provide Lead Feedback**, and **Append Lead Conversation** actions for working with Local Services leads, and marked **Get Detailed Lead Reports** as deprecated, since Google has deprecated the Detailed Lead Reports API
- Added the **Ingest Audience Members**, **Remove Audience Members**, and **Get Request Status** actions for managing Customer Match audiences through the Data Manager API, with a **Select Audience** data source for choosing the audience
- Added the **Mutate Resources** action for creating, updating, or removing several Google Ads resources in one request using temporary IDs, and the **Search Stream** action for returning every row of a large GAQL query in one call
- Added the **Changed Resources** polling trigger, which reports created, updated, and removed Google Ads resources, optionally limited by **Resource Types**. It supports opt-in batching, dispatching each change individually or in configured batches so large backlogs drain in one recurrence; enabling it changes the shape a downstream step receives. Its optional **Look-back Date** input performs an initial sync that begins on the first recurrence and backfills every change made on or after the specified date, up to Google's 90-day change status window, seeding each once
- Added a **Service Account** connection for authenticating as a Google Cloud service account that has been added as a user in the Google Ads account; it works with the Google Ads and Local Services actions but not with the Data Manager API actions
- Added an optional **Linked Customer ID** input to **Search Ads**, **Search Stream**, **Upload Click Conversions**, and **Upload Call Conversions** for partners acting on an advertiser's account through an account link
- Updated the default Google Ads API version to v26; a connection set below v23 now uses v23 and logs a warning, since Google has sunset v22 and earlier versions
- Fixed the **New and Updated Campaigns** and **Account Change History** triggers skipping changes that Google reported a few minutes late; each recurrence now reads changes up to 5 minutes before it runs, so a late-reported change is delivered on a later recurrence
- Updated error messages to include the Google Ads error codes and messages, Data Manager field violations, setup guidance where an error needs it, and the request ID, and added retries with backoff; reads retry on transient errors, and writes retry only when Google reports a temporary rate limit
- Fixed the default **Operations** on **Mutate Campaign** and **Mutate Campaign Criteria** being rejected by Google, because each operation combined a create, an update, and a remove; each default now holds three single-purpose operations
- Added inline action calling support to the 9 new actions for improved example output during configuration
- Added output schemas to the 9 new actions for improved field mapping during configuration

### 2026-11-05

Updated spectral to 10.39.0

### 2026-11-03

Published the component as an npm package, so code-native integrations can install it and call its actions, triggers and data sources from code with TypeScript types

### 2026-11-02

Updated spectral to 10.34.1

### 2026-10-07

Updated the component for Google's developer token sunset, added an initial sync to the change history triggers, and fixed several trigger, action, and data source issues:

- Updated the **OAuth 2.0** connection so **Developer Token** is optional and no longer sent with any request, following Google's September 9, 2026 developer token sunset; the connection setup guidance now describes Google Cloud project access levels instead of the API Center
- Added an optional **Look-back Date** input on the **New and Updated Campaigns** and **Account Change History** triggers for performing an initial sync of changes. The initial sync begins on the first recurrence and backfills every change made on or after the specified date, up to Google's 30-day change history window, seeding each once; without batching, a large backfill can span several recurrences before normal polling resumes. Leave it empty to start from one hour before the first recurrence
- Fixed the **New and Updated Campaigns** and **Account Change History** triggers losing the oldest changes when a recurrence found more than a single query returns (10,000 changes and 1,000 changes respectively); changes are now read oldest first and the remainder is delivered on the following recurrences, or within the same recurrence when batching is enabled
- Fixed **New and Updated Campaigns** reporting only created and removed campaigns when **Change Types to Monitor** is left empty; an empty selection now detects all change types as documented, so flows that leave it empty also receive status, bidding strategy, and budget changes
- Updated **New and Updated Campaigns** to report a missing `oldValue` or `newValue` as `null` instead of omitting the field
- Fixed **Account Change History** failing every recurrence when **Resource Types** includes **Keywords**, or once more than 30 days passed without a successful recurrence; **Keywords** now returns ad group criterion changes, which include keyword changes, and the query start is limited to Google's 30-day change history window
- Fixed **Campaign Budget Alerts** ignoring **Include Shared Budgets** when turned off, comparing daily budgets against spend accumulated since the last recurrence (which could include earlier days) instead of today's spend, and omitting `alertThreshold` when **Alert Threshold (%)** is left empty; the default threshold is now reported
- Fixed **Get Account Reports** and **Get Detailed Lead Reports** sending invalid date values when **Start Date** or **End Date** is left empty; an empty date is now omitted from the request
- Fixed **Search Ads** sending **Return Total Results Count** as a request field the Google Ads API does not recognize; it is now sent in the search settings, so the total count is returned
- Fixed the **List Accessible Sub Accounts** data source failing when **Customer Client Level** is left empty; it now defaults to level 1
- Updated the **Upload Click Conversions** description to state that only developer tokens with no offline conversion upload between December 17, 2025 and June 15, 2026 lose access to the endpoint, rather than the action stopping for everyone after June 15, 2026

### 2026-08-31

Updated the component to Google Ads API `v25` with reworked campaign change detection and opt-in batching across all polling triggers:

- Updated the default API version for new connections to `v25`, matching Google's current major release; updated the minimum supported version to `v22`, so `v22` through `v25` are all selectable and connections pinned below `v22` are automatically upgraded
- Updated the **New and Updated Campaigns** trigger to read the Google Ads change history instead of storing a copy of every campaign between recurrences, a breaking change; `totalCampaigns` is no longer returned, `oldValue` and `newValue` now carry the campaign resource directly rather than wrapped in a query row, a `timeRange` object was added alongside `syncedAt`, and detection is bounded by Google's 30-day change history window
- Added opt-in batching to the **New and Updated Campaigns**, **Account Change History**, and **Campaign Budget Alerts** triggers, dispatching each record individually or in configured batches so large backlogs drain in one recurrence; enabling it changes the shape a downstream step receives
- Updated **Get Account Reports** and **Get Detailed Lead Reports** to group their **Page Size** and **Page Token** inputs into a **Pagination** structured object
- Added connection setup guidance for Google's passkey requirement; from August 5, 2026 a passkey is required to authorize new Google Ads API access, and a new passkey can take up to 7 days to become usable
- Added output schemas to 14 actions for improved field mapping during configuration
- Added inline action calling support across all actions for improved example output during configuration

### 2026-06-26

Enabled the **OAuth 2.0** connection to drive both the Google Ads and Data Manager APIs from a single connection.

- Exposed the **Scopes** field so integration builders can append the Data Manager scope (`https://www.googleapis.com/auth/datamanager`) to the existing Ads scope. The default remains the Ads scope only, so Ads-only integrations are unaffected.
- Extended **createDataManagerClient** to accept the unified **OAuth 2.0** connection in addition to the dedicated **Data Manager OAuth 2.0** connection. When the **OAuth 2.0** connection is used, the Data Manager API version is pinned to `v1`.

Builders who opt in by adding the Data Manager scope will trigger a one-time re-consent for affected end-users, as the granted scope set changes.

### 2026-05-22

Added **Ingest Offline Conversions** action using the Google Ads Data Manager API to replace the deprecated **Upload Click Conversions** action, which will stop accepting requests after June 15, 2026.

This action uses a new dedicated **Data Manager OAuth 2.0** connection, separate from the existing Google Ads OAuth connection:

- **No Developer Token required** — the Data Manager API does not use the `developer-token` header
- **Configurable API version** — defaults to `v1`
- **Scoped to the Data Manager API only** — does not affect existing Google Ads OAuth connections

### 2026-05-11

Raised minimum supported Google Ads API version from `v20` to `v21` ahead of `v20`'s June 2026 sunset. Connections explicitly configured for `v20` will be auto-upgraded to `v21` by the existing `validateApiVersion` floor check.

### 2026-04-30

Various modernizations and documentation updates

### 2026-03-31

Various modernizations and documentation updates

### 2026-03-11

Updated default Google Ads API version from `v22` to `v23` and raised minimum supported version from `v19` to `v20`:

- **Default API version updated to `v23`** — default for all new connections, bringing support for Performance Max channel reporting, AI-powered audience definitions, and enhanced invoice granularity.
- **Minimum supported version raised to `v20`** — Google sunset `v19` on February 11, 2026; connections configured with `v19` will now fall back to `v20`.
- **Campaign date fields updated** — trigger queries now use `campaign.start_date_time` and `campaign.end_date_time` (`v23` replaces the previous `start_date`/`end_date` fields).
- **Existing integrations unaffected** — connections using `v20`, `v21`, or `v22` can continue using their configured version.
- **GAQL query review recommended** — users with queries referencing `CallAd`, `CallAdInfo`, `Campaign.url_expansion_opt_out`, or the legacy video metric names (`video_views`, `average_cpv`, `video_view_rate`) should review these fields before upgrading, as they are removed or renamed in `v23`.

### 2025-12-15

Updated default Google Ads API version to `v22` with new EU Political Advertising requirements:

- **Default API version updated to `v22`** — applied to all new connections.
- **EU Political Advertising field required** — campaign creation and location targeting now require the **Contains EU Political Advertising** field when using `v22`.
- **Existing integrations unaffected** — connections can continue using `v19`, `v20`, or `v21` by specifying the **API Version** connection field.

### 2025-06-09

Added inline data sources for accessible customers and sub-accounts to enhance data selection capabilities
