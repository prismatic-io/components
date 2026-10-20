## Changelog

### 2026-10-20

Updated the **Updated Records** polling trigger with batching and initial sync support:

- Added opt-in batching to the **Updated Records** trigger, dispatching each changed record individually or in configured batches; enabling it changes the shape a downstream step receives
- Added an optional **Look-back Date** input for performing an initial sync of records. The initial sync begins on the first recurrence and backfills every record modified on or after the specified date, seeding each once; later recurrences are unaffected. Leave it empty to start from the first recurrence with no backfill

### 2026-06-11

Added the **Updated Records** polling trigger for Contacts and Invoices, which checks for contacts or invoices modified since the last run

### 2026-04-30

Updated spectral version

### 2026-04-07

Added trigger documentation

### 2026-03-31

Various modernizations and documentation updates

### 2026-03-16

Improved input field documentation with formatted URL links for better readability

### 2025-10-17

Enhanced webhook lifecycle management with improved entity trigger handling and subscription management

### 2025-09-18

Added inline data sources for contacts, invoices, organizations, users, and work items to improve data selection and workflow integration
