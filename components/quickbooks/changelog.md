## Changelog

### 2026-05-28

Added **New and Updated Records** polling trigger that monitors QuickBooks Online entities (Customers, Vendors, Items, Invoices, Bills, Payments, Purchase Orders, Estimates, Journal Entries, Accounts) for changes and partitions results into `created` and `updated` buckets

### 2026-04-30

Updated spectral version

### 2026-03-31

Added **Create Invoice** action with structured field inputs and **Select Term** data source. Renamed existing action to **Create Invoice (JSON)**.

### 2026-02-27

Added inline data source for attachments to enable dynamic dropdown selection

### 2026-02-19

Added webhook trigger that automatically detects and normalizes both CloudEvents and legacy QuickBooks webhook formats. Supports Customer, Invoice, and all other QuickBooks entity changes

### 2026-01-07

Fixed iconURL for OAuth Connect buttons in Embedded Workflow Builder

### 2024-11-15

Added **Non-Inventory Item** action

### 2024-10-15

Improved error handling to include full error data

### 2024-09-17

Added JSON support in key-value pair values for **Create Resource** and **Update Resource** actions

### 2024-07-22

Fixed **Raw Request** URL and Realm ID handling

### 2024-05-31

Added **Batch Request** action for batch operations

### 2024-03-01

Enhanced **Create Invoice** action with additional fields
