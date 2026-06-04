## Changelog

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
