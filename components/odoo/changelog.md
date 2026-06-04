## Changelog

### 2026-06-02

Migration preparations for the soon to be deprecated XML-RPC API to Odoo's JSON-2 HTTP API (required for the Odoo 19.1 SaaS rollout in mid-2026)

- Added the **API Key** connection that authenticates to Odoo's JSON-2 HTTP API using an API key
- Added **New and Updated Records** polling trigger that filters Odoo records by `write_date` using the `search_read` domain (`write_date` >= last poll); records whose `create_date` is also after the last poll go to the `created` branch, while older records modified since the last poll go to `updated`. The model picker reuses the existing `selectModel` datasource so the trigger works against any Odoo model with `create_date` / `write_date`
- The **Basic Authentication (Deprecated)** connection is maintained as a compatibility shim and will stop working when Odoo drops XML-RPC support in 19.1 (mid-2026); migrate existing integrations to the **API Key** connection before that release
- The **New and Updated Records** polling trigger supports both the **API Key** and **Basic Authentication (Deprecated)** connections, matching the rest of the component

### 2026-05-20

Applied automated security patches and code formatting updates

### 2026-04-30

Updated spectral version

### 2025-10-21

Added inline data sources for models and records to enhance data selection capabilities
