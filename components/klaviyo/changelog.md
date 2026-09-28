## Changelog

### 2026-09-28

- Added output schemas to 37 actions for improved field mapping during configuration
- Added inline action calling support to the **Get Account**, **Get Campaign**, **Get Event**, **Get Image**, **Get List**, **Get Profile**, **Get Segment**, **Get Template**, and **List Accounts** actions for improved example output during configuration
- Added opt-in batching to the **New and Updated Campaigns** and **New and Updated Profiles and Lists** triggers, dispatching each changed record individually or in configured batches so large backlogs drain in one recurrence; enabling it changes the shape a downstream step receives
- Added an optional **Look-back Date** input for performing an initial sync of records on the **New and Updated Campaigns** and **New and Updated Profiles and Lists** triggers. The initial sync backfills every record modified on or after the specified date, seeding each once; later recurrences are unaffected. Leave it empty to start from the first recurrence with no backfill
- Fixed the **New and Updated Campaigns** and **New and Updated Profiles and Lists** triggers reporting no changes on every recurrence, so new and updated records never reached the flow

### 2026-09-01

Restructured action inputs into structured objects for an improved user experience.

- Updated **Create Profile** and **Update Profile** to group their contact-channel and name inputs into **Contact Information**, and their remaining optional profile details into **Profile Details**
- Updated **Create Campaign** and **Update Campaign** to group their tracking, send, and delivery-strategy inputs into **Campaign Configuration**
- Updated **Create Event** to group its optional event metadata and value inputs into **Event Details**

### 2026-05-05

Added two new triggers using Klaviyo's server-side filter for efficient change detection:

- **New and Updated Profiles and Lists** for profiles and lists
- **New and Updated Campaigns** which requires a **Message Channel** input

### 2026-04-30

Updated spectral version

### 2026-02-26

Added inline data sources for segments, lists, and images to enable dynamic dropdown selection

### 2025-07-23

Added inline data sources for accounts, campaigns, events, profiles, and templates to enhance data selection capabilities
