## Changelog

### 2026-05-28

Various modernizations and documentation updates

### 2026-05-01

Refactored the **Topic Webhook** trigger lifecycle to be idempotent:

- The create handler now always unsubscribes and resubscribes on redeploy instead of skipping when inputs are unchanged
- Cross-flow state is now keyed by flow stable ID, with automatic migration from the legacy state key on first execution

### 2026-03-31

Various modernizations and documentation updates

### 2025-12-02

Added a **Topic Webhook** trigger that automatically creates and manages webhook subscriptions for SNS topics

### 2025-06-05

Added inline data sources for topics and subscriptions to enhance data selection capabilities
