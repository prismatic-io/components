## Changelog

### 2026-11-10

Refactored internal code

### 2026-11-09

Updated spectral to 10.39.1

### 2026-11-05

Updated spectral to 10.39.0

### 2026-11-03

Published the component as an npm package, so code-native integrations can install it and call its actions, triggers and data sources from code with TypeScript types

### 2026-11-02

Updated spectral to 10.34.1 and switched the build from webpack to tsdown:
- tsdown 0.22.3

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
