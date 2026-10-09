## Changelog

### 2026-10-09

- Added opt-in batching to the **Employee Changes** and **New Hire Status** triggers, dispatching each changed record individually or in configured batches; enabling it changes the shape a downstream step receives
- Added an optional **Look-back Date** input to the **Employee Changes** trigger for performing an initial sync of records. The initial sync begins on the first recurrence and seeds each employee change made on or after the specified date once; later recurrences are unaffected. Leave it empty to start from the first recurrence with no backfill

### 2026-09-01

Restructured action inputs into structured objects for an improved user experience.

- Employee retrieval actions (**Get All Person Details**, **Get Person Details by Company**, **Get All Employment Details by Company**, **Get Employee Employment Details**, **Get Employee Employment Details by Employee ID and Company ID**, **Get All Employment Contract Details**, **Get Employee Demographic Details**, **Get Employee Job History**, **Get Employee Changes by Date**) group their page and page-size controls into **Pagination**; **Fetch All** stays a top-level toggle
- Configuration list actions (**List Companies**, **List Jobs**, **List Positions**) group their page and page-size controls into **Pagination**, alongside their existing filter inputs

### 2026-04-30

Updated spectral version

### 2026-02-05

Initial release of UKG Pro component with comprehensive integration capabilities
