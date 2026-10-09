## Changelog

### 2026-10-09

- Added opt-in batching to the **New and Updated Records** trigger, dispatching each changed record individually or in configured batches; enabling it changes the shape a downstream step receives
- Added an optional **Look-back Date** input to the **New and Updated Records** trigger for performing an initial sync of records. The initial sync begins on the first recurrence and backfills every record changed on or after the specified date, seeding each once and ignoring the visibility filters; later recurrences are unaffected. Leave it empty to start from the first recurrence with no backfill
- Fixed the **New and Updated Records** trigger returning no orders when **Resource Type** is set to **Orders**, and the **Select Order** data source returning no options

### 2026-07-30

Removed deprecated **ORDER_STATUS_CHANGE** notification type from subscription actions and replaced it with **ORDER_CHANGE**

### 2026-04-30

Updated spectral version

### 2026-04-21

Added **New and Updated Records** polling trigger that checks for new and updated orders or feeds in Amazon Seller Central on a configured schedule

### 2026-03-31

Various modernizations and documentation updates

### 2026-03-13

Removed the **Debug Request** input from all action inputs. Debug logging is now controlled internally and no longer appears as a configurable field in actions.

### 2026-02-26

Added **Select Subscription** inline data source with notification type filtering to enable dynamic dropdown selection

### 2026-01-28

Added inline data sources for **Order ID**, **Feed ID**, and **Destination ID** inputs to enable dynamic dropdowns.
