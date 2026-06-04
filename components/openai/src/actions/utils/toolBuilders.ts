import type { ActionContext } from "@prismatic-io/spectral";
import {
  type Tool,
  webSearchTool,
  codeInterpreterTool,
  tool,
  fileSearchTool,
  imageGenerationTool,
} from "@openai/agents";
import type {
  JsonObjectSchemaNonStrict,
  JsonObjectSchemaStrict,
} from "@openai/agents-core/types";
import type {
  FlowToolOutput,
  ApprovalToolOutput,
  HostedToolOutput,
  ToolOutput,
} from "../../types/tools";

function isFlowTool(tool: ToolOutput): tool is FlowToolOutput {
  return "type" in tool && tool.type === "flow";
}

function isApprovalTool(tool: ToolOutput): tool is ApprovalToolOutput {
  return "type" in tool && tool.type === "approval";
}

function isHostedTool(tool: ToolOutput): tool is HostedToolOutput {
  return "toolType" in tool && tool.tool.type === "hosted";
}

export function toSnakeCase(str: string): string {
  return str
    .replace(/\s+/g, "_")
    .replace(/-+/g, "_")
    .replace(/([A-Z])/g, "_$1")
    .toLowerCase()
    .replace(/^_+/, "")
    .replace(/_+/g, "_");
}

export function buildHostedTools(hostedTools: HostedToolOutput[]): Tool[] {
  const tools: Tool[] = [];

  for (const toolData of hostedTools) {
    switch (toolData.toolType) {
      case "webSearch": {
        const config = toolData.tool.configuration || {};
        // biome-ignore lint/suspicious/noExplicitAny: Dynamic configuration from OpenAI SDK
        const webSearchOptions: any = {};

        if (config.name) {
          webSearchOptions.name = config.name;
        }
        if (config.searchContextSize) {
          webSearchOptions.searchContextSize = config.searchContextSize;
        }
        if (config.userLocation) {
          webSearchOptions.userLocation = config.userLocation;
        }

        tools.push(
          Object.keys(webSearchOptions).length > 0
            ? webSearchTool(webSearchOptions)
            : webSearchTool(),
        );
        break;
      }
      case "codeInterpreter": {
        const config = toolData.tool.configuration || {};
        // biome-ignore lint/suspicious/noExplicitAny: Dynamic configuration from OpenAI SDK
        const codeInterpreterOptions: any = {};

        if (config.name) {
          codeInterpreterOptions.name = config.name;
        }
        if (config.container) {
          codeInterpreterOptions.container = config.container;
        }

        tools.push(
          Object.keys(codeInterpreterOptions).length > 0
            ? codeInterpreterTool(codeInterpreterOptions)
            : codeInterpreterTool(),
        );
        break;
      }
      case "fileSearch": {
        const config = toolData.tool.configuration || {};

        const vectorStoreIds = Array.isArray(config.vectorStoreIds)
          ? config.vectorStoreIds
          : [];

        // biome-ignore lint/suspicious/noExplicitAny: Dynamic configuration from OpenAI SDK
        const fileSearchOptions: any = {};

        if (config.name) {
          fileSearchOptions.name = config.name;
        }
        if (config.maxNumResults) {
          fileSearchOptions.maxNumResults = config.maxNumResults;
        }
        if (config.includeSearchResults !== undefined) {
          fileSearchOptions.includeSearchResults = config.includeSearchResults;
        }
        if (config.rankingOptions) {
          fileSearchOptions.rankingOptions = config.rankingOptions;
        }

        tools.push(
          fileSearchTool(
            vectorStoreIds,
            Object.keys(fileSearchOptions).length > 0
              ? fileSearchOptions
              : undefined,
          ),
        );
        break;
      }
      case "imageGeneration": {
        const config = toolData.tool.configuration || {};
        // biome-ignore lint/suspicious/noExplicitAny: Dynamic configuration from OpenAI SDK
        const imageOptions: any = {};

        if (config.name) imageOptions.name = config.name;
        if (config.background) imageOptions.background = config.background;
        if (config.inputFidelity)
          imageOptions.inputFidelity = config.inputFidelity;
        if (config.model) imageOptions.model = config.model;
        if (config.moderation) imageOptions.moderation = config.moderation;
        if (config.outputCompression !== undefined) {
          imageOptions.outputCompression = config.outputCompression;
        }
        if (config.outputFormat)
          imageOptions.outputFormat = config.outputFormat;
        if (config.partialImages !== undefined) {
          imageOptions.partialImages = config.partialImages;
        }
        if (config.quality) imageOptions.quality = config.quality;
        if (config.size) imageOptions.size = config.size;

        tools.push(
          Object.keys(imageOptions).length > 0
            ? imageGenerationTool(imageOptions)
            : imageGenerationTool(),
        );
        break;
      }
      default:
        throw new Error(
          `Unknown hosted tool type: ${toolData.toolType}. Available tools: webSearch, codeInterpreter, fileSearch, imageGeneration`,
        );
    }
  }

  return tools;
}

