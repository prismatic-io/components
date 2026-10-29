import { pollingTrigger, util } from "@prismatic-io/spectral";
import { receiveMessagesPolling } from "../actions/receiveMessages";
import { DEFAULT_BATCH_SIZE } from "../constants";
import type { ReceiveMessageResult } from "@aws-sdk/client-sqs";
import { lookBackDate } from "../inputs";
import type { PollMessagesPollingState } from "../interfaces/PollMessagesPollingState";
import type { PollMessageChange, PollMessagesChanges } from "../types";
import { resolvePollMessagesChanges } from "../utils";

export const pollMessagesTrigger = pollingTrigger({
  display: {
    label: "New Messages",
    description:
      "Retrieves existing and ongoing messages for a specified Amazon SQS queue. Load history once, check for new messages on a schedule, or both.",
  },
  pollAction: receiveMessagesPolling,
  inputs: { lookBackDate },
  triggerResolverSupport: "valid",
  batchConfig: { batchSize: DEFAULT_BATCH_SIZE },
  triggerResolver: {
    resolveItems: (_context, { payload }): PollMessageChange[] =>
      resolvePollMessagesChanges(payload.body.data as PollMessagesChanges),
  },
  perform: async (context, payload, { lookBackDate, ...params }) => {
    const pollingExecutionTime = Date.now();
    const pollState: PollMessagesPollingState =
      context.polling.getState() as PollMessagesPollingState;

    const initialSyncFrom = lookBackDate
      ? Date.parse(lookBackDate) - 1
      : pollingExecutionTime;
    const lastPolledAt: number = pollState.lastPolledAt || initialSyncFrom;
    let allMessages: ReceiveMessageResult["Messages"] = [];
    let hasMoreMessages = true;

    while (hasMoreMessages) {
      const { data } = await context.polling.invokeAction({
        ...params,
      });

      const messages: ReceiveMessageResult["Messages"] =
        (data as { Messages: ReceiveMessageResult["Messages"] }).Messages || [];

      if (messages.length === 0) {
        hasMoreMessages = false;
      } else {
        allMessages = [...allMessages, ...messages];
      }
    }

    const newMessages = allMessages.filter(
      (message) =>
        util.types.toNumber(message.Attributes?.SentTimestamp) > lastPolledAt,
    );

    context.polling.setState({ lastPolledAt: pollingExecutionTime });

    return {
      payload: { ...payload, body: { data: newMessages } },
      polledNoChanges: newMessages.length === 0,
    };
  },
});
