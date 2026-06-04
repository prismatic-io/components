import { action, input, util } from "@prismatic-io/spectral";
import { toSnakeCase } from "../utils";
import type { CustomToolConfig, FlowToolOutput } from "../../types/tools";

export const createFlowTool = action({
  display: {
    label: "Agent: Create Flow Tool",
    description:
      "Create a tool configuration that allows an agent to invoke another flow",
  },

  inputs: {
    flowName: input({
      type: "flow",
      label: "Flow Name",
      required: true,
      comments: "The flow that this tool will invoke when called by an agent",
    }),

    toolDescription: input({
      label: "Tool Description",
      type: "text",
      required: true,
      comments:
        "Description that helps the agent understand when to use this tool",
      example:
        "Send a welcome email to a new customer with their account details",
    }),

    strictMode: input({
      label: "Strict Mode",
      type: "boolean",
      required: false,
      default: "false",
      comments:
        "If true, requires exact parameter matching. If false, allows flexibility in agent inputs.",
    }),

    requiresApproval: input({
      label: "Requires Approval",
      type: "boolean",
      required: false,
      default: "false",
      comments:
        "If true, the tool will require human approval before the agent can execute the flow",
    }),
  },

  perform: async (context, params) => {
    const flowName = util.types.toString(params.flowName);
    const toolName = toSnakeCase(flowName);
    const description = util.types.toString(params.toolDescription);
    const strict = util.types.toBool(params.strictMode, false);
    const requiresApproval = util.types.toBool(params.requiresApproval, false);

    const flowSchema = context.flowSchemas?.[flowName]?.invoke;
    if (!flowSchema) {
      throw new Error(
        `Flow schema not found for '${flowName}'. Ensure the flow exists and has a properly configured trigger.`,
      );
    }

    const parameters = {
      ...flowSchema,
      additionalProperties: !strict,
    };

    const toolConfig = {
      type: "function",
      function: {
        name: toolName,
        description: description,
        strict: strict,
        parameters: parameters,

        needsApproval: requiresApproval,

        __prismaticFlow: {
          flowName: flowName,
          instanceId: context.instance.id,
        },
      },
    } as CustomToolConfig;

    const output: FlowToolOutput = {
      type: "flow",
      tool: toolConfig,
      toolName: toolName,
      flowName: flowName,
    };

    return {
      data: output,
    };
  },
});
