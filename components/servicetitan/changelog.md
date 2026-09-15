## Changelog

### 2026-09-15

- Fixed optional JSON inputs, including **Address**, **Contacts**, **Custom Fields**, **External Data**, **Location**, **Attachments**, **Items**, **Payments**, and **Job Generated Lead Source**, which pre-filled a placeholder template and then submitted it as real data when the field was left untouched, so renaming a customer could replace their stored address with the template; the templates are now shown as examples only
- Fixed the **New and Updated Records** trigger dropping records that shared a timestamp with a record it had already delivered, and advancing its cursor past records it never returned; the cursor now advances only to the newest record actually delivered, and holds when a recurrence returns nothing
- Added an optional **Look-back Date** input for performing an initial sync on the **New and Updated Records** trigger. The initial sync begins on the first recurrence and backfills every record created or modified on or after the specified date, seeding each once and ignoring the trigger's visibility filters; later recurrences are unaffected. Leave it empty to start from the first recurrence with no backfill
- Added opt-in batching to the **New and Updated Records** trigger, dispatching each changed record individually or in configured batches so large backlogs drain in one recurrence; enabling it changes the shape a downstream step receives
- Updated **Reason ID** and **Invoice ID** to send whole numbers rather than text on the job and invoice actions, matching the integer types the ServiceTitan API declares for those fields
- Added output schemas to 47 actions for improved field mapping during configuration
- Added inline action calling support to 56 actions for improved example output during configuration
- Updated the **Application Key** connection field and the technician **Password** input to masked password inputs, since their values are secrets
- Updated outbound requests to send a valid Accept header and to report an unauthorized connection as a connection error
- Updated labels for accuracy: the appointment assignment actions now read **Assign Technicians to Appointment**, **Unassign Technicians from Appointment**, and **List Appointment Assignments**, the invoice item identifier reads **Invoice Item ID** rather than **ID**, and the booking provider identifier reads **Booking Provider ID** rather than **Booking Provider**
- Fixed the **Raw Request** action description, which named an unrelated product instead of ServiceTitan

### 2026-08-05

Deprecated the **Create Payment** action and restructured action inputs into structured objects for an improved user experience:

- List actions group page and page-size inputs into **Pagination**; **Fetch All** stays a top-level toggle
- **Create Invoices** and **Update Invoice** group royalty-related inputs into **Royalty Details**
- **Update Invoice Items** groups miscellaneous optional inputs into **Additional Fields**
- **Create Installed Equipment** and **Update Installed Equipment** group warranty date inputs into **Warranty Dates**
- **Create Technician** and **Update Technician** group optional profile inputs into **Additional Fields**

### 2026-05-20

Various modernizations and documentation updates

### 2026-04-30

Updated spectral version

### 2026-04-21

Added **New and Updated Records** polling trigger that checks for new and updated jobs, appointments, invoices, customers, and other records in ServiceTitan on a configured schedule

### 2026-03-13

Removed the **Debug Request** input from all action inputs. Debug logging is now controlled internally and no longer appears as a configurable field in actions.

### 2026-02-26

Added inline data sources for business units, user roles, job cancel reasons, customer contacts, and payments to enable dynamic dropdown selection
