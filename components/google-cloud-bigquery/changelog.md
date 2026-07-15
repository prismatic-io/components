## Changelog

### 2026-07-15

Grouped related optional inputs into structured objects across BigQuery actions to reduce clutter in the configuration UI

- Grouped the pagination inputs on the **List Jobs**, **List Datasets**, **List Models**, **List Routines**, **List Projects**, and **List Tables** actions into a **Pagination** group, with **Fetch All** remaining a top-level toggle
- Grouped the pagination inputs on **Get Query Job Results** and **List Table Data (Deprecated)** into a **Pagination** group
- Grouped the **List Jobs** filter inputs into a **Filters** group, with **State Filter** remaining top-level
- Grouped the optional body fields on **Create Dataset**, **Update Dataset**, **Create Table**, **Patch Table**, **Update Table**, **Update Model**, **Create Routine**, **Update Routine**, **Create Job**, **Query Job**, and **Table Data Insert All** into an **Additional Fields** group

### 2026-06-09

Added **New Jobs** polling trigger that surfaces BigQuery jobs created

### 2026-05-14

Added bulk pagination support to list actions across **datasets**, **jobs**, **models**, **projects**, **routines**, and **tables**, allowing users to fetch all pages of results in a single action invocation

### 2026-04-30

Updated spectral version

### 2026-04-07

Added global debug support across all actions for improved troubleshooting

### 2026-03-05

Added inline data source for jobs to enable dynamic dropdown selection

### 2026-02-26

Added inline data sources for datasets, models, and routines to enable dynamic dropdown selection

### 2026-02-12

Improved documentation and labeling

### 2026-01-08

Fixed input handling for actions that accept JSON data as a reference.
