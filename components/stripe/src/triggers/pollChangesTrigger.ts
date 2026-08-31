import { pollingTrigger } from "@prismatic-io/spectral";
import { pollChangesTriggerExamplePayload } from "../examplePayloads/triggers";
import { pollChangesInputs } from "../inputs";
import type { PollingState, StripeEvent } from "../types";
import { fetchEventsSince } from "../util";
export const pollChangesTrigger = pollingTrigger({
  display: {
    label: "New and Updated Records",
    description:
      "Checks for new and updated records in Stripe on a configured schedule. Events with a type ending in `.created` are partitioned into the `created` bucket; all other event types (such as `.updated`, `.deleted`, or `.succeeded`) are partitioned into the `updated` bucket.",
  },
  examplePayload: pollChangesTriggerExamplePayload,
  inputs: pollChangesInputs,
  perform: async (context, payload, params) => {
    const now = new Date().toISOString();
    const pollState = context.polling.getState() as PollingState;
    const lastPolledAt = pollState?.lastPolledAt ?? now;
    const createdGte = Math.floor(new Date(lastPolledAt).getTime() / 1000);
    const { events, truncated } = await fetchEventsSince(
      params.connection,
      createdGte,
      params.pollEventTypes,
    );
    const created: StripeEvent[] = [];
    const updated: StripeEvent[] = [];
    for (const event of events) {
      const isNew =
        typeof event.type === "string" && event.type.endsWith(".created");
      if (isNew && params.showNewRecords !== false) created.push(event);
      else if (!isNew && params.showUpdatedRecords !== false)
        updated.push(event);
    }
    const nextCursor = truncated ? lastPolledAt : now;
    if (truncated) {
      context.logger.warn(
        `Polling truncated at the page cap for Stripe events. Holding the cursor at ${lastPolledAt} so the un-fetched older events are not skipped; the next poll re-queries the same window and may re-emit events. Shorten the polling interval or narrow the Event Types filter to clear the backlog.`,
      );
    }
    context.polling.setState({ lastPolledAt: nextCursor });
    if (context.debug.enabled) {
      context.logger.debug(
        `Polled Stripe events: ${events.length} fetched, ${created.length} created, ${updated.length} updated, truncated=${truncated}`,
      );
    }
    const totalMatched = created.length + updated.length;
    return {
      payload: { ...payload, body: { data: { created, updated } } },
      polledNoChanges: totalMatched === 0,
    };
  },
});
