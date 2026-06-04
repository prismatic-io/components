import { action, input, util } from "@prismatic-io/spectral";
import {
  RunState,
  type RunToolApprovalItem,
  run,
  setDefaultOpenAIKey,
} from "@openai/agents";
import { openaiConnectionInput } from "../../inputs";
import type { AgentConfigData } from "../../types";
import {
  setupAgentWithHandoffs,
  cleanupMcpServers,
  buildPendingApprovals,
} from "../utils";

export const resumeRun = action({
  display: {
    label: "Agent: Resume Run",
    description: "Resume an interrupted agent run with approval decisions",
  },

  inputs: {
    openaiConnection: openaiConnectionInput,

    agentConfig: input({
      label: "Agent Configuration",
      type: "code",
      language: "json",
      required: true,
      comments:
        "Agent configuration object from Create Agent action. Should be the same configuration used in the original run.",
      example: JSON.stringify(
        {
          agent: {
            name: "Assistant",
            instructions: "You are a helpful assistant",
            model: "gpt-4",
          },
        },
        null,
        2,
      ),
    }),

    state: input({
      label: "Run State",
      type: "code",
      language: "json",
      required: true,
      comments:
        "State from the interrupted run, containing the execution context and interruptions.",
      example: '{"agentId":"agent-123","messages":[...],"interruptions":[...]}',
    }),

    approvalResponses: input({
      label: "Approval Responses",
      type: "code",
      language: "json",
      required: true,
      comments:
        "Array of approval responses with updated approvalRequest objects containing functionId and approved status.",
      example: JSON.stringify(
        [
          {
            functionId: "fc_12345",
            approved: true,
            feedback: null,
          },
        ],
        null,
        2,
      ),
    }),

    maxTurns: input({
      label: "Max Turns",
      type: "string",
      required: false,
      default: "10",
      clean: util.types.toNumber,
      comments:
        "Maximum number of conversation turns the agent can take from this point. Prevents infinite loops.",
      example: "20",
    }),

    handoffs: input({
      label: "Handoff Agents",
      type: "code",
      language: "json",
      collection: "valuelist",
      required: false,
      comments:
        "Same handoff agents configuration used in the original run, if any.",
      example: "[]",
    }),
  },

  perform: async (context, params) => {
    setDefaultOpenAIKey(
      util.types.toString(params.openaiConnection.fields.apiKey),
    );

    const configData = params.agentConfig as AgentConfigData;

    const { agent, allMcpServers } = await setupAgentWithHandoffs({
      configData,
      handoffConfigs: params.handoffs as AgentConfigData[] | undefined,
      context,
    });

    try {
      const stateString = util.types.toString(params.state);
      const runState = await RunState.fromString(agent, stateString);

      const approvalResponses = params.approvalResponses as {
        functionId: string;
        approved: boolean;
        feedback: string | null;
      }[];

      const updatedState = runState;
      for (const approvalResponse of approvalResponses) {
        if (!approvalResponse) continue;

        const { functionId, approved } = approvalResponse;

        const interruption = updatedState
          .getInterruptions()
          ?.find(
            (int: RunToolApprovalItem) =>
              int.rawItem?.providerData?.id === functionId,
          );

        if (interruption) {
          if (approved) {
            updatedState.approve(interruption);
          } else {
            updatedState.reject(interruption);
          }
        }
      }

      const maxTurns = util.types.toNumber(params.maxTurns) || 10;
      const result = await run(agent, updatedState, {
        maxTurns: maxTurns,
      });

      const interrupted = result.interruptions.length > 0;
      const pendingApprovals = interrupted
        ? buildPendingApprovals(result.interruptions)
        : [];

      return {
        data: {
          finalOutput: interrupted ? null : result?.finalOutput,
          pendingApprovals: pendingApprovals,
          hasInterruptions: interrupted,
          history: interrupted ? null : result.history,
          state: interrupted ? result.state.toString() : result.state.toJSON(),
        },
      };
    } finally {
      await cleanupMcpServers(allMcpServers);
    }
  },
});
