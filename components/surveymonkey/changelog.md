## Changelog

### 2026-05-27

Added the **New and Updated Records** polling trigger that monitors a survey for new and modified responses:

- Newly created responses are routed to the `created` branch
- Previously created responses modified since the last poll are routed to the `updated` branch
- Requires the `responses_read_detail` scope, available on paid SurveyMonkey plans

### 2026-05-20

Applied automated security patches and code formatting updates

### 2026-04-30

Updated spectral version

### 2026-03-16

Scopes input removed from the OAuth 2.0 connection configuration as scopes are instead defined at the app level.

### 2026-02-26

Added inline data sources for contacts and survey responses to enable dynamic dropdown selection

### 2026-02-05

Initial release of the SurveyMonkey component with comprehensive integration capabilities:

- Added **OAuth 2.0** and **Access Token** connections with regional support (US, EU, Canada)
- Added 36 actions across 8 resource categories including surveys, collectors, responses, contacts, contact lists, webhooks, users, and raw request
- Added 4 data sources: **Select Survey**, **Select Collector**, **Select Contact List**, and **Select Webhook Event Type**
