## Changelog

### 2026-10-21

Fixed credential logging in Debug Mode and improved metric and webhook input handling and request validation:

- Fixed Debug Mode printing the API key, application key, and OAuth access token in request headers in the logs; Debug Mode no longer logs request details on any action, including **Raw Request**, so credentials are no longer logged
- Updated the **Alert Notification Events** trigger to register its Datadog webhook idempotently: a deploy updates a webhook of the same name that already points to the flow, creates it when absent, and fails with an error asking for a unique **Webhook Name** when that name belongs to a webhook pointing elsewhere; deleting the trigger or leaving Listening Mode removes the webhook only if it points to the flow, and renaming the **Webhook Name** removes the webhook registered under the old name
- Fixed **Submit Single Metric** submitting a data point of 0 when **Value** was left blank; a blank **Value** now fails with "Value is required and must be a number."
- Fixed **Update Webhook** sending an empty URL when **Webhook URL** was left blank; a blank **Webhook URL** is now omitted from the request, so the webhook keeps its existing URL
- Updated **List Metrics** to reject a blank **From**; a blank **From** previously listed metrics from the epoch and now fails with "From is required and must be a number."
- Updated **Submit Metrics** to validate **Metric Series**; malformed JSON or a value that is not an array now fails with a clear message instead of an opaque API error
- Updated **Submit Single Metric** to omit the resource entry from the request when neither **Resource Name** nor **Resource Type** is set
- Added an output schema to the **Delete Webhook** action for improved field mapping during configuration

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