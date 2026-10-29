import type { ActionContext } from "@prismatic-io/spectral";
import {
  Agent,
  type AgentOptions,
  MCPServerStdio,
  MCPServerStreamableHttp,
  type MCPServer,
  type RunToolApprovalItem,
} from "@openai/agents";
import { promptWithHandoffInstructions } from "@openai/agents-core/extensions";
import type { AgentConfigData, PendingApproval } from "../../types";
import { buildAllTools } from "./toolBuilders";

export const DEFAULT_TEMPERATURE = 0.3;
export const DEFAULT_MAX_TOKENS = 4096;
export const DEFAULT_MAX_TURNS = 5;

export const AVAILABLE_MODELS = [
  "gpt-5-2025-08-07",
  "gpt-5-mini-2025-08-07",
  "gpt-5-nano-2025-08-07",
  "gpt-4.1-2025-04-14",
] as const;

export type AvailableModel = (typeof AVAILABLE_MODELS)[number];

export function formatError(error: Error): string {
  if (error?.message) {
    return error.message;
  }
  if (typeof error === "string") {
    return error;
  }
  return "An unexpected error occurred";
}

export function applyHandoffInstructions(
  agentOptions: Partial<AgentOptions>,
  handoffs?: Agent[],
): void {
  if (handoffs && handoffs.length > 0) {
    agentOptions.handoffs = handoffs;

    if (agentOptions.instructions) {
      agentOptions.instructions = promptWithHandoffInstructions(
        agentOptions.instructions as string,
      );
    }
  }
}

export async function createAgentFromConfig({
  configData,
  handoffs,
  context,
}: {
  configData: AgentConfigData;
  handoffs?: Agent[];
  context: ActionContext;
}): Promise<Agent> {
  const {
    agent: config,
    tools: toolConfigs,
    mcpServers: mcpServerConfigs,
  } = configData;

  const tools = buildAllTools(toolConfigs || [], context);

  const mcpServers: MCPServer[] = [];
  if (mcpServerConfigs && mcpServerConfigs.length > 0) {
    for (const wrapper of mcpServerConfigs) {
      const serverConfig = wrapper.mcpServer;

      try {
        let server: MCPServer | undefined;

        if (serverConfig.type === "stdio") {
          server = new MCPServerStdio({
            name: serverConfig.label,
            command: serverConfig.command,
            args: serverConfig.args || [],
            cacheToolsList: true,
          });
        } else if (serverConfig.type === "http") {
          server = new MCPServerStreamableHttp({
            name: serverConfig.label,
            url: serverConfig.url,
            requestInit: {
              headers: serverConfig.headers || {},
            },
            cacheToolsList: false,
          });
        }

        if (server) {
          await server.connect();
          mcpServers.push(server);
        }
      } catch (e) {
        const error = e as Error;
        console.error(
          `Failed to connect to MCP server ${serverConfig.label}: ${error.message}`,
        );
      }
    }
  }

  const agentOptions: Partial<AgentOptions> = {
    ...config,
    tools,
    mcpServers,
  };

  applyHandoffInstructions(agentOptions, handoffs);

  try {
    return new Agent({
      ...agentOptions,
      toolUseBehavior: "run_llm_again",
    } as AgentOptions);
  } catch (error) {
    console.error("Failed to create agent:", error);
    if (error instanceof Error && error.message.includes("outputType")) {
      throw new Error(`Invalid output schema configuration: ${error.message}`);
    }
    throw error;
  }
}

export async function createHandoffAgents(
  handoffConfigs: AgentConfigData[],
  context: ActionContext,
): Promise<Agent[]> {
  return Promise.all(
    handoffConfigs.map(async (cfg) => {
      const enhancedConfig = { ...cfg };
      if (enhancedConfig.agent?.instructions) {
        enhancedConfig.agent = {
          ...enhancedConfig.agent,
          instructions: promptWithHandoffInstructions(
            enhancedConfig.agent.instructions as string,
          ),
        };
      }

      return createAgentFromConfig({
        configData: enhancedConfig,
        handoffs: [],
        context,
      });
    }),
  );
}

export async function setupAgentWithHandoffs({
  configData,
  handoffConfigs,
  context,
}: {
  configData: AgentConfigData;
  handoffConfigs?: AgentConfigData[];
  context: ActionContext;
}): Promise<{
  agent: Agent;
  handoffs?: Agent[];
  allMcpServers: MCPServer[];
}> {
  const handoffs = handoffConfigs
    ? await createHandoffAgents(handoffConfigs, context)
    : undefined;

  const agent = await createAgentFromConfig({
    configData,
    handoffs,
    context,
  });

  const allMcpServers: MCPServer[] = [];

  if (agent.mcpServers) {
    allMcpServers.push(...agent.mcpServers);
  }

  if (handoffs) {
    for (const handoffAgent of handoffs) {
      if (handoffAgent.mcpServers) {
        allMcpServers.push(...handoffAgent.mcpServers);
      }
    }
  }

  return { agent, handoffs, allMcpServers };
}

export async function cleanupMcpServers(servers: MCPServer[]): Promise<void> {
  for (const server of servers) {
    try {
      await server.close();
    } catch (error) {
      console.error(`Failed to close MCP server: ${error}`);
    }
  }
}

export function buildPendingApprovals(
  interruptions: RunToolApprovalItem[],
): PendingApproval[] {
  const pendingApprovals: PendingApproval[] = [];

  for (const interruption of interruptions) {
    const pendingApproval: PendingApproval = {
      toolName: interruption.rawItem?.name,
      arguments: interruption.rawItem?.arguments,
      agentName: interruption.agent?.name,
      approvalRequest: {
        functionId: interruption.rawItem?.providerData?.id,
        approved: false,
        feedback: null,
      },
    };
    pendingApprovals.push(pendingApproval);
  }

  return pendingApprovals;
}
