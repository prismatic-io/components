## Changelog

### 2026-09-28

Added merchant store authentication so that actions, triggers, and data sources read and write data in an Adobe Commerce store:

- Added the **OAuth 1.0a** connection, which authenticates against a merchant store with an integration's consumer key and access token credentials and takes a **Store URL** plus an optional **Store Code** for installations serving multiple store views
- Updated the **API Access Key** connection to **API Access Key (Deprecated)**; it authenticates against the Adobe Commerce Marketplace Developer portal rather than a merchant store, so it cannot read or write orders, products, customers, or transactions
- Fixed the **Select Order**, **Select Customer**, **Select Transaction**, **Product Types**, **Product Attribute Types**, and **Product Option Types** data sources, which failed to load their options; all six now present their options ordered by label
- Added an optional **Look-back Date** input for performing an initial sync of records on the **New and Updated Records** trigger. The initial sync backfills every record modified on or after the specified date, seeding each once and ignoring the trigger's filters; later recurrences are unaffected. Leave it empty to start from the first recurrence with no backfill
- Updated the **New and Updated Records** trigger to walk a truncated backlog forward in oldest-first order, so a set of changes larger than one recurrence's page cap drains across later recurrences instead of repeating the most recent records
- Updated the **Webhook** trigger so it no longer offers a synchronous response or a schedule
- Updated every action to raise an API failure as an error carrying `message`, `data`, `status`, and `headers` as fields, replacing the single JSON-encoded message string
- Added inline action calling support to 19 actions for improved example output during configuration

### 2026-06-11

Added **Fetch All** toggle to paginated list actions (List Products, List Orders, List Order Items, List Product Attributes, List Transactions, Search Customers) that automatically paginates through all results using `searchCriteria[currentPage]`/`searchCriteria[pageSize]`; when disabled, existing single-page behavior is preserved

### 2026-05-28

Added **New and Updated Records** polling trigger that monitors orders, customers, or products for changes and routes newly created records and updated records to separate branches

### 2026-05-20

Applied automated security patches and code formatting updates

### 2026-04-30

Updated spectral version

### 2026-04-07

Added global debug support across all actions for improved troubleshooting

### 2026-03-05

Added inline data sources for orders, transactions, and customers to enhance data selection capabilities
