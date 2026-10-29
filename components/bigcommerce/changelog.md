## Changelog

### 2026-10-29

Updated the **New and Updated Orders** trigger so the initial sync ignores the **Show New Orders** and **Show Updated Orders** visibility toggles, seeding every matched order regardless of those settings; later recurrences apply the toggles normally

### 2026-10-13

- Added opt-in batching to the **New and Updated Orders** trigger, dispatching each changed record individually or in configured batches; enabling it changes the shape a downstream step receives
- Added an optional **Look-back Date** input for performing an initial sync of orders. The initial sync backfills every order modified on or after the specified date, seeding each once; later recurrences are unaffected. Leave it empty to start from the first recurrence with no backfill

### 2026-05-26

Added the **New and Updated Orders** polling trigger that monitors orders in BigCommerce on a configured schedule using the `min_date_modified` filter on `GET /v2/orders`. Results are partitioned into created and updated buckets based on each order's `date_created` timestamp

### 2026-05-14

Added bulk pagination support to list actions across **brands**, **categories**, **categories tree**, **custom fields**, **product images**, **products**, **product modifiers**, **product variants**, and **webhooks**, allowing users to fetch all pages of results in a single action invocation

### 2026-04-30

Updated spectral version

### 2026-04-07

Added global debug support across all actions for improved troubleshooting

### 2026-03-31

Various modernizations and documentation updates

### 2025-07-29

Renamed delete tree categories action for improved clarity and consistency
