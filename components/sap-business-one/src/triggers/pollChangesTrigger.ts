import { pollingTrigger } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { POLL_RESOURCE_CONFIG } from "../constants";
import { connection } from "../inputs/general";
import { pollChangesInputs } from "../inputs/polling";
import type {
  PollingChangesObject,
  PollingRecordChange,
  PollingState,
} from "../types";
import {
  fetchChanges,
  resolvePollingRecordChanges,
  resolvePollWindow,
} from "../util";

export const pollChangesTrigger = pollingTrigger({
  display: {
    label: "New and Updated Records",
    description:
      "Retrieves existing and ongoing records for a specified SAP Business One resource type. Load history once, check for changes on a schedule, or both.",
  },
  inputs: {
    connection,
    ...pollChangesInputs,
  },
  triggerResolverSupport: "valid",
  batchConfig: { batchSize: 50 },
  triggerResolver: {
    resolveItems: (_context, { payload }): PollingRecordChange[] =>
      resolvePollingRecordChanges(payload.body.data as PollingChangesObject),
  },
  perform: async (context, payload, params) => {
    const config = POLL_RESOURCE_CONFIG[params.pollResourceType];
    if (!config) {
      throw new Error(`Unsupported resource type: ${params.pollResourceType}`);
    }

    const now = new Date().toISOString();
    const state = context.polling.getState() as PollingState | undefined;
    const { since, isBackfill } = resolvePollWindow(
      state,
      params.lookBackDate,
      now,
    );

    if (!isBackfill && !params.showNewRecords && !params.showUpdatedRecords) {
      context.polling.setState({ lastPolledAt: now });
      return {
        payload: { ...payload, body: { data: { created: [], updated: [] } } },
        polledNoChanges: true,
      };
    }

    const client = await createClient(
      params.connection,
      context,
      context.debug.enabled,
    );

    const changes = await fetchChanges(client, config, since, isBackfill);

    const created = isBackfill || params.showNewRecords ? changes.created : [];
    const updated =
      isBackfill || params.showUpdatedRecords ? changes.updated : [];

    if (context.debug.enabled) {
      context.logger.debug(
        `Polled ${changes.total} ${params.pollResourceType} records: ${created.length} created, ${updated.length} updated since last poll.`,
      );
    }

    context.polling.setState({ lastPolledAt: now });

    return {
      payload: { ...payload, body: { data: { created, updated } } },
      polledNoChanges: created.length + updated.length === 0,
    };
  },
});
