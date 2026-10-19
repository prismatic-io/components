## Changelog

### 2026-10-19

- Added an optional **Look-back Date** input to the **New and Updated Orders**, **New and Updated Products**, and **New and Updated Shipments** triggers for performing an initial sync of orders, products, and shipments. The initial sync begins on the first recurrence and backfills every record on or after the specified date, seeding each once; recurrences after the sync completes are unaffected. Leave it empty to start from the first recurrence with no backfill
- Added opt-in batching to the **New and Updated Orders** trigger, dispatching each changed record individually or in configured batches so large backlogs drain in one recurrence; enabling it changes the shape a downstream step receives
- Added opt-in batching to the **New and Updated Products** and **New and Updated Shipments** triggers, dispatching each changed record individually or in configured batches; enabling it changes the shape a downstream step receives

### 2026-07-16

Grouped related list-action inputs into structured objects for clearer configuration

- **List Products**: grouped inputs into **Pagination** and **Sorting** structured objects
- **List Customers**: grouped inputs into **Pagination** and **Sorting** structured objects
- **List Shipments**: grouped inputs into **Pagination**, **Date Range Filters**, and **Shipment Filters** structured objects

### 2026-04-30

Updated spectral version

### 2026-03-31

Various modernizations and documentation updates

### 2026-03-20

Added new triggers for webhook and polling-based integrations:

- **Webhook Event Subscription** - Automatically creates and manages webhook subscriptions on deploy and removes them on instance deletion
- **New and Updated Orders** - Polling trigger that checks for new and updated orders on a configured schedule
- **New and Updated Products** - Polling trigger that checks for new and updated products on a configured schedule
- **New and Updated Shipments** - Polling trigger that checks for new and updated shipments on a configured schedule

### 2026-03-05

Added data sources:

- **Select Webhook** for selecting registered webhooks from the ShipStation account
- **Select Fulfillment** for selecting fulfillments from the ShipStation account

### 2026-02-24

Added data sources:

- **Select Carrier** for selecting carriers
- **Select Service** for selecting shipping services
- **Select Package** for selecting package types
- **Select Customer** for selecting customers
- **Select Store** for selecting stores
- **Select User** for selecting users
- **Select Order** for selecting orders
- **Select Product** for selecting products
- **Select Warehouse** for selecting warehouses

### 2024-03-29

Added **orderKey** input to the **Create/Update Order** action for specifying a custom order key

### 2023-09-28

Initial release of the ShipStation component
