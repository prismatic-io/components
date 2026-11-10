## Changelog

### 2026-11-10

Refactored internal code

### 2026-11-03

Improved reliability and the configuration experience across actions

- Fixed actions other than **Raw Request** reporting success when Expensify rejected a job; the step now fails with an error containing the response code and message
- Fixed **Raw Request** sending the **Data** input as numbered character entries instead of its JSON content; the JSON is now merged into the request
- Fixed optional JSON inputs such as **On Finish**, **Filters**, **Categories**, **Tags**, **Report Fields**, and **Employees** prefilling sample data that was sent to Expensify unless cleared; the samples now appear only as examples
- Fixed **Update Employee** ignoring a disabled **Fix Approval Chains** input (previously labeled **Admin Only**), which left Expensify fixing approval chains; turning it off now takes effect
- Updated **Export Report** to group its optional inputs into **Additional Fields** and **Update Employee** to group its provisioning inputs into **Provisioning Options**
- Added inline action calling support to 11 actions for improved example output during configuration
- Added output schemas to 10 actions for improved field mapping during configuration

### 2026-04-30

Updated spectral version

### 2026-04-21

Added **New Policies** polling trigger that checks for new policies in Expensify on a configured schedule, using ID-based change detection

### 2026-04-07

Added global debug support across all actions for improved troubleshooting
