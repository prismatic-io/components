## Changelog

### 2026-11-11

Updated model defaults and the agent runtime, and published the component as an npm package:

- Updated the **Model** default on **Create Chat Completion** and **Create Response** to gpt-6-luna, replacing gpt-3.5-turbo, which OpenAI has shut down, and the retiring gpt-4.1
- Updated the **Model** default on **Agent: Create Image Generation Tool** to gpt-image-2.5-flare, replacing gpt-image-1, which OpenAI has shut down
- Updated the **Model** dropdown to offer gpt-6-astra, gpt-6.1-sol, gpt-6.1-terra and gpt-6-luna in place of the retiring GPT-5 and GPT-4.1 snapshots
- Updated the OpenAI Agents SDK behind the agent actions; a run that **Agent: Run** paused for approval before this version can no longer be continued with **Agent: Resume Run** and has to be started again, and model calls made after a resume now count toward **Max Turns**
- Published the component as an npm package, so code-native integrations can install it and call its actions, triggers and data sources from code with TypeScript types

### 2026-04-30

Updated spectral version

### 2026-04-07

Added global debug support across all actions for improved troubleshooting

### 2026-03-31

Various modernizations and documentation updates

### 2026-02-26

Added inline data source for files to enable dynamic dropdown selection

### 2025-08-23

Added file operations and enhanced agent capabilities:
- New file management actions: **Upload File**, **Download File**, and **Delete File** for use with OpenAI
- **Tool Flow Trigger** to enable flows as callable AI agent tools
- File attachment support in agent runs for processing PDFs, images, and documents
- Enhanced agent branching with file IDs and MCP server integration
- Improved agent configuration with custom tools and MCP servers
- Comprehensive test coverage for new file operations

### 2025-08-19

Added AI Agents functionality with support for building agents, custom and OpenAI hosted tools, and MCP server connections

### 2025-04-25

Modernized OpenAI component with updated libraries and upstream API changes
