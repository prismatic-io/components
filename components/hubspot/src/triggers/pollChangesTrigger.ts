import { pollingTrigger } from "@prismatic-io/spectral";
import { searchNoCustomObjects } from "../actions/search";
import { MAX_SEARCH_LIMIT } from "../constants";
import {
  connectionInput,
  searchEndpoint,
  searchProperties,
  showNewRecords,
  showUpdatedRecords,
} from "../inputs";
import type { PollingTriggerObject } from "../types/PollingTriggerObject";
import type { SearchRecordsPollingState } from "../types/SearchRecordsPollingState";
import { getPollingChanges } from "../util";

export const pollChangesTrigger = pollingTrigger({
  display: {
    label: "New and Updated Records",
    description:
      "Checks for new and updated records in a selected HubSpot object type on a configured schedule.",
  },
  inputs: {
    showNewRecords,
    showUpdatedRecords,
    hubspotConnection: connectionInput,
    searchEndpoint: {
      ...searchEndpoint,
      model: searchEndpoint.model.filter((input) => input.label !== "Custom objects"),
    },
    searchProperties,
  },
  perform: async (context, payload, params) => {
    const now = new Date().toISOString();

    const pollState: SearchRecordsPollingState =
      context.polling.getState() as SearchRecordsPollingState;

    const lastPolledAt: string = pollState.lastPolledAt || now;

    context.logger.debug(`Polled for changes from: ${lastPolledAt} to ${now}`);
    if (context.debug.enabled) {
      context.logger.debug(`Polling state: ${JSON.stringify(pollState)}`);
    }

    const searchParams = {
      ...params,
      fetchAll: true,
      searchLimit: MAX_SEARCH_LIMIT,
      timeout: 10000,
      lastPolledAt,
    };

    const { data } = await searchNoCustomObjects(context, searchParams);

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
