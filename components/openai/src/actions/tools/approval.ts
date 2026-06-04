import { action, input, util } from "@prismatic-io/spectral";
import type { ApprovalToolOutput } from "../../types/tools";

export const createHumanApprovalTool = action({
  display: {
    label: "Agent: Create Human Approval Tool",
    description:
      "Create a tool that requires human approval before the agent can proceed",
  },

  inputs: {
    name: input({
      label: "Tool Name",
      type: "text",
      required: false,
      default: "Human Approval",
      comments: "Name for the approval tool",
    }),

    description: input({
      label: "Tool Description",
      type: "text",
      required: false,
      default: "Request human approval before proceeding with this action",
      comments:
        "Description that helps the agent understand when to use this tool",
    }),

    parameters: input({
      label: "Parameters Schema",
      type: "code",
      language: "json",
      required: false,
      comments:
        "Optional JSON schema for parameters the agent should provide when calling this tool. If not provided, the tool will accept a 'reason' string parameter.",
      example: JSON.stringify(
        {
          type: "object",
          properties: {
            action: {
              type: "string",
              description: "The action requiring approval",
            },
            details: {
              type: "string",
              description: "Additional details about the action",
            },
          },
          required: ["action"],
        },
        null,
        2,
      ),
    }),
  },

  perform: async (_, params) => {
    const toolName = util.types.toString(params.name) || "Human Approval";
    const toolDescription =
      util.types.toString(params.description) ||
      "Request human approval before proceeding with this action";

    // biome-ignore lint/suspicious/noExplicitAny: Dynamic schema types from OpenAI require flexibility
    let parametersSchema: any;
    if (params.parameters) {
      try {
        parametersSchema = JSON.parse(util.types.toString(params.parameters));
      } catch (e) {
        throw new Error(`Invalid JSON schema for parameters: ${e}`);
      }
    } else {
      parametersSchema = {
        type: "object",
        properties: {
          reason: {
            type: "string",
            description: "Reason for requesting approval",
          },
        },
        required: ["reason"],
      };
    }

    const toolConfig = {
      type: "function" as const,
      function: {
        name: toolName.toLowerCase().replace(/\s+/g, "_"),
        description: toolDescription,
        strict: false,
        parameters: parametersSchema,

        needsApproval: true,
      },
    };

    const output: ApprovalToolOutput = {
      type: "approval",
      tool: toolConfig,
      toolName: toolName,
    };

    return {
      data: output,
    };
  },
});
