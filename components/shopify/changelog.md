## Changelog

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
