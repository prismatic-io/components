## Changelog

### 2026-11-10

Published the component as an npm package, so code-native integrations can install it and call its actions, triggers and data sources from code with TypeScript types

### 2026-04-30

Improved TLS handling on SMTP connections:

- Fixed the **Use TLS** connection field so it is now honored; port 465 (implicit TLS) now connects correctly
- Inferred TLS mode from the port: 465 uses implicit TLS, and 587/2525 enforce STARTTLS when **Use TLS** is enabled, preventing downgrade attacks from the previous opportunistic STARTTLS behavior

Updated spectral version

### 2026-04-07

Various modernizations and documentation updates
