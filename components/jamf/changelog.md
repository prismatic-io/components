## Changelog

### 2026-07-21

Restructured action inputs into structured objects for an improved user experience:

- List actions (**List Categories**, **List Departments**, **List Packages**, **List Scripts**, **List Users**, **List Computers**, and **List Mobile Devices**) group their pagination inputs into **Pagination**; **Fetch All** stays a top-level toggle
- **Create Package**, **Update Package**, **Create Script**, **Update Script**, **Create Webhook**, and **Update Webhook** group their optional inputs into **Additional Fields**

### 2026-06-16

Enhanced **List Mobile Devices** with full inventory detail

### 2026-06-10

Initial release of the Jamf Pro component, providing:

- Connects to Jamf Pro using **OAuth 2.0 Client Credentials** (Jamf Pro 10.49.0+) or **Basic Authentication**
- Manages Computers, Mobile Devices, Users, Departments, Categories, Scripts, Packages, and Webhooks through dedicated actions
- Includes a **Raw Request** action with an **API** option to target either the Jamf Pro API or the Classic API
- Offers a **Manual Webhook** trigger plus a managed **Webhook Events** trigger that creates a webhook per selected event on instance deploy, secures deliveries with a generated authentication header, removes the webhooks on instance delete, and covers all 22 Jamf Pro event types
- Provides **New Computers** and **New Mobile Devices** polling triggers that page through all results
- Surfaces **Select Computer**, **Select Mobile Device**, **Select Department**, **Select Category**, **Select Package**, **Select Script**, and **Select Webhook** data sources, wired to the relevant ID inputs across the get, update, and delete actions
- Supports a **Fetch All** option on list actions to optionally retrieve every page of results in a single run
- Applies partial updates on **Update Package**, **Update Script**, and **Update Category** so fields left blank keep their current values
- Returns a confirmation message from **Update Computer**, since the Jamf Pro endpoint responds with no content on success
- Secures **Create Webhook** with header authentication and supports optional header validation on the **Manual Webhook** trigger
- Documents known Jamf Pro behavior where **Delete Package** can return a 500 or 504 error while still deleting the package
