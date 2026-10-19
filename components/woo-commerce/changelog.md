## Changelog

### 2026-10-19

- Added an optional **Look-back Date** input to the **New Records** trigger for performing an initial sync of records. The initial sync begins on the first recurrence and backfills every record created on or after the specified date, seeding each once; recurrences after the sync completes are unaffected. Leave it empty to start from the first recurrence with no backfill
- Added opt-in batching to the **New Records** trigger, dispatching each changed record individually or in configured batches so large backlogs drain in one recurrence; enabling it changes the shape a downstream step receives
- Fixed the **New Records** trigger delivering an order, product, or coupon twice, or skipping it, when it was created while a recurrence was reading records

### 2026-04-30

Updated spectral version

### 2026-04-21

Added **New Records** polling trigger that checks for new orders, customers, products, or coupons in WooCommerce on a configured schedule

### 2026-04-08

Added polling trigger "New Records" to monitor Orders, Customers, Products, and Coupons for newly created records on a configured schedule.

### 2026-04-07

Added global debug support across all actions for improved troubleshooting

### 2025-10-02

Added inline data sources for customers, orders, products, product categories, and refunds to enhance data selection capabilities
