## Changelog

### 2026-07-24

Added new Google Merchant API actions ahead of the Content API for Shopping v2.1 shutdown on August 18, 2026. Existing actions are unchanged:

- **Get Account (Merchant v1)**, **List Accounts (Merchant v1)**, **Update Account (Merchant v1)**, **Delete Account (Merchant v1)**, and **Create Account (Merchant v1)** for managing Merchant accounts
- **Create Product (Merchant v1)**, **Update Product (Merchant v1)**, and **Delete Product (Merchant v1)** for managing products
- **Get Product (Merchant v1)** and **List Products (Merchant v1)** for retrieving processed products
- **Batch Upsert Products (Merchant v1)** for creating or updating multiple products at once
- **Update Product Local Inventory (Merchant v1)** and **Batch Local Inventory (Merchant v1)** for managing local inventory
- **Update Product Regional Inventory (Merchant v1)** and **Batch Regional Inventory (Merchant v1)** for managing regional inventory
- **List Notification Subscriptions (Merchant v1)** and **Create Notification Subscription (Merchant v1)** for managing notifications
- **Raw Request (Merchant v1)** for making arbitrary Merchant API calls

### 2026-04-30

Updated spectral version

### 2026-03-31

Various modernizations and documentation updates

### 2026-02-26

Added inline data sources for accounts and products to enable dynamic dropdown selection

### 2025-12-15

Deprecated 7 Order actions as Google has retired the Orders endpoints in the Content API:
- **List Orders** - Now marked as deprecated
- **Get Order** - Now marked as deprecated
- **Cancel Order** - Now marked as deprecated
- **List Orders Returns** - Now marked as deprecated
- **Get Order Return** - Now marked as deprecated
- **Create Order Return** - Now marked as deprecated
- **Process Order Return** - Now marked as deprecated
