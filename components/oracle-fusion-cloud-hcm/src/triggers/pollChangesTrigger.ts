import { pollingTrigger } from "@prismatic-io/spectral";
import { createAtomFeedClient } from "../client";
import { pollChangesExamplePayload } from "../examplePayloads/triggers";
import { pollChangesInputs } from "../inputs/triggers";
import type { AtomFeedEntry, PollingState } from "../types";
import { fetchAtomEntries } from "../util";
export const pollChangesTrigger = pollingTrigger({
  display: {
    label: "Atom Feed Notifications",
    description:
      "Checks for new and updated records from a selected Oracle HCM Atom feed on a configured schedule.",
  },
  allowsBranching: false,
  examplePayload: pollChangesExamplePayload,
  inputs: pollChangesInputs,
  perform: async (context, payload, params) => {
    const now = new Date().toISOString();
    const pollState = context.polling.getState() as PollingState;
    const lastPolledAt = pollState?.lastPolledAt ?? now;
    const client = createAtomFeedClient(
      params.connection,
      context.debug.enabled,
    );
    const entries: AtomFeedEntry[] = await fetchAtomEntries(
      client,
      params.feedName,
      lastPolledAt,
      params.pageSize,
    );
    context.polling.setState({ lastPolledAt: now });
    if (context.debug.enabled) {
      context.logger.debug(
        `Polled Atom feed '${params.feedName}': ${entries.length} entries since ${lastPolledAt}`,
      );
    }
    return {
      payload: { ...payload, body: { data: { entries } } } as typeof payload,
      polledNoChanges: entries.length === 0,
    };
  },
});
