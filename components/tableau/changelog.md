## Changelog

### 2026-07-21

Restructured action inputs into structured objects for an improved user experience.

- The **List/Search** actions for **Users**, **Projects**, **Workbooks**, and **Connections**, plus **List Webhooks**, group their **Page Size** and **Page Number** inputs into **Pagination**
- **Publish Workbook** groups its **Upload Session ID**, **Workbook Type**, **Overwrite**, **As Job**, and **Skip Connection Check** inputs into **Publish Options**
- **Update Connection** groups its **Server Address**, **Server Port**, **Connection Username**, **Connection Password**, **Embed Password**, and **Query Tagging Enabled** inputs into **Connection Settings**

### 2026-06-29

Various modernizations and documentation updates

### 2026-06-04

Added the **New and Updated Records** polling trigger that monitors workbooks, views, and data sources for records created or updated since the last poll, routing newly created records to the created branch and modified records to the updated branch

### 2026-04-30

Updated spectral version

### 2026-04-07

Added trigger documentation

### 2026-03-31

Various modernizations and documentation updates

### 2026-03-13

Removed the **Debug Request** input from all action inputs. Debug logging is now controlled internally and no longer appears as a configurable field in actions.

### 2026-03-05

Added inline data source for connections to enable dynamic dropdown selection

### 2026-02-26

Added inline data sources for projects, workbooks, users, and webhooks to enable dynamic dropdown selection
