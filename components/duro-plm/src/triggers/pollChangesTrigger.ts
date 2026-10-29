import { pollingTrigger } from "@prismatic-io/spectral";
import { createDuroClient } from "../client";
import { POLL_RESOURCE_CONFIG, TRIGGER_BATCH_SIZE } from "../constants";
import { pollChangesExamplePayload } from "../examplePayloads";
import { pollChangesInputs } from "../inputs/polling";
import type {
  PollingChangesObject,
  PollingRecordChange,
  PollingState,
} from "../types";
import {
  classifyRecords,
  fetchAllSince,
  nextPollingState,
  resolvePollingStart,
  resolvePollingStream,
  resolveRecordChanges,
} from "../util";

export const pollChangesTrigger = pollingTrigger({
  display: {
    label: "New and Updated Records",
    description:
      "Retrieves existing and ongoing components or change orders in Duro. Load history once, check for changes on a schedule, or both.",
  },
  inputs: pollChangesInputs,
  examplePayload: pollChangesExamplePayload,
  triggerResolverSupport: "valid",
  batchConfig: { batchSize: TRIGGER_BATCH_SIZE },
  triggerResolver: {
    resolveItems: (_context, { payload }): PollingRecordChange[] =>
      resolveRecordChanges(payload.body.data as PollingChangesObject),
  },
  perform: async (context, payload, params) => {
    const now = new Date().toISOString();
    const pollState = context.polling.getState() as PollingState;
    const { since: lastPolledAt, isBackfill } = resolvePollingStart(
      pollState,
      params.lookBackDate,
      now,
    );

    const stream = resolvePollingStream(
      pollState,
      params.pollResourceType,
      now,
    );

    if (!POLL_RESOURCE_CONFIG[params.pollResourceType]) {
      throw new Error(`Unsupported resource type: ${params.pollResourceType}`);
    }

    const client = createDuroClient(params.connection, context.debug.enabled);
    const { records, truncated, endCursor } = await fetchAllSince(
      client,
      params.pollResourceType,
      lastPolledAt,
      {
        after: stream.endCursor,
        debug: context.debug.enabled,
        logger: context.logger,
      },
    );

    const { created, updated } = classifyRecords(records, lastPolledAt, {
      ...params,
      isBackfill,
    });
    const totalMatched = created.length + updated.length;

    context.polling.setState(
      nextPollingState(
        {
          lastPolledAt,
          stream,
          resourceType: params.pollResourceType,
          isBackfill,
        },
        truncated ? endCursor : undefined,
      ),
    );
    if (truncated) {
      context.logger.warn(
        `Polling truncated at the page cap for ${params.pollResourceType}. Holding cursor at ${lastPolledAt}; the next poll resumes from the stored cursor.`,
      );
    }

    if (context.debug.enabled) {
      context.logger.debug(
        `Polled ${params.pollResourceType}: ${records.length} fetched, ${created.length} created, ${updated.length} updated, truncated=${truncated}`,
      );
    }

    return {
      payload: { ...payload, body: { data: { created, updated } } },
      polledNoChanges: totalMatched === 0,
    };
  },
});
