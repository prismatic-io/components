## Changelog

### 2026-05-26

Added the **New and Updated Tickets** polling trigger using the Zendesk Incremental Tickets Export cursor stream. The trigger drains pages until `end_of_stream` and persists both the cursor and the last polled timestamp for accurate created vs. updated partitioning

### 2026-04-30

Various modernizations and documentation updates

### 2026-03-16

Improved input field documentation with formatted URL links for better readability

### 2026-03-13

Enhanced OAuth 2.0 connections with PKCE S256 support for improved authorization security. Removed the **Debug Request** input from all action inputs.

### 2026-03-05

Added inline data sources for topic, article, section, and post subscriptions to enable dynamic dropdown selection

### 2026-02-26

Added inline data sources for users, tickets, topics, and posts to enable dynamic dropdown selection

### 2025-11-19

Enhanced webhook triggers to support simulated test executions

### 2025-08-04

Security improvements to the API token connection
