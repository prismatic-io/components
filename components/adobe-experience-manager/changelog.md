## Changelog

### 2026-11-02

Initial release of the Adobe Experience Manager component for working with content in Adobe Experience Manager as a Cloud Service:

- Added content fragment, asset, folder, and page actions, including **Search Content Fragments**, **Search Assets**, **Update Asset Metadata**, **Import Asset from URL**, **Create Folders**, and **Get Published Page HTML**, plus a **Raw Request** action
- Added **New and Updated Fragments** and **New and Updated Assets** polling triggers with opt-in batching, dispatching each changed record individually or in configured batches so large backlogs drain in one recurrence; enabling it changes the shape a downstream step receives
- Added an optional **Look-back Date** input on the **New and Updated Fragments** and **New and Updated Assets** triggers for performing an initial sync. The initial sync begins on the first recurrence and backfills every content fragment or asset modified on or after the specified date, seeding each once; later recurrences are unaffected. Leave it empty to start from the first recurrence with no backfill
- Added **AEM Sites Event Subscription** (content fragment and page events) and **AEM Assets Event Subscription** (asset events) webhook triggers, each registering its own Adobe I/O Events webhook for the selected event types
- Added **Select Content Fragment**, **Select Content Fragment Model**, **Select Folder**, **Select Folder Path**, **Select Asset**, **Select Asset Rendition**, and **Select Sitemap Page** data sources, also offered as inline dropdowns on the matching inputs for selecting content without looking up IDs and paths
- Added **OAuth 2.0 Client Credentials** and **OAuth 2.0** connections. Use **OAuth 2.0 Client Credentials** for unattended and scheduled flows; the content fragment actions, the **New and Updated Fragments** trigger, and both event subscription triggers require it. Adobe issues no refresh token to the **OAuth 2.0** connection, so a user must re-authorize it every 24 hours
- Added output schemas to 20 actions for improved field mapping during configuration
- Added inline action calling support to 22 actions for improved example output during configuration
