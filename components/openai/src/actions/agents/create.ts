import { action, util } from "@prismatic-io/spectral";
import type { JsonSchemaDefinition } from "@openai/agents";
import {
  modelInput,
  agentNameInput,
  agentInstructionsInput,
  agentHandoffDescriptionInput,
  agentToolsInput,
  agentMcpServersInput,
  outputSchemaInput,
  outputSchemaNameInput,
  outputSchemaStrictInput,
} from "../../inputs";
import type {
  AgentConfigData,
  MCPServerConfigWrapper,
  ToolOutput,
} from "../../types";

export const createAgent = action({
  display: {
    label: "Agent: Create",
    description: "Create an AI agent with customizable instructions.",
  },

  inputs: {
    modelName: modelInput,
    name: agentNameInput,
    instructions: agentInstructionsInput,
    handoffDescription: agentHandoffDescriptionInput,
    tools: agentToolsInput,
    mcpServers: agentMcpServersInput,
    outputSchema: outputSchemaInput,
    outputSchemaName: outputSchemaNameInput,
    outputSchemaStrict: outputSchemaStrictInput,
  },

  perform: async (_, params) => {
    interface AgentConfig {
      name: string;
      instructions: string;
      model: string;
      handoffDescription?: string;
      // biome-ignore lint/suspicious/noExplicitAny: Fixme - JsonSchemDefintion is a valid option but the types don't support it
      outputType?: any;
    }
    const agentConfig: AgentConfig = {
      name: util.types.toString(params.name),
      instructions: util.types.toString(params.instructions),
      model: util.types.toString(params.modelName),
      handoffDescription: util.types.toString(params.handoffDescription),
    };

    if (params.outputSchema) {
      try {
        const schemaString = util.types.toString(params.outputSchema);
        const schema = JSON.parse(schemaString);

        const schemaDefinition: JsonSchemaDefinition = {
          type: "json_schema",
          name: util.types.toString(params.outputSchemaName) || "Output",
          strict: util.types.toBool(params.outputSchemaStrict, true),
          schema: schema,
        };

        agentConfig.outputType = schemaDefinition;
      } catch (e) {
        throw new Error(`Invalid JSON schema for outputSchema: ${e}`);
      }
    }

    const configData: AgentConfigData = {
      agent: agentConfig,
      tools: params.tools as ToolOutput[] | undefined,
      mcpServers: params.mcpServers as MCPServerConfigWrapper[] | undefined,
    };

    return { data: configData };
  },
});
