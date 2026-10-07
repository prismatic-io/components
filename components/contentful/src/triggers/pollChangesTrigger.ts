import { pollingTrigger } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { MAX_BATCHED_POLL_PAGES, MAX_POLL_PAGES } from "../constants";
import { pollChangesTriggerExamplePayload } from "../examplePayloads";
import { pollChangesInputs } from "../inputs";
import type {
  PollingChangesObject,
  PollingRecordChange,
  PollingState,
} from "../types";
import {
  getEnvironment,
  pollEntryChanges,
  resolvePollingRecordChanges,
} from "../util";
export const pollChangesTrigger = pollingTrigger({
  display: {
    label: "New and Updated Entries",
    description:
      "Retrieves existing and ongoing entries for a specified Contentful environment. Load history once, check for changes on a schedule, or both.",
  },
  examplePayload: pollChangesTriggerExamplePayload,
  inputs: pollChangesInputs,
  triggerResolverSupport: "valid",
  batchConfig: { batchSize: 50 },
  triggerResolver: {
    resolveItems: (_context, { payload }): PollingRecordChange[] =>
      resolvePollingRecordChanges(payload.body.data as PollingChangesObject),
  },
  perform: async (context, payload, params) => {
    const isBatching = context.batch?.enabled === true;
    const maxPages = isBatching ? MAX_BATCHED_POLL_PAGES : MAX_POLL_PAGES;
    const client = createClient(params.connection, context);
    const environment = await getEnvironment(
      client,
      params.spaceId,
      params.environmentId,
    );
    const result = await pollEntryChanges(
      environment,
      context.polling.getState() as PollingState | undefined,
      {
        lookBackDate: params.lookBackDate,
        contentTypeId: params.contentTypeId,
        showNewRecords: params.showNewRecords !== false,
        showUpdatedRecords: params.showUpdatedRecords !== false,
        maxPages,
        now: new Date().toISOString(),
      },
    );
    const { created, updated } = result.changes;
    if (result.stalled) {
      context.logger.warn(
        `Polling truncated at the page cap and every fetched Contentful entry shares the cursor timestamp ${result.since}; the cursor cannot advance.`,
      );
    } else if (result.truncated) {
      context.logger.warn(
        `Polling truncated at the page cap for Contentful entries. Advancing cursor to ${result.nextState.lastPolledAt}; next poll will resume from there.`,
      );
    }
    context.polling.setState(result.nextState);
    if (context.debug.enabled) {
      context.logger.debug(
        `Polled Contentful entries${result.isInitialSync ? " (initial sync)" : ""}: ${result.fetched} fetched, ${created.length} created, ${updated.length} updated, truncated=${result.truncated}`,
      );
    }
    return {
      payload: { ...payload, body: { data: { created, updated } } },
      polledNoChanges: created.length + updated.length === 0,
    };
  },
});
