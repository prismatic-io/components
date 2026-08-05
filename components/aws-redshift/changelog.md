## Changelog

### 2026-08-05

Various modernizations and documentation updates

### 2026-07-16

Restructured action inputs into structured objects for an improved user experience.

- **Execute SQL Statement** groups its optional inputs (**Session ID**, **Statement Name**, **Result Format**, **Session Keep Alive (seconds)**, and **Client Token**) into **Additional Fields**
- **List Statements** groups its filter inputs (**Database Name**, **Workgroup Name**, **Cluster Identifier**, and **Statement Name**) into **Filters** and its pagination inputs (**Next Token** and **Max Results**) into **Pagination**

### 2026-05-28

Various modernizations and documentation updates

### 2026-05-21

Added **Fetch All** input to the **List Statements** action to automatically paginate through and return all SQL statements in a single response

### 2026-04-30

Updated spectral version

### 2026-03-20

Initial release of the Redshift component with comprehensive integration capabilities
