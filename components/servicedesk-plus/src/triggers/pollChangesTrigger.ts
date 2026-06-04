import { pollingTrigger } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { connectionInput, pollResourceType, showNewRecords } from "../inputs";
import type { PollingState, SDPRecord } from "../types";
import { paginateData } from "../util";

export const pollChangesTrigger = pollingTrigger({
  display: {
    label: "New Records",
    description:
      "Checks for new records in ServiceDesk Plus on a configured schedule.",
  },
  inputs: {
    connectionInput,
    pollResourceType,
    showNewRecords,
  },
  perform: async (context, payload, params) => {
    const resourceType = params.pollResourceType;

    if (context.debug.enabled) {
      context.logger.debug(
        `Polling ServiceDesk Plus '${resourceType}' for new records`,
      );
    }

    const client = createClient(params.connectionInput, context.debug.enabled);

    const result = await paginateData(client, resourceType, 100, 1, true);

    const records: SDPRecord[] = (result[resourceType] as SDPRecord[]) || [];

    const currentIds = records.map((record) => String(record.id));

    const pollState = context.polling.getState() as unknown as
      | PollingState
      | undefined;
    const isFirstPoll = pollState?.knownIds === undefined;

    if (isFirstPoll) {
      context.polling.setState({ knownIds: currentIds });
      return {
        payload: {
          ...payload,
          body: {
            data: {
              created: [],
              updated: [],
            },
          },
        },
        polledNoChanges: true,
      };
    }

    const knownIdSet = new Set(pollState.knownIds);
    const newRecords = records.filter(
      (record) => !knownIdSet.has(String(record.id)),
    );

    const filteredRecords = params.showNewRecords ? newRecords : [];

    context.polling.setState({ knownIds: currentIds });

    return {
      payload: {
        ...payload,
        body: {
          data: {
            created: filteredRecords,
            updated: [],
          },
        },
      },
      polledNoChanges: filteredRecords.length === 0,
    };
  },
});
