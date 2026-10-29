import type { AgentOptions } from "@openai/agents";
import type { MCPServerConfigWrapper } from "./mcp";
import type { ToolOutput } from "./tools";

export type AgentConfigData = {
  agent: Partial<AgentOptions>;
  tools?: ToolOutput[];
  mcpServers?: MCPServerConfigWrapper[];
};

export interface PendingApproval {
  toolName: string;
  arguments: unknown;
  agentName: string;
  approvalRequest: {
    functionId: string;
    approved: boolean;
    feedback: string | null;
  };
}
