## Changelog

### 2026-11-10

Published the component as an npm package, so code-native integrations can install it and call its actions, triggers and data sources from code with TypeScript types

### 2026-11-10

Refactored internal code

### 2026-11-10

Updated spectral to 10.38.5 and switched the build from webpack to tsdown:
- tsdown 0.22.3

### 2026-04-30

Updated spectral version

### 2026-03-13

Removed the **Debug Request** input from all action inputs. Debug logging is now controlled internally and no longer appears as a configurable field in actions.

### 2026-02-06

Fixed an issue where the **Key Pair Authentication** connection applied unnecessary formatting to the **Username** field, which could cause JWT authentication failures for usernames that should not be uppercased or have dots replaced with hyphens.

### 2025-12-19

Fixed an issue where the **Execute SQL** action failed when polling for async query results due to an incorrect API endpoint URL.

### 2025-11-25

Changed the **Passphrase** field in the **Key Pair Authentication** connection to optional, allowing use of unencrypted private keys without entering a passphrase.
