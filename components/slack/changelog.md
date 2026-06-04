## Changelog

### 2026-05-28

Added **New and Updated Records** polling trigger that monitors a channel for new messages on a configured schedule. Messages are emitted in the `created` bucket; the `updated` bucket is always empty because Slack's `conversations.history` API does not surface message edits as separate records — use the webhook trigger to receive `message_changed` events

### 2026-04-30

Various modernizations and documentation updates

### 2026-03-13

Removed the **Debug Request** input from all action inputs. Debug logging is now controlled internally and no longer appears as a configurable field in actions.

### 2026-02-02

Improved channel fetching for **List Conversations** action and **Select Channel** data source:
- Refactored to fetch channels by type (public, private, IM, multi-party IM) separately for more reliable results
- Improved pagination handling when fetching large channel lists with mixed types

### 2025-11-19

Enhanced webhook triggers to support simulated test executions

### 2025-04-25

Added inline data sources for improved data selection and integration capabilities
