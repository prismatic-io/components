## Changelog

### 2026-08-14

Improved action configuration and connection setup guidance:

- Added setup steps and vendor documentation links to the **OAuth 2.0** and **OAuth 2.0 Client Credentials** connection documentation, including the callback URL required to complete the **OAuth 2.0** authorization flow
- Added output schemas to 53 actions for improved field mapping during configuration
- Added inline action calling support across all actions for improved example output during configuration
- List actions (**List Assets**, **Query Assets**, **List Automations**, **List Campaigns**, **List Categories**, **List Data Extensions**, **List Journeys**, **List Email Definitions**, **List SMS Definitions**) group their pagination controls into **Pagination**; **Fetch All** stays a top-level toggle
- **Create Campaign** groups its optional fields into **Additional Fields**, keeping **Campaign Name** at the top level
- Corrected the **Message Key** description on **Send Email**, which described the input as the email definition identifier rather than the unique key that identifies an individual send, and the **Parent Category ID** description on **Create Category**, which described a required input as optional
- Renamed the **Extra Body** input on **Update Automation** to **Automation Properties**

### 2026-04-30

Updated spectral version

### 2025-02-23

Initial release of the Salesforce Marketing Cloud component with support for Content Builder assets, contacts, data extensions, transactional email, transactional SMS, journeys, campaigns, automations, and Event Notification Service (ENS) webhooks
