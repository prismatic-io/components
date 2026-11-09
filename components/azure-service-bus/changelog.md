## Changelog

### 2026-11-09

Updated spectral to 10.39.1

### 2026-11-05

Updated spectral to 10.39.0

### 2026-11-03

Published the component as an npm package, so code-native integrations can install it and call its actions, triggers and data sources from code with TypeScript types

### 2026-11-02

Updated spectral to 10.34.1 and switched the build from webpack to tsdown:
- tsdown 0.22.3

### 2026-06-11

Added **Fetch All** toggle to list actions (List Queues, List Topics By Namespace, List Subscriptions By Topic, List Rules, List Namespaces, List Namespaces By Resource Group) that automatically follows `nextLink` pagination to retrieve all pages of results in a single call; when disabled, existing single-page behavior with Skip and Top inputs is preserved

### 2026-05-20

Applied automated security patches and code formatting updates

### 2026-04-30

Updated spectral version

### 2026-04-07

Added global debug support across all actions for improved troubleshooting

### 2026-03-27

Added optional **Subscription ID** and **Resource Group Name** inputs to **Receive Messages from Queue** and **Send to Queue** actions to support inline datasource dependencies

### 2026-02-26

Added inline data sources for subscriptions, namespaces, queues, topics, and rules to enable dynamic dropdown selection
