## Changelog

### 2026-10-20

- Added batching to the **New and Updated Records** trigger; enabling it changes the shape a downstream step receives
- Added a **Look-back Date** input to the **New and Updated Records** trigger; the backfill begins on the first recurrence, seeds each record once, and ignores the trigger's filters

### 2026-05-20

Applied automated security patches and code formatting updates

### 2026-04-30

Updated spectral version

### 2026-04-21

Added **New and Updated Records** polling trigger that checks for new and updated contacts, invoices, and ledger accounts in Sage Accounting on a configured schedule

### 2026-04-07

Added global debug support across all actions for improved troubleshooting

### 2026-03-05

Added inline data sources for contacts, contact types, contact people, ledger accounts, ledger account types, sales invoices, purchase invoices, countries, address types, and currencies to enhance data selection capabilities
