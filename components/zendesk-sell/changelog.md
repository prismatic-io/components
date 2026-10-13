## Changelog

### 2026-10-13

Added opt-in batching and an initial sync to the **New and Updated Records** polling trigger:

- Added opt-in batching to the **New and Updated Records** trigger, dispatching each changed record individually or in configured batches; enabling it changes the shape a downstream step receives
- Added an optional **Look-back Date** input for performing an initial sync of records. The initial sync begins on the first recurrence and backfills every record modified on or after the specified date, seeding each once and ignoring the trigger's visibility filters; later recurrences are unaffected. Leave it empty to start from the first recurrence with no backfill

### 2026-07-01

Restructured action inputs into structured objects for an improved user experience.

- **Contact** and **Lead** create, update, and upsert actions group their contact-channel and address inputs into **Contact Information** and **Addresses**
- List actions (**List Contacts**, **List Leads**, **List Deals**, **List Notes**, **List Tasks**, **List Orders**, **List Pipelines**, **List Stages**) group their inputs into **Pagination** and **Additional Fields**, where **Additional Fields** holds optional query controls such as sort and match-mode; **Fetch All** stays a top-level toggle

### 2026-05-28

Added **Fetch All** input to list actions to automatically retrieve all pages of results in a single call:

- **List Contacts**
- **List Deals**
- **List Leads**
- **List Notes**
- **List Orders**
- **List Pipelines**
- **List Stages**
- **List Tasks**

### 2026-05-20

Applied automated security patches and code formatting updates

### 2026-04-30

Updated spectral version

### 2026-04-21

Added **New and Updated Records** polling trigger that checks for new and updated deals, leads, contacts, tasks, or notes in Zendesk Sell on a configured schedule

### 2026-04-07

Added global debug support across all actions for improved troubleshooting

### 2026-03-31

Various modernizations and documentation updates

### 2026-03-05

Added inline data sources for contacts, deals, leads, notes, orders, and tasks to enhance data selection capabilities
