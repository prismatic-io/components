import { action, input, util } from "@prismatic-io/spectral";
import {
  Agent,
  run,
  setDefaultOpenAIKey,
  user,
  type JsonSchemaDefinition,
  type UserMessageItem,
  type AgentInputItem,
} from "@openai/agents";
import {
  openaiConnectionInput,
  modelInput,
  agentToolsInput,
  agentMcpServersInput,
  fileIdsInput,
} from "../inputs";
import { EXAMPLES } from "../constants";
import { setupAgentWithHandoffs, cleanupMcpServers } from "./utils";
import type { AgentConfigData } from "../types";

export const classifyAndBranch = action({
  display: {
    label: "Agent: Classify and Branch",
    description: "Use AI to analyze input and route to the appropriate branch",
  },

  allowsBranching: true,
  staticBranchNames: ["Else"],
  dynamicBranchInput: "branches",

  inputs: {
    openaiConnection: openaiConnectionInput,

    model: modelInput,

    classificationInstructions: input({
      label: "Classification Instructions",
      type: "text",
      required: false,
      comments: "Additional instructions for how to classify the input",
      example: EXAMPLES.classificationInstructions,
      default: "",
    }),

    branches: input({
      label: "Branch Definitions",
      type: "string",
      collection: "keyvaluelist",
      required: true,
      comments:
        "Define branches and their classification criteria. Key = branch name, Value = description of when to use this branch",
      example: EXAMPLES.branchDefinitions,
    }),

    inputText: input({
      label: "Input Text",
      type: "text",
      required: true,
      comments: "The text to analyze and classify (e.g., email content)",
      example: "Can you make the urgent meeting tomorrow morning at 10am?",
    }),

    agentTools: agentToolsInput,

    agentMcpServers: agentMcpServersInput,

    fileIds: fileIdsInput,
  },

  perform: async (context, params) => {
    setDefaultOpenAIKey(
      util.types.toString(params.openaiConnection.fields.apiKey),
    );

    const branches = params.branches as { key: string; value: string }[];
    const branchDescriptions = branches
      .map((b) => `- "${b.key}": ${b.value}`)
      .join("\n");

    const systemPrompt = `You are an expert classifier. Analyze the provided input and determine which category best applies.

Available categories:
${branchDescriptions}

Return ONLY the exact category name (key) that best matches. If none match well, return "Else".
${
  params.classificationInstructions
    ? `\nAdditional instructions: ${params.classificationInstructions}`
    : ""
}`;

    const configData = {
      agent: {
        name: "Classifier",
        instructions: systemPrompt,
        model: util.types.toString(params.model),
        outputType: {
          type: "json_schema",
          name: "Classification",
          strict: false,
          schema: {
            type: "object",
            properties: {
              branch: {
                type: "string",
                description: "The selected branch name",
              },
              confidence: {
                type: "string",
                enum: ["high", "medium", "low"],
                description: "Confidence in the classification",
              },
              reasoning: {
                type: "string",
                description: "Brief explanation of why this branch was chosen",
              },
            },
            required: ["branch", "confidence", "reasoning"],
            additionalProperties: true,
          },
        } as JsonSchemaDefinition,
      },
      tools: params.agentTools || [],
      mcpServers: params.agentMcpServers || [],
    };

    const { agent: classifier, allMcpServers } = await setupAgentWithHandoffs({
      configData: configData as unknown as AgentConfigData,
      handoffConfigs: undefined,
      context,
    });

    try {
      let agentInput: AgentInputItem[];

      if (params.fileIds && params.fileIds.length > 0) {
        // biome-ignore lint/suspicious/noExplicitAny: Dynamic content array
        const contentArray: any[] = [
          {
            type: "input_text",
            text: util.types.toString(params.inputText),
          },
        ];

        for (const fileId of params.fileIds) {
          contentArray.push({
            type: "input_file",
            file: { id: util.types.toString(fileId) },
          });
        }

        const userMessage = {
          role: "user",
          content: contentArray,
        } as UserMessageItem;

        agentInput = [userMessage];
      } else {
        agentInput = [user(util.types.toString(params.inputText))];
      }

      const result = await run(classifier, agentInput);
      const classification = result.finalOutput as {
        branch?: string;
        confidence?: string;
        reasoning?: string;
      };

      await cleanupMcpServers(allMcpServers);

      return {
        branch: classification?.branch || "Else",
        data: {
          selectedBranch: classification?.branch || "Else",
          confidence: classification?.confidence,
          reasoning: classification?.reasoning,
          originalInput: params.inputText,
        },
      };
    } catch (error) {
      await cleanupMcpServers(allMcpServers);
      throw error;
    }
  },
});
