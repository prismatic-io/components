## Changelog

### 2026-06-24

Grouped the OData query inputs into structured objects on the List Rows, List Columns, List Tables, and List Worksheets actions (breaking: these input keys are now nested). Paging controls (`$top`, `$skip`, `$skipToken`) are nested under **Pagination**, and sort/filter controls (`$filter`, `$orderBy`, `$search`) under **Filters**. The response-shaping inputs (`$select`, `$expand`, `$format`) and `fetchAll` remain top-level inputs.

### 2026-04-30

Updated spectral version

### 2026-02-24

Added support for **OneDrive** and **SharePoint** connections, enabling workbook access from shared drives and sites

### 2025-07-10

- Added inline data sources for selecting columns, tables, workbooks, worksheets, and drives or sites to enhance data selection capabilities

### 2025-07-04

- Added drive name labels for better readability in the user interface