export function buildApprovalTools(
  approvalTools: ApprovalToolOutput[],
): Tool[] {
  const tools: Tool[] = [];

  if (!approvalTools || !Array.isArray(approvalTools)) {
    return tools;
  }

  for (const toolData of approvalTools) {
    const toolConfig = toolData.tool;
    if (!toolConfig?.function) continue;

    if (toolConfig.function.strict) {
      const schema = toolConfig.function.parameters as JsonObjectSchemaStrict<
        // biome-ignore lint/suspicious/noExplicitAny: Dynamic configuration from OpenAI SDK
        Record<string, any>
      >;
      tools.push(
        tool({
          description: toolConfig.function.description,
          strict: true,
          parameters: schema,
          needsApproval: true,
          execute: async () => {
            return "Human approved this action. Please continue";
          },
        }),
      );
    } else {
      tools.push(
        tool({
          description: toolConfig.function.description,
          strict: false,
          parameters: toolConfig.function
            .parameters as JsonObjectSchemaNonStrict<
            // biome-ignore lint/suspicious/noExplicitAny: Dynamic configuration from OpenAI SDK
            Record<string, any>
          >,
          needsApproval: true,
          execute: async () => {
            return "Human approved this action. Please continue";
          },
        }),
      );
    }
  }

  return tools;
}

export function buildFlowTools(
  flowTools: FlowToolOutput[],
  context: ActionContext,
): Tool[] {
  const tools: Tool[] = [];

  if (!flowTools || !Array.isArray(flowTools)) {
    return tools;
  }

  for (const toolData of flowTools) {
    const toolConfig = toolData.tool;
    if (!toolConfig?.function) continue;

    const flowName = toolConfig.function.__prismaticFlow?.flowName;
    if (!flowName) continue;

    const executeFunction = async (args: unknown) => {
      try {
        const response = await context.invokeFlow(
          flowName,
          args as Record<string, unknown>,
          {
            headers: {},
            responseType: "json",
          },
        );
        return response.data || `Flow ${flowName} executed successfully`;
      } catch (error) {
        return `Error invoking flow ${flowName}: ${error}`;
      }
    };

    if (toolConfig.function.strict) {
      const schema = toolConfig.function.parameters as JsonObjectSchemaStrict<
        // biome-ignore lint/suspicious/noExplicitAny: Dynamic schema types from OpenAI require flexibility
        Record<string, any>
      >;
      tools.push(
        tool({
          description: toolConfig.function.description,
          name: toolConfig.function.name,
          strict: true,
          parameters: schema,
          needsApproval: toolConfig.function.needsApproval || false,
          execute: executeFunction,
        }),
      );
    } else {
      tools.push(
        tool({
          description: toolConfig.function.description,
          name: toolConfig.function.name,
          strict: false,
          needsApproval: toolConfig.function.needsApproval || false,
          parameters: toolConfig.function
            .parameters as JsonObjectSchemaNonStrict<
            // biome-ignore lint/suspicious/noExplicitAny: Dynamic schema types from OpenAI require flexibility
            Record<string, any>
          >,
          execute: executeFunction,
        }),
      );
    }
  }

  return tools;
}

export function buildAllTools(
  tools: ToolOutput[],
  context: ActionContext,
): Tool[] {
  const allTools: Tool[] = [];

  if (!tools || !Array.isArray(tools)) {
    return allTools;
  }

  const hostedTools: HostedToolOutput[] = [];
  const flowTools: FlowToolOutput[] = [];
  const approvalTools: ApprovalToolOutput[] = [];

  for (const toolData of tools) {
    if (isFlowTool(toolData)) {
      flowTools.push(toolData);
    } else if (isApprovalTool(toolData)) {
      approvalTools.push(toolData);
    } else if (isHostedTool(toolData)) {
      hostedTools.push(toolData);
    }
  }

  allTools.push(...buildHostedTools(hostedTools));
  allTools.push(...buildApprovalTools(approvalTools));
  allTools.push(...buildFlowTools(flowTools, context));

  return allTools;
}

export { buildHostedTools as buildStandardTools };
export { buildFlowTools as buildCustomTools };
