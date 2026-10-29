import { pollingTrigger } from "@prismatic-io/spectral";
import { getMsBusinessCentralClient } from "../client";
import { POLL_RESOURCE_CONFIG, TRIGGER_BATCH_SIZE } from "../constants";
import { pollChangesExamplePayload } from "../examplePayloads";
import { pollChangesInputs } from "../inputs/polling";
import type {
  BusinessCentralRecord,
  PollingChangesObject,
  PollingRecordChange,
  PollingState,
} from "../interfaces";
import {
  fetchAllPagedSince,
  nextPollingState,
  resolvePollingStart,
  resolvePollingStream,
  resolveRecordChanges,
} from "../utils";

export const pollChangesTrigger = pollingTrigger({
  display: {
    label: "New and Updated Records",
    description:
      "Retrieves existing and ongoing records of a Microsoft Dynamics 365 Business Central entity. Load history once, check for changes on a schedule, or both.",
  },
  examplePayload: pollChangesExamplePayload,
  inputs: pollChangesInputs,
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

    const config = POLL_RESOURCE_CONFIG[params.pollResourceType];
    if (!config) {
      throw new Error(`Unsupported resource type: ${params.pollResourceType}`);
    }

    const modifiedFilter = `lastModifiedDateTime gt ${lastPolledAt}`;
    const $filter = params.additionalFilter
      ? `(${params.additionalFilter}) and (${modifiedFilter})`
      : modifiedFilter;

    const client = getMsBusinessCentralClient(
      params.connection,
      context,
      context.debug.enabled,
    );
    const path = `/companies(${params.companyId})/${config.endpoint}`;
    const query = `${path}?$filter=${$filter}`;
    let stream = resolvePollingStream(pollState, query, now);
    let fetched: Awaited<ReturnType<typeof fetchAllPagedSince>>;
    try {
      fetched = await fetchAllPagedSince(
        client,
        path,
        { $filter },
        stream.nextLink,
      );
    } catch (error) {
      if (!stream.nextLink) throw error;
      context.logger.warn(
        `The held page link for ${params.pollResourceType} was rejected; restarting from ${lastPolledAt}.`,
      );
      stream = { streamStartedAt: now };
      fetched = await fetchAllPagedSince(client, path, { $filter });
    }
    const { records, truncated, nextLink } = fetched;

    const created: BusinessCentralRecord[] = [];
    const updated: BusinessCentralRecord[] =
      isBackfill || params.showUpdatedRecords !== false ? records : [];

    context.polling.setState(
      nextPollingState(
        { lastPolledAt, stream, query, isBackfill },
        truncated ? nextLink : undefined,
      ) satisfies PollingState,
    );
    if (truncated) {
      context.logger.warn(
        `Polling truncated at the page cap for ${params.pollResourceType} on company ${params.companyId}. Holding cursor at ${lastPolledAt}; the next poll resumes from the stored page link.`,
      );
    }

    if (context.debug.enabled) {
      context.logger.debug(
        `Polled ${params.pollResourceType} on company ${params.companyId}: ${records.length} fetched, truncated=${truncated}`,
      );
    }

    const totalMatched = created.length + updated.length;
    return {
      payload: { ...payload, body: { data: { created, updated } } },
      polledNoChanges: totalMatched === 0,
    };
  },
});
