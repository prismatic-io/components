## Changelog

### 2026-04-30

Updated spectral version

### 2026-02-26

Added inline data source for users to enable dynamic dropdown selection

### 2026-01-23

Updated Notion component to support API v2025-09-03 with backward compatibility:

- **Updated API Version** - Now using Notion API v2025-09-03
- **Enhanced Query Database** - Added Data Source ID input to support databases with multiple data sources. Uses new `/data_sources/{id}/query` endpoint when Data Source ID is provided, falls back to legacy `/databases/{id}/query` endpoint for backward compatibility
- **Enhanced List Databases** - Added Result Type input to choose between data sources (recommended) and databases (legacy)
- **Updated Create Database Item** - Parent format now supports `data_source_id` type for database parents
- **Updated Create Database** - Fixed parent format to use `page_id` type (databases must be created under pages)
- **Updated Examples** - All example payloads now demonstrate the recommended `data_source_id` format for relations and parent objects

**Migration Guide**: Existing integrations using `database_id` will continue to work for single-source databases. For databases with multiple data sources, use the new `data_source_id` format.

### 2025-08-25

Added the **Internal Integration** connection type

### 2025-04-30

Added pagination support for improved handling of large datasets and better performance
