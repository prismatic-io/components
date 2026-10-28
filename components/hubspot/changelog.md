## Changelog

### 2026-10-28

Moved the component to HubSpot's date-based APIs and expanded action configuration support:

- Updated the component to call HubSpot's date-based 2026-09 API version in place of the legacy v1 and v3 APIs; existing **Search Endpoint** selections keep working without being reselected
- Updated the component documentation to note that, starting with the 2026-09 API version, HubSpot enforces a portal's required-property validation rules on every CRM create and update request, and association writes over a user-level **OAuth 2.0** connection require the **Edit Associations** permission
- Updated **Create Association** and **Archive Association** to resolve **Type Of Association** by numeric association type ID or association label; a legacy type name such as `contact_to_company` that matches neither now fails before any association is changed
- Updated **List Association Types** and **Read Association** to report each association type by its label, or by its numeric type ID when it has no label, and **Archive Association** to return HubSpot's response instead of an empty result
- Added the **Select Object Type** inline data source to **From Object Type** and **To Object Type** on **Create Association**, **Archive Association**, **Read Association**, and **List Association Types** for choosing from standard and custom objects; standard object names entered before, in singular or plural and any casing, such as `contact` or `Line_items`, are still accepted without being reselected
- Added the **Select Association Type** inline data source to **Type Of Association** on **Create Association** and **Archive Association** for choosing from the association types available for the selected object pair
- Updated **Import CRM Data** to group its **Import Operations**, **Marketable Contact Import**, and **Create Contact List From Import** inputs into **Import Options**
- Fixed the **Get Product** action reporting "No line items found" when no product matched the **Product Name**
- Added inline action calling support to the **Create Custom Object**, **Delete Custom Object**, **Get Company**, **Get Contact**, **Get Deal**, **Get Line Item**, **Get Product**, and **Update Custom Object** actions for improved example output during configuration
- Added output schemas to 12 actions for improved field mapping during configuration

Configuration notice: **Create Association** and **Archive Association** no longer accept a legacy association type name in **Type Of Association**. Re-enter it as the numeric association type ID or the label that **List Association Types** returns for the same object pair. **List Association Types** and **Read Association** now return the label, or the numeric type ID when the type has no label, in `name` and `type` instead of the legacy type name; check any step that reads those fields.

### 2026-09-02

Improved trigger inputs, connection options, action correctness, and developer experience:

- Added **Property Change Properties** input to the **Event Type Subscription** trigger, enabling property change event types to include the required property names in each webhook subscription

  Reconfiguration notice: The **Event Type Subscription** trigger now requires an entry in **Property Change Properties** for every property change event type selected. An existing configuration that selects one will fail the next time its webhook configuration is created, on a first deploy or a redeploy with **Overwrite Webhook Settings** enabled, until the property names are entered.

- Fixed the **Delete Line Item** action sending a GET request instead of DELETE, so the line item was never deleted
- Updated the **Private App Access Token** connection, now labeled **Private App Access Token or Service Key**, to accept a HubSpot account service key in the same field as a private app access token; service keys are HubSpot's recommended credential for new system-to-system integrations, and either credential works for every action
- Updated the connection documentation to note that the webhook actions and the **Event Type Subscription** trigger require an **OAuth 2.0** connection backed by a legacy public app, which HubSpot stopped allowing accounts to create on June 23, 2026; the **Webhook** trigger and both polling triggers are unaffected
- Updated **List Companies**, **List Contacts**, **List Deals**, **List Line Items**, **List Products**, and **Search Deals** to group their cursor and page-size inputs into **Pagination** for an improved user experience, where **Fetch All** stays a top-level toggle
- Updated **Create Contact** and **Update Contact** to group their email, phone, and website inputs into **Contact Information**
- Added inline action calling support to 58 actions for improved example output during configuration
- Added output schemas to 40 actions for improved field mapping during configuration

### 2026-08-19

Reworked the **New and Updated Records** and **New and Updated Custom Records** triggers for large data volumes and correct filtering:

- Added an optional **Look-back Date** input across all polling triggers for performing an initial sync of records. The initial sync backfills every record created on or after the specified date, seeding each once and ignoring the field and visibility filters; later recurrences are unaffected. Leave it empty to start from the first recurrence with no backfill
- Added opt-in batching across all polling triggers, dispatching each changed record individually or in configured batches so a large backlog drains within one recurrence; enabling it changes the shape a downstream step receives
- Added support for object types holding more than the 10,000 records a single HubSpot search returns, draining the remainder on later recurrences. A larger result set previously failed
- Updated both triggers to always return both `createdRecords` and `updatedRecords`. A disabled **Show New Records** or **Show Updated Records** now yields an empty array where the key was previously absent
- Updated **Search Properties** `filters` and `filterGroups` to restrict results instead of widening them. They were previously OR-combined with the trigger's date window, so configured filters returned matching records regardless of date
- Updated **Search Properties** `sorts` to be ignored by these triggers; they now sort ascending by the object's creation property during the initial sync and its last-modified property on later recurrences, so a recurrence can resume where it left off
- Fixed the **New and Updated Custom Records** trigger retrieving every record of the custom object type on each recurrence instead of only the changed ones. It now filters and sorts on `hs_lastmodifieddate`, so the custom object type must expose that property

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
