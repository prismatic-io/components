## Changelog

### 2026-11-09

Updated spectral to 10.39.1

### 2026-11-05

Updated spectral to 10.39.0

### 2026-11-03

Published the component as an npm package, so code-native integrations can install it and call its actions, triggers and data sources from code with TypeScript types

### 2026-11-02

Updated spectral to 10.34.1

### 2026-10-09

- Added opt-in batching to the **New Registrants** trigger, dispatching each changed record individually or in configured batches; enabling it changes the shape a downstream step receives
- Added an optional **Look-back Date** input to the **New Registrants** trigger for performing an initial sync of records. The initial sync begins on the first recurrence and backfills every registrant who registered on or after the specified date, seeding each once; later recurrences are unaffected. Leave it empty to start from the first recurrence with no backfill

### 2026-07-21

Restructured action inputs into structured objects for an improved user experience

- **Create Registrant** groups address inputs into **Address**, name inputs into **Name**, contact-channel inputs into **Contact Information**, and professional/survey inputs into **Additional Fields**
- **Create Webinar** and **Update Webinar** group email-notification inputs into **Email Settings**; **Create Webinar** also groups miscellaneous settings into **Additional Fields**
- **Get Webinars** groups page and size inputs into **Pagination** and time-range inputs into **Date Range**; **Fetch All** stays a top-level toggle
- **List Registrants** groups page and limit inputs into **Pagination**

### 2026-06-29

Various modernizations and documentation updates

### 2026-06-08

Added the **New Registrants** polling trigger, which checks a webinar for registrants added since the last run

### 2026-04-30

Updated spectral version

### 2026-04-07

Added global debug support across all actions for improved troubleshooting

### 2026-02-26

Added inline data source for registrants to enable dynamic dropdown selection

### 2025-10-17

Enhanced webhook lifecycle management with improved user subscription trigger handling and automated cleanup

### 2025-04-07

Initial release of GoTo Webinar component with comprehensive webinar management, attendee tracking, and user subscription capabilities
