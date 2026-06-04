import { pollingTrigger } from "@prismatic-io/spectral";
import { searchOnlyCustomObjects } from "../actions/search";
import { MAX_SEARCH_LIMIT } from "../constants";
import {
  connectionInput,
  objectType,
  searchProperties,
  showNewRecords,
  showUpdatedRecords,
} from "../inputs";
import type { PollingTriggerObject } from "../types/PollingTriggerObject";
import type { SearchRecordsPollingState } from "../types/SearchRecordsPollingState";
import { getPollingChanges } from "../util";

export const pollChangesCustomObjectsTrigger = pollingTrigger({
  display: {
    label: "New and Updated Custom Records",
    description:
      "Checks for new and updated records in a specified custom object type on a configured schedule.",
  },
  inputs: {
    showNewRecords,
    showUpdatedRecords,
    hubspotConnection: connectionInput,
    objectType: {
      ...objectType,
      comments: "The type of custom object to search for.",
    },
    searchProperties,
  },
  perform: async (context, payload, params) => {
    const now = new Date().toISOString();

    const pollState: SearchRecordsPollingState =
      context.polling.getState() as SearchRecordsPollingState;

    const lastPolledAt: string = pollState.lastPolledAt || now;

    if (context.debug.enabled) {
      context.logger.debug(`Polling state: ${JSON.stringify(pollState)}`);
      context.logger.debug(`Last polled at: ${lastPolledAt}`);
    }

    const searchParams = {
      ...params,
      fetchAll: true,
      searchLimit: MAX_SEARCH_LIMIT,
      timeout: 10000,
      lastPolledAt,
    };

    const { data } = await searchOnlyCustomObjects(context, searchParams);

    const searchRecords = data.results || [];

    const { changes, changesObject } = getPollingChanges(
      params.showNewRecords,
      params.showUpdatedRecords,
      searchRecords as PollingTriggerObject[],
      new Date(lastPolledAt),
    );

    context.polling.setState({ lastPolledAt: now });

    return {
      payload: { ...payload, body: { data: changesObject } },
      polledNoChanges: changes === 0,
    };
  },
});
