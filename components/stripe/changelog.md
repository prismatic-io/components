## Changelog

### 2026-05-28

Added **New and Updated Records** polling trigger that polls Stripe's `/v1/events` API for change events on a configured schedule. Events are partitioned by type — `*.created` events go to the `created` bucket and all other event types go to the `updated` bucket. The trigger is a drop-in alternative to the existing webhook trigger for environments without a publicly reachable webhook endpoint

### 2026-04-30

Various modernizations and documentation updates

### 2026-03-31

Various modernizations and documentation updates

### 2026-03-27

Added **Customer ID** input to card retrieval, card update, and create invoice actions to support inline datasource dependencies

### 2026-03-05

Added inline data sources for balance transactions and cards to enable dynamic dropdown selection

### 2026-02-26

Added inline data sources for charges, disputes, and checkout sessions to enable dynamic dropdown selection

### 2025-10-17

Enhanced webhook lifecycle management with improved trigger subscription handling and automated cleanup

### 2025-10-13

Added inline data sources for customers, invoices, payment intents, prices, products, and subscriptions to enhance data selection capabilities

### 2025-08-12

Made webhook creation process idempotent to prevent duplication

### 2025-06-18

Added webhook validation toggle option for flexible webhook processing
