## Changelog

### 2026-09-04

Added Enterprise Grid support and enhanced component capabilities:

- Added the **List Teams** action for listing the workspaces in an Enterprise Grid organization
- Added the **Select Team** inline data source, providing a dropdown for the **Team ID** input on the **Create Conversation**, **List Conversations**, **List User Conversations**, **List Users**, **Search All**, **Search Files**, and **Search Messages** actions
- Added the **Search Conversation** action for searching channels across an Enterprise Grid organization
- Added org-level install detection; actions that accept a **Team ID** now report a clear error when an org-level token is used without one
- Updated the Slack API host to be read from the connection rather than a fixed address, so a Slack Gov connection reaches the Slack Gov API for token verification and for the **Raw Request** action
- Updated inline action calling support on the **Conversation Exists**, **Get Conversation History**, **List Conversation Members**, **List Conversations**, **List Files**, **List Users**, and **List User Conversations** actions for improved example output during configuration
- Added opt-in batching to the **New and Updated Messages** trigger, dispatching each changed record individually or in configured batches so large backlogs drain in one recurrence; enabling it changes the shape a downstream step receives
- Added an optional **Look-back Date** input on the **New and Updated Messages** trigger for performing an initial sync of records; the backfill begins on the first recurrence and seeds each record once; later recurrences are unaffected
- Fixed **List Files** raising a TypeError when **Fetch All** is enabled; enumeration currently stops at the first page

### 2026-07-31

Added inline action calling support across all actions so the app builder can show example output during configuration

### 2026-07-20

Grouped related inputs into structured objects across list, search, and conversation actions:

- Grouped **Limit** and **Cursor** into a **Pagination** structured object on **Get Conversation History**, **List Conversations**, **List Conversation Members**, **Search Conversation**, **List Users**, and **List User Conversations**; the **Fetch All** input stays flat
- Grouped **Count** and **Page** into a **Pagination** structured object on **Search Messages**, **Search Files**, and **Search All**
- Grouped **Include Public Channels**, **Include Private Channels**, **Include Multi-Party IM Channels**, and **Include IM Channels** into a **Channel Types** structured object on **List Conversations**
- Grouped **Oldest**, **Latest**, and **Inclusive** into a **Time Range** structured object on **Get Conversation History**

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
