## Changelog

### 2026-09-01

Restructured action inputs into structured objects for an improved configuration experience.

- **Create Vendor** and **Update Vendor** group their inputs into **Name**, **Contact Details**, **Tax Information**, **ACH Banking**, **Payment Settings**, **Form 1099**, **Contact Roles**, and **GL Accounts**
- **Create Customer** and **Update Customer** group their inputs into **Name**, **Contact Details**, **Tax Information**, **Contact Roles**, **Print Options**, **GL Accounts**, and **Billing and Delivery Preferences**
- **Create Contact** and **Update Contact** group their inputs into **Name**, **Contact Details**, and **Tax Information**
- **Create Invoice** and **Update Invoice** group their currency inputs into **Currency and Exchange Rate**

### 2026-05-05

Added **New and Updated Records** polling trigger to detect newly created or modified records across Vendor, Customer, AP Bill, AR Invoice, Contact, Employee, Project, and AR Payment, with server-side filtering so only changed records are returned each poll

### 2026-04-30

Updated spectral version

### 2026-03-31

Various modernizations and documentation updates

### 2026-03-24

Wired inputs to inline data sources for improved selection across multiple actions:
 **Vendor ID** now uses the **Select Vendor** inline data source
- **Customer ID** now uses the **Select Customer** inline data source
- **Contact Name** now uses the **Select Contact** inline data source
- **Invoice Number** now uses the **Select Invoice** inline data source
- **Project ID** now uses the **Select Project** inline data source

### 2025-12-19

Enhanced **Get Contact**, **Update Contact**, **Get Customer**, **Update Customer**, **Get Invoice**, **Update Invoice**, **Get Project**, **Update Project**, **Get Vendor**, and **Update Vendor** actions with inline data source support for improved usability:
- The **Record No** input in **Get Contact**, **Get Customer**, **Get Invoice**, **Get Project**, and **Get Vendor** now displays available records directly in the dropdown
- The **Contact Name** input in **Update Contact** now displays available contacts directly in the dropdown
- The **Customer ID** input in **Update Customer** now displays available customers directly in the dropdown
- The **Record Number** input in **Update Invoice** now displays available invoices directly in the dropdown
- The **Project ID** input in **Update Project** now displays available projects directly in the dropdown
- The **Vendor ID** input in **Update Vendor** now displays available vendors directly in the dropdown

### 2025-06-27

Added actions for AR advances and AR adjustments to enhance accounts receivable management
