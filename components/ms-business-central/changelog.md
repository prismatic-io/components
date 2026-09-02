## Changelog

### 2026-09-02

Updated action inputs to group related fields into structured objects:
- Updated the list actions (**List Items**, **List Vendors**, **List Purchase Orders**, **List Purchase Order Lines**, **List Purchase Invoices**, **List Purchase Receipts**, **List Purchase Receipt Lines**, **List General Ledger Entries**, and **List Item Ledger Entries**) to group their OData query options into an **OData Query Parameters** object; **Fetch All** remains a top-level toggle
- Updated **Create Purchase Invoice** and **Update Purchase Invoice** to group their buy-from address fields into a **Buy From Address** object
- Updated **Create Vendor**, **Update Vendor**, and **Update Company Information** to group their address and contact fields into **Address** and **Contact Information** objects

### 2026-07-27

Updated the **Fetch All** option on list actions so results are returned in the same `{ value: [ ... ] }` shape as a single-page call; previously enabling Fetch All returned a bare array, so integrations that read the `value` property received no items

### 2026-06-11

Added **Fetch All** toggle to all list actions (List Companies, List Customers, List Vendors, List Items, List Sales Orders, List Sales Invoices, List Sales Shipments, List Sales Shipment Line Items, List Purchase Orders, List Purchase Order Lines, List Purchase Invoices, List Purchase Receipts, List Purchase Receipt Lines, List General Ledger Entries, List Item Ledger Entries) that automatically follows `@odata.nextLink` pagination to retrieve all pages of results in a single call; when disabled, existing single-page behavior with Top, Skip, and Skip Token inputs is preserved

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
