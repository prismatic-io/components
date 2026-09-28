## Changelog

### 2026-09-28

Fixed missing vulnerability data in asset risk and remediation ticket results, and added inline action calling support:

- Fixed **List Asset Risk Data** returning zero for every vulnerability severity count and for the total vulnerability count
- Updated **List Asset Risk Data** to report each host's last activity date and days since last activity in place of the last scan date, which was always empty
- Fixed **List Remediation Tickets** returning empty QID, severity, and type values for every ticket
- Updated **List Remediation Tickets** to return the assignee's name and email as separate fields, the affected host's IP address, DNS name, and service, and each ticket's CVE IDs, vendor references, and first found, last found, and last scan dates, and to drop the status, category, and hosts fields, which the API never populated
- Added inline action calling support to 10 actions for improved example output during configuration

### 2026-08-31

Updated the **Changed Assets** polling trigger to tag each batched record with its change type, so downstream steps can distinguish newly created assets from updated ones

### 2026-08-26

Initial release of Qualys component with VMDR asset management, vulnerability scanning, tag management, and remediation ticket tracking
