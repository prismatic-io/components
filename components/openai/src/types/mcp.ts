export interface MCPServerConfigBase {
  type: "stdio" | "http";
  label: string;
  toolFilter?: string[];
}

export interface MCPServerConfigStdio extends MCPServerConfigBase {
  type: "stdio";
  command: string;
  args?: string[];
}

export interface MCPServerConfigHttp extends MCPServerConfigBase {
  type: "http";
  url: string;
  headers?: Record<string, string>;
}

export type MCPServerConfig = MCPServerConfigStdio | MCPServerConfigHttp;

export interface MCPServerConfigWrapper {
  mcpServer: MCPServerConfig;
}
