## Changelog

### 2026-08-04

Added new action and enhanced file reading:

- Added **Create Directory** action to create directories on an FTP server, with optional recursive creation of nested paths
- Added **Return Buffer** input to the **Read File** action to force `application/octet-stream` content type, useful for non-UTF-8 text files

### 2026-05-05

Upgraded `basic-ftp` from 5.0.2 to 5.2.1 to patch CVE-2026-27699 (path traversal vulnerability, CVSS 9.1)

### 2026-02-24

- Added **New or Modified Files** polling trigger that detects new and modified files in a directory on a configured schedule
