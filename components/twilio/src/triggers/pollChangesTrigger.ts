import { pollingTrigger } from "@prismatic-io/spectral";
import { pollChangesTriggerExamplePayload } from "../examplePayloads";
import { pollChangesTriggerInputs } from "../inputs";
import type { PollingState, TwilioMessage } from "../types";
import { fetchMessagesSince } from "../util";

export const pollChangesTrigger = pollingTrigger({
  display: {
    label: "New and Updated Records",
    description:
      "Checks for newly sent Twilio messages on a configured schedule. Returned messages appear in the created bucket; the updated bucket is preserved for shape parity but is always empty because Twilio polling does not detect status changes to already-sent messages.",
  },
  examplePayload: pollChangesTriggerExamplePayload,
  inputs: pollChangesTriggerInputs,
  perform: async (context, payload, params) => {
    const now = new Date().toISOString();
    const pollState = context.polling.getState() as PollingState;
    const lastPolledAt = pollState?.lastPolledAt ?? now;
    const dateSentAfter = new Date(lastPolledAt);

    const { messages, truncated } = await fetchMessagesSince(
      params.connection,
      dateSentAfter,
      context.debug.enabled,
      params.from,
      params.to,
    );

    const created: TwilioMessage[] = params.showNewRecords !== false ? messages : [];
    const updated: TwilioMessage[] = [];

    
    
    
    let nextCursor = now;
    if (truncated) {
      const oldestSent = messages
        .map((m) => m.dateSent)
        .filter((d): d is Date => d instanceof Date)
        .reduce<Date | null>((min, d) => (min === null || d < min ? d : min), null);
      if (oldestSent !== null) {
        nextCursor = oldestSent.toISOString();
      }
      context.logger.warn(
        `Polling truncated at the message limit for Twilio. Advancing cursor to ${nextCursor}; next poll will resume from there.`,
      );
    }
    context.polling.setState({ lastPolledAt: nextCursor });

    if (context.debug.enabled) {
      context.logger.debug(
        `Polled Twilio messages: ${messages.length} fetched, ${created.length} created, truncated=${truncated}`,
      );
    }

    const totalMatched = created.length + updated.length;
    return {
      payload: { ...payload, body: { data: { created, updated } } },
      polledNoChanges: totalMatched === 0,
    };
  },
});
