## Changelog

### 2026-07-27

Enhanced multiple actions to return more informative API responses:

- Updated **Upload Employee File** and **Upload Company File** actions to return the `Location` header from the API response
- Updated **Create Employee** action to return the employee `id` and `Location` header from the API response
- Updated **Add Employee Table Row** action to return a descriptive success message instead of an empty response
- Updated **Create Employee File Category** and **Create Company File Category** actions to return status-based success messages reflecting the API response code

### 2026-05-26

Added **Changed Employees** polling trigger to detect new, updated, and deleted employees in BambooHR on a configured schedule

### 2026-04-30

Updated spectral version

### 2026-04-07

Added trigger documentation and global debug support across all actions for improved troubleshooting

### 2026-03-31

Various modernizations and documentation updates

### 2026-03-24

Added **Employee File ID** inline data source input to **Delete Employee File** and **Get Employee File** actions for selecting employee files from a dropdown

### 2026-02-26

Added inline data sources for company files and employee files to enhance file selection capabilities

### 2025-11-19

Enhanced webhook triggers to support simulated test executions

### 2025-01-03

Added data sources and inline data sources for employees
