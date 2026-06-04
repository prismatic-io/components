## Changelog

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
