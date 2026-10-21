import { pollingTrigger } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { connectionInput, lookBackDate } from "../inputs";
import type {
  Envelope,
  PollingChangesObject,
  PollingRecordChange,
  PollingState,
} from "../interfaces";
import {
  fetchAllRecords,
  filterEnvelopesCreatedAfter,
  resolvePollingRecordChanges,
  toYotiDate,
} from "../util";
export const pollChangesTrigger = pollingTrigger({
  display: {
    label: "New Envelopes",
    description:
      "Retrieves existing and ongoing envelopes from Yoti Sign. Load history once, check for new envelopes on a schedule, or both.",
  },
  inputs: { connection: connectionInput, lookBackDate },
  triggerResolverSupport: "valid",
  batchConfig: { batchSize: 50 },
  triggerResolver: {
    resolveItems: (_context, { payload }): PollingRecordChange[] =>
      resolvePollingRecordChanges(payload.body.data as PollingChangesObject),
  },
  perform: async (context, payload, params) => {
    const pollState = context.polling.getState() as PollingState;
    const now = new Date().toISOString();
    if (!pollState?.lastPolledAt) {
      if (!params.lookBackDate) {
        context.polling.setState({ lastPolledAt: now });
        return {
          payload: { ...payload, body: { data: { created: [] } } },
          polledNoChanges: true,
        };
      }
    }
    const lastPolledAt =
      pollState?.lastPolledAt ??
      new Date(`${params.lookBackDate}T00:00:00.000Z`).toISOString();
    const client = createClient(params.connection, context.debug.enabled);
    const { data: fetched } = await fetchAllRecords<Envelope>(
      client,
      "/organisations/envelopes/search",
      { from_date: toYotiDate(lastPolledAt) },
    );
    const envelopes = filterEnvelopesCreatedAfter(fetched, lastPolledAt);
    context.polling.setState({ lastPolledAt: now });
    if (context.debug.enabled) {
      context.logger.debug(
        `Polled Yoti Sign envelopes: ${fetched.length} fetched, ${envelopes.length} new`,
      );
    }
    return {
      payload: { ...payload, body: { data: { created: envelopes } } },
      polledNoChanges: envelopes.length === 0,
    };
  },
});
