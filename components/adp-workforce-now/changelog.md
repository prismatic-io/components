## Changelog

### 2026-05-05

Added **New and Updated Records** polling trigger for detecting new records across supported resources:
- Supports **Workers** and **Worker Demographics** resource types
- Works with the existing certificate-based **OAuth 2.0** connection
- Detects new records by tracking previously seen IDs across polls, since ADP list endpoints do not expose record-level modification timestamps; as a result, records that only change their underlying data (without being newly returned) may not be flagged as updated. For higher-fidelity change detection, consider ADP's event notifications API

### 2026-04-30

Updated spectral version

### 2026-03-31

Various modernizations and documentation updates

### 2026-03-13

Removed the **Debug Request** input from all action inputs. Debug logging is now controlled internally and no longer appears as a configurable field in actions.

### 2026-02-25

Updated connection to allow custom token endpoint URLs for organizations using non-standard ADP authentication endpoints

### 2026-01-26

Enhanced worker and personal contact actions with inline data source dropdowns. Users can now select workers and personal contacts directly from dropdown menus instead of manually entering IDs:
- **Associate OID** inputs now display a searchable list of workers with their names and IDs
- **Personal Contact ID** inputs (in **Get Personal Contact**, **Update Personal Contact**, and **Delete Personal Contact** actions) now display a list of the selected worker's contacts
