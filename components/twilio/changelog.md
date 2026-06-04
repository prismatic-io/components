## Changelog

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
