## Changelog

### 2026-05-26

- Added **New and Updated Records** polling trigger powered by the `GET /v1/recents` endpoint. The trigger monitors a single Pipedrive item type (Deals, Persons, Activities, Organizations, etc.) and separates results into `created` and `updated` buckets so integrations can branch on the type of change
- Relabeled **Webhook** trigger label (previously "Webhook Trigger") for consistency

### 2026-04-30

Various modernizations and documentation updates

### 2026-03-31

Removed Channels API actions (**Add Channel**, **Delete Channel**, **Delete Conversation**) — Pipedrive removed the Channels API on February 1, 2026

### 2026-03-16

Various modernizations and documentation updates

### 2026-03-13

Removed the **Debug Request** input from all action inputs. Debug logging is now controlled internally and no longer appears as a configurable field in actions.

### 2026-03-05

Added inline data source for files to enable dynamic dropdown selection

### 2026-02-26

Added inline data sources for users, products, stages, pipelines, leads, activities, and filters to enable dynamic dropdown selection

### 2025-10-17

Enhanced webhook lifecycle management with improved trigger subscription handling and automated cleanup
