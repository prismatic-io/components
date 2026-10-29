import { action, input, util } from "@prismatic-io/spectral";
import type {
  MCPServerConfigStdio,
  MCPServerConfigHttp,
  MCPServerConfigWrapper,
} from "../types";

export const addLocalMcpServer = action({
  display: {
    label: "Agent: Add Local MCP Server",
    description: "Configure a local MCP server that runs via command line",
  },

  inputs: {
    serverLabel: input({
      label: "Server Label",
      type: "text",
      required: true,
      comments: "Unique identifier for the MCP server",
      example: "sequential-thinking",
    }),

    command: input({
      label: "Command",
      type: "string",
      required: true,
      default: "npx",
      model: [{ label: "npx", value: "npx" }],
      comments:
        "Command to execute the MCP server (currently only npx is supported)",
    }),

    args: input({
      label: "Arguments",
      type: "string",
      collection: "valuelist",
      required: false,
      comments: "Arguments to pass to the command",
      example: "-y",
    }),

    toolFilter: input({
      label: "Tool Filter",
      type: "string",
      collection: "valuelist",
      required: false,
      comments:
        "List of specific tool names to expose. If empty, all tools are exposed.",
      example: "think_forward",
    }),
  },

  perform: async (_, params) => {
    const serverLabel = util.types.toString(params.serverLabel);
    const command = util.types.toString(params.command);
    const args = params.args as string[] | undefined;
    const toolFilter = params.toolFilter as string[] | undefined;

    const config: MCPServerConfigStdio = {
      type: "stdio",
      label: serverLabel,
      command: command,
      args: args || [],
      toolFilter: toolFilter || [],
    };

    return {
      data: {
        mcpServer: config,
      } as MCPServerConfigWrapper,
    };
  },
});

export const addRemoteMcpServer = action({
  display: {
    label: "Agent: Add Remote MCP Server",
    description: "Configure a remote MCP server accessed via HTTP",
  },

  inputs: {
    serverLabel: input({
      label: "Server Label",
      type: "text",
      required: true,
      comments: "Unique identifier for the MCP server",
      example: "company-data-server",
    }),

    serverUrl: input({
      label: "Server URL",
      type: "text",
      required: true,
      comments: "URL endpoint for the MCP server",
      example: "https://api.company.com/mcp",
    }),

    headers: input({
      label: "Headers",
      type: "string",
      collection: "keyvaluelist",
      required: false,
      comments:
        "HTTP headers for authentication or other needs. Key = header name, Value = header value",
      example: "Authorization -> Bearer YOUR_TOKEN",
    }),

    toolFilter: input({
      label: "Tool Filter",
      type: "string",
      collection: "valuelist",
      required: false,
      comments:
        "List of specific tool names to expose. If empty, all tools are exposed.",
      example: "query_database",
    }),
  },

  perform: async (_, params) => {
    const serverLabel = util.types.toString(params.serverLabel);
    const serverUrl = util.types.toString(params.serverUrl);
    const headers = params.headers as
      | { key: string; value: string }[]
      | undefined;
    const toolFilter = params.toolFilter as string[] | undefined;

    const headersObject: Record<string, string> = {};
    if (headers) {
      for (const { key, value } of headers) {
        headersObject[key] = value;
      }
    }

    const config: MCPServerConfigHttp = {
      type: "http",
      label: serverLabel,
      url: serverUrl,
      headers: headersObject,
      toolFilter: toolFilter || [],
    };

    return {
      data: {
        mcpServer: config,
      } as MCPServerConfigWrapper,
    };
  },
});
