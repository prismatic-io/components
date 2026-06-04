## Changelog

### 2026-05-28

Added **New and Updated Records** polling trigger that checks for changes to a curated set of Business Central entities (Items, Customers, Vendors, Sales Orders, Sales Invoices, Sales Shipments, Purchase Orders, Purchase Invoices, Purchase Receipts, Accounts) via the `lastModifiedDateTime` OData filter; because Business Central does not expose a creation timestamp on list responses, all changed records are emitted in the `updated` bucket while the `created` bucket is preserved in the payload shape but always empty

### 2026-04-30

Updated spectral version

### 2026-02-26

Added inline data sources for vendors, accounts, purchase orders, purchase invoices, purchase order lines, purchase receipts, sales shipments, general ledger entries, item ledger entries, and subscriptions to enable dynamic dropdown selection

### 2026-02-04

Added new actions for vendor and financial management:

- **Vendor** actions: Create, Get, List, Update, and Delete vendors
- **Purchase Invoice** actions: Create, Get, List, Update, Delete, and Post purchase invoices
- **General Ledger Entries** actions: Get and List general ledger entries
- **Item Ledger Entries** actions: Get and List item ledger entries

### 2025-10-17

Enhanced webhook lifecycle management with improved trigger subscription handling and automated cleanup
