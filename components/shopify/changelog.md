## Changelog

### 2026-09-03

- Added opt-in batching across all polling triggers, dispatching each changed record individually or in configured batches so large backlogs drain in one recurrence; enabling it changes the shape a downstream step receives
- Added an optional **Look-back Date** input for performing an initial sync of records across all polling triggers. The initial sync backfills every record modified on or after the specified date, seeding each once; later recurrences are unaffected. Leave it empty to start from the first recurrence with no backfill
- Updated all polling triggers to deliver a large backlog across recurrences, continuing from where the previous recurrence left off rather than holding every changed record before any of it reaches a flow
- Updated the default Shopify API version to 2026-07
- Fixed the **Secret Key** input on the **Event Topic Subscription** trigger displaying the app's client secret in plain text; it is now masked, matching the other webhook triggers

### 2026-07-15

Updated the OAuth 2.0 connections to request expiring access tokens so authentication continues to work with newer Shopify apps

### 2026-07-06

Restructured action inputs into structured objects for an improved user experience.
- The GraphQL list actions (**List Currencies**, **List Collections**, **List Customers**, **List Draft Orders**, **List Fulfillment Orders**, **List Inventory Items**, **List Inventory Levels At Location**, **List Locations**, **List Orders**, **List Product Images**, **List Products**, **List Variants**, **List Webhooks**, and **List Metafields**) group their **Limit** and **Page Offset Cursor** inputs into a **Pagination** structured object
- **Create Customer** groups its **Phone**, **Notes**, **Currency Format**, **Tax Exempt**, and **Metafields** inputs into an **Additional Fields** structured object; the required **Address List** input moves up beside the other required inputs



### 2026-04-30

Updated spectral version

### 2026-03-31

Various modernizations and documentation updates

### 2026-03-05

Added inline data sources for draft orders, collections, and fulfillment services to enable dynamic dropdown selection

### 2026-02-26

Added inline data sources for variants, product images, and inventory items to enhance data selection capabilities

### 2026-01-27

Added **New and Updated Customers**, **New and Updated Orders**, and **New and Updated Products** polling triggers.

### 2025-10-17

Enhanced webhook lifecycle management with improved event topic webhook handling and automated cleanup

### 2025-05-05

Added inline datasources and global debug to all actions for improved integration capabilities
