## Changelog

### 2026-10-21

- Added opt-in batching to the **New and Updated Records** trigger, dispatching each changed record individually or in configured batches; enabling it changes the shape a downstream step receives
- Added an optional **Look-back Date** input for performing an initial sync of records. The initial sync backfills every message sent on or after the specified date, beginning on the first recurrence, seeding each record once, and ignoring the visibility filters. Leave it empty to start from the first recurrence with no backfill
- Fixed the **New and Updated Records** trigger re-delivering the most recent 10,000 messages on every recurrence, and never retrieving the older ones, once 10,000 or more messages were sent between recurrences; it now delivers the older messages over the following recurrences, each once

### 2026-05-28

Added **New and Updated Records** polling trigger for detecting newly sent messages on a configured schedule. New messages are emitted in the `created` bucket; the `updated` bucket is always empty since Twilio polling cannot detect status changes to already-sent messages — use the webhook trigger for status callbacks

### 2026-04-30

Various modernizations and documentation updates

### 2026-03-31

Various modernizations and documentation updates

### 2026-03-16

Various modernizations and documentation updates

### 2026-02-26

Added inline data source for messages to enable dynamic dropdown selection
