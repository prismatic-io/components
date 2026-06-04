import { pollingTrigger } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { pollChangesTriggerExamplePayload } from "../examplePayloads";
import { connectionInput, showNewRecords, showUpdatedRecords } from "../inputs";
import type { Application, PollingState } from "../types";
import {
  fetchAllApplicationsSince,
  partitionApplicationsByTimestamp,
} from "../util";



const HARVEST_API_VERSION = "v1";

export const pollChangesTrigger = pollingTrigger({
  display: {
    label: "New and Updated Applications",
    description:
      "Checks for new and updated applications in Greenhouse on a configured schedule.",
  },
  inputs: {
    connection: connectionInput,
    showNewRecords,
    showUpdatedRecords,
  },
  perform: async (
    context,
    payload,
    { connection, showNewRecords, showUpdatedRecords },
  ) => {
    const now = new Date();
    const lastState = context.polling.getState() as PollingState | undefined;
    const sinceDate = lastState?.lastPolledAt
      ? new Date(lastState.lastPolledAt)
      : now;

    const client = createClient(
      connection,
      HARVEST_API_VERSION,
      context.debug.enabled,
    );
    const applications: Application[] = await fetchAllApplicationsSince(
      client,
      sinceDate.toISOString(),
    );

    const { created, updated } = partitionApplicationsByTimestamp(
      applications,
      sinceDate,
    );

    context.polling.setState({
      lastPolledAt: now.toISOString(),
    } as Record<string, unknown>);

    const result = {
      created: showNewRecords ? created : [],
      updated: showUpdatedRecords ? updated : [],
    };

    if (context.debug.enabled) {
      context.logger.debug(
        `Polled applications: ${applications.length} total → ${created.length} new, ${updated.length} updated`,
      );
    }

    return {
      payload: { ...payload, body: { data: result } },
      polledNoChanges:
        result.created.length === 0 && result.updated.length === 0,
    };
  },
  examplePayload: pollChangesTriggerExamplePayload,
});
