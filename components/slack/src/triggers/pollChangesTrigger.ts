import { pollingTrigger } from "@prismatic-io/spectral";
import { pollChangesTriggerExamplePayload } from "../examplePayloads";
import { pollChangesInputs } from "../inputs";
import type { PollingState, SlackMessage } from "../types";
import { fetchSlackMessagesSince } from "../util";

export const pollChangesTrigger = pollingTrigger({
  display: {
    label: "New and Updated Messages",
    description:
      "Checks for new messages in a selected Slack channel on a configured schedule. Messages are emitted in the 'created' bucket; the 'updated' bucket is preserved for shape parity but is always empty because Slack's conversations.history endpoint returns immutable history (use the Events API Webhook trigger to receive message_changed events).",
  },
  examplePayload: pollChangesTriggerExamplePayload,
  inputs: pollChangesInputs,
  perform: async (context, payload, params) => {
    const now = new Date().toISOString();
    const pollState = context.polling.getState() as PollingState;
    const lastPolledAt = pollState?.lastPolledAt ?? now;

    
    
    
    const oldest = (new Date(lastPolledAt).getTime() / 1000).toFixed(6);

    const { messages, truncated } = await fetchSlackMessagesSince(
      params.connection,
      params.channelId,
      oldest
    );

    const created: SlackMessage[] =
      params.showNewRecords !== false ? messages : [];
    const updated: SlackMessage[] = [];

    
    
    
    let nextCursor = now;
    if (truncated) {
      const oldestTs = messages
        .map((m) => m.ts)
        .filter((t): t is string => typeof t === "string")
        .reduce<string | null>(
          (min, t) => (min === null || t < min ? t : min),
          null
        );
      if (oldestTs !== null) {
        nextCursor = new Date(Number.parseFloat(oldestTs) * 1000).toISOString();
      }
      context.logger.warn(
        `Polling truncated at the page cap for Slack channel ${params.channelId}. Advancing cursor to ${nextCursor}; next poll will resume from there.`
      );
    }
    context.polling.setState({ lastPolledAt: nextCursor });

    if (context.debug.enabled) {
      context.logger.debug(
        `Polled Slack channel ${params.channelId}: ${messages.length} fetched, truncated=${truncated}`
      );
    }

    const totalMatched = created.length + updated.length;
    return {
      payload: { ...payload, body: { data: { created, updated } } },
      polledNoChanges: totalMatched === 0,
    };
  },
});
