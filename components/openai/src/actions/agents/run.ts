import { action, util } from "@prismatic-io/spectral";
import {
  type AgentInputItem,
  run,
  setDefaultOpenAIKey,
  user,
} from "@openai/agents";
import type { UserMessageItem } from "@openai/agents";
import {
  openaiConnectionInput,
  agentConfigInput,
  userInputInput,
  historyInput,
  previousResponseIdInput,
  maxTurnsInput,
  handoffsInput,
  fileIdsInput,
} from "../../inputs";
import type { AgentConfigData } from "../../types";
import {
  setupAgentWithHandoffs,
  cleanupMcpServers,
  buildPendingApprovals,
} from "../utils";

export const runAgent = action({
  display: {
    label: "Agent: Run",
    description: "Run an agent",
  },

  inputs: {
    openaiConnection: openaiConnectionInput,
    agentConfig: agentConfigInput,
    userInput: userInputInput,
    history: historyInput,
    fileIds: fileIdsInput,
    previousResponseId: previousResponseIdInput,
    maxTurns: maxTurnsInput,
    handoffs: handoffsInput,
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
      let agentInput: AgentInputItem[] = [];
      if (params.history) {
        agentInput = [...(params.history as AgentInputItem[])];
      }
      if (params.fileIds && params.fileIds.length > 0) {
        // biome-ignore lint/suspicious/noExplicitAny: Dynamic inputs for openai response api
        const contentArray: any[] = [
          {
            type: "input_text",
            text: util.types.toString(params.userInput),
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

        agentInput.push(userMessage);
      } else {
        agentInput.push(user(util.types.toString(params.userInput)));
      }

      const maxTurns = util.types.toNumber(params.maxTurns) || 10;

      const result = await run(agent, agentInput, {
        maxTurns: maxTurns,
        previousResponseId: params.previousResponseId
          ? util.types.toString(params.previousResponseId)
          : undefined,
      });

      const interrupted = result.interruptions.length > 0;
      const pendingApprovals = interrupted
        ? buildPendingApprovals(result.interruptions)
        : [];
      await cleanupMcpServers(allMcpServers);
      return {
        data: {
          finalOutput: interrupted ? null : result?.finalOutput,
          pendingApprovals: pendingApprovals,
          hasInterruptions: interrupted,
          history: interrupted ? null : result.history,
          state: interrupted ? result.state.toString() : result.state.toJSON(),
        },
      };
    } catch (e) {
      await cleanupMcpServers(allMcpServers);

      console.error("Error in runAgent:", e);

      if (e instanceof Error) {
        console.error("Error message:", e.message);
        if (e.stack) {
          console.error("Stack trace:", e.stack);
        }

        if (
          e.message?.includes("Invalid schema") ||
          e.message?.includes("response_format") ||
          e.message?.includes("structured output")
        ) {
          throw new Error(`Structured output validation failed: ${e.message}`);
        }

        throw e;
      }

      console.error("Non-Error thrown:", JSON.stringify(e));
      throw new Error(`Agent execution failed: ${JSON.stringify(e)}`);
    }
  },
});
