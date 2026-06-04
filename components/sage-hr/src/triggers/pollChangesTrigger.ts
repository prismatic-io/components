import { pollingTrigger } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { POLL_RESOURCE_CONFIG } from "../constants";
import { connectionInput, pollResourceType, showNewRecords } from "../inputs";
import type { PollingState, SageHRRecord } from "../types";
import { fetchAllRecords } from "../util";

export const pollChangesTrigger = pollingTrigger({
  display: {
    label: "Poll Changes",
    description: "Checks for new records in Sage HR on a configured schedule.",
  },
  inputs: {
    connectionInput,
    pollResourceType,
    showNewRecords,
  },
  perform: async (context, payload, params) => {
    const { connectionInput: connection, pollResourceType: resourceType } =
      params;
    const showNew = params.showNewRecords as boolean;

    const client = createClient(connection, context.debug.enabled);
    const resourceConfig = POLL_RESOURCE_CONFIG[resourceType];

    if (!resourceConfig) {
      throw new Error(`Unknown resource type: ${resourceType}`);
    }

    const endpoint = resourceConfig.endpoint;

    const state = context.polling.getState() as unknown as
      | PollingState
      | undefined;

    const records = await fetchAllRecords(client, endpoint);
    const currentIds = records.map((r) => String(r.id));

    const isFirstRun = state?.knownIds === undefined;

    if (isFirstRun) {
      context.polling.setState({
        knownIds: currentIds,
      } as unknown as Record<string, unknown>);
      return {
        payload: {
          ...payload,
          body: {
            data: {
              created: [],
              updated: [],
            },
          },
          contentType: "application/json",
        },
        polledNoChanges: true,
      };
    }

    const previousIds = new Set(state.knownIds);
    const newRecords = showNew
      ? records.filter((r) => !previousIds.has(String(r.id)))
      : [];

    context.polling.setState({
      knownIds: currentIds,
    } as unknown as Record<string, unknown>);

    return {
      payload: {
        ...payload,
        body: {
          data: {
            created: newRecords,
            updated: [],
          },
        },
        contentType: "application/json",
      },
      polledNoChanges: newRecords.length === 0,
    };
  },
});
