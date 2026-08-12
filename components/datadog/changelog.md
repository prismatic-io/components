## Changelog

### 2026-08-12

Fixed webhook alert delivery and improved input and action configuration:

- Fixed the **Alert Notification Events** trigger to register its Datadog webhook against the deployed flow's own URL, so alert notifications are now delivered in flows with any name
- Grouped the optional metric configuration and resource inputs on **Submit Single Metric** into a **Metric Fields** structured object; **Tags** remains a top-level input
- Added inline action calling support across all actions so the app builder can show example output during configuration
- Added output schemas to actions for improved field mapping

### 2026-04-30

Updated spectral version

### 2026-03-06

Initial release of the Datadog component with support for submitting metrics, managing webhook integrations, and receiving monitor alert notifications via the Alert Notification Events trigger