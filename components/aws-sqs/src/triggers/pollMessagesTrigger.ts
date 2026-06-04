import { pollingTrigger, util } from "@prismatic-io/spectral";
import { receiveMessagesPolling } from "../actions/receiveMessages";
import type { ReceiveMessageResult } from "@aws-sdk/client-sqs";
import type { PollMessagesPollingState } from "../interfaces/PollMessagesPollingState";











export const pollMessagesTrigger = pollingTrigger({
  display: {
    label: "New Messages",
    description:
      "Checks for new messages in the queue on a configured schedule.",
  },
  pollAction: receiveMessagesPolling,
  perform: async (context, payload, params) => {
    const pollingExecutionTime = Date.now();
    const pollState: PollMessagesPollingState =
      context.polling.getState() as PollMessagesPollingState;

    const lastPolledAt: number = pollState.lastPolledAt || pollingExecutionTime;
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
