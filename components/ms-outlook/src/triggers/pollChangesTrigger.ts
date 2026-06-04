import { pollingTrigger } from "@prismatic-io/spectral";
import type { Message } from "@microsoft/microsoft-graph-types";
import { createClient } from "../client";
import { pollChangesTriggerExamplePayload } from "../examplePayloads";
import { pollChangesInputs } from "../inputs";
import type { PollingState } from "../types";
import { fetchUpdatedMessagesSince, partitionMessagesByTimestamp } from "../util";

export const pollChangesTrigger = pollingTrigger({
  display: {
    label: "New and Updated Messages",
    description:
      "Checks for new and updated mail messages in Microsoft Outlook on a configured schedule.",
  },
  inputs: pollChangesInputs,
  allowsBranching: false,
  examplePayload: pollChangesTriggerExamplePayload,
  perform: async (
    context,
    payload,
    { connection, pollFolderId, showNewMessages, showUpdatedMessages },
  ) => {
    const now = new Date();
    const pollState = context.polling.getState() as PollingState | undefined;
    const sinceISO = pollState?.lastPolledAt ?? now.toISOString();
    const sinceDate = new Date(sinceISO);

    const skipFetch = !showNewMessages && !showUpdatedMessages;
    const messages: Message[] = skipFetch
      ? []
      : await fetchUpdatedMessagesSince(
          createClient(connection, context.debug.enabled),
          connection,
          sinceISO,
          pollFolderId,
        );

    const { created, updated } = partitionMessagesByTimestamp(messages, sinceDate);

    context.polling.setState({
      lastPolledAt: now.toISOString(),
    } as Record<string, unknown>);

    const result = {
      created: showNewMessages ? created : [],
      updated: showUpdatedMessages ? updated : [],
    };

    if (context.debug.enabled) {
      context.logger.debug(
        `Polled Outlook messages since ${sinceISO}: ${messages.length} total → ${created.length} new, ${updated.length} updated`,
      );
    }

    return {
      payload: { ...payload, body: { data: result } },
      polledNoChanges: result.created.length === 0 && result.updated.length === 0,
    };
  },
});
