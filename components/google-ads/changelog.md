## Changelog

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
