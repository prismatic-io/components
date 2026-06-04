## Changelog

### 2026-04-30

Updated spectral version

### 2026-04-06

Updated **Create Product** action to make **Product SKU** and **Price** inputs optional, aligning with the HubSpot API which only requires the product name

### 2026-03-10

Enhanced authentication security and fixed an association action bug:

- Upgraded **OAuth 2.0** token endpoint from v1 to v3 for improved security. The v3 endpoints send authentication parameters in the request body rather than query strings, preventing sensitive credentials from appearing in server logs.
- Fixed **Read Association** action to use the correct input parameter

### 2026-02-26

Added inline data sources for imports and custom objects to enhance data selection capabilities

### 2025-11-18

Updated **New and Updated Records** to use record type specific date properties to ensure full compatibility with search endpoint record types.

### 2025-11-17

Enhanced **New and Updated Records** and **New and Updated Custom Records** triggers filtering capabilities. Ensuring accurate detection of new and updated records while preventing potential duplicate processing.

### 2025-10-17

Enhanced webhook lifecycle management with improved event type subscription handling and automated cleanup.

### 2025-09-18

Improved OAuth trigger documentation and reorganized connection documentation for better clarity

### 2025-05-14

Added inline data sources for companies, contacts, deals, engagements, line items, products, properties, and webhooks to enhance data selection capabilities
