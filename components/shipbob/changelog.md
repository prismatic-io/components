## Changelog

### 2026-10-13

Added opt-in batching and an initial sync to the **New and Updated Orders** trigger:

- Added opt-in batching to the **New and Updated Orders** trigger, dispatching each changed order individually or in configured batches; enabling it changes the shape a downstream step receives
- Added an optional **Look-back Date** input to the **New and Updated Orders** trigger for performing an initial sync of orders. The initial sync begins on the first recurrence and backfills every order modified on or after the specified date, seeding each once and ignoring the visibility filters; later recurrences are unaffected. Leave it empty to start from the first recurrence with no backfill

### 2026-06-05

Added the **New and Updated Orders** polling trigger that checks for orders created or updated since the last run using ShipBob's order update date filter

### 2026-05-28

Updated **List Orders**, **List Products**, **List Product Inventory**, **List Warehouses**, and **List Webhooks** to use a unified pagination helper that correctly traverses all pages when fetching results

### 2026-04-30

Updated spectral version

### 2026-04-07

Added trigger documentation and global debug support across all actions for improved troubleshooting

### 2026-03-31

Various modernizations and documentation updates

### 2026-03-05

Added inline data sources for channels, orders, webhooks, and warehouse receiving orders to enhance data selection capabilities
