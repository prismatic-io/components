import { pollingTrigger } from "@prismatic-io/spectral";
import { createAtomFeedClient } from "../client";
import { DEFAULT_BATCH_SIZE } from "../constants";
import { pollChangesExamplePayload } from "../examplePayloads/triggers";
import { pollChangesInputs } from "../inputs/triggers";
import type {
  AtomFeedEntry,
  HcmAtomChangesObject,
  HcmAtomRecordChange,
  PollingState,
} from "../types";
import { fetchAtomEntries, resolveAtomPollingRecordChanges } from "../util";
export const pollChangesTrigger = pollingTrigger({
  display: {
    label: "Atom Feed Notifications",
    description:
      "Retrieves existing and ongoing records from a selected Oracle HCM Atom feed. Load history once, check for changes on a schedule, or both.",
  },
  allowsBranching: false,
  examplePayload: pollChangesExamplePayload,
  inputs: pollChangesInputs,
  triggerResolverSupport: "valid",
  batchConfig: { batchSize: DEFAULT_BATCH_SIZE },
  triggerResolver: {
    resolveItems: (_context, { payload }): HcmAtomRecordChange[] =>
      resolveAtomPollingRecordChanges(
        payload.body.data as HcmAtomChangesObject,
      ),
  },
  perform: async (context, payload, params) => {
    const now = new Date().toISOString();
    const pollState = context.polling.getState() as PollingState;
    const lastPolledAt =
      pollState?.lastPolledAt ?? (params.lookBackDate || now);
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
