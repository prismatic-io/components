import { pollingTrigger } from "@prismatic-io/spectral";
import { dataSourcesPollingTriggerInputs } from "../inputs";
import { createClient } from "../client";
import { getPaginatedData } from "../util";
import { HttpMethod, MAX_PAGE_SIZE } from "../constants";
import type { NotionPage, PollingState } from "../types";

export const dataSourcesPollingTrigger = pollingTrigger({
  display: {
    label: "New and Updated Databases",
    description:
      "Checks for new and updated databases in Notion on a configured schedule.",
  },
  inputs: dataSourcesPollingTriggerInputs,
  perform: async (context, payload, { connection }) => {
    const now = new Date().toISOString();
    const state = context.polling.getState() as unknown as PollingState;
    const lastPolledAt = state.lastPolledAt || now;
    const client = createClient(connection, context.debug.enabled);

    const { data } = await getPaginatedData(
      client,
      HttpMethod.POST,
      "/search",
      true,
      {
        filter: {
          value: "data_source",
          property: "object",
        },
        page_size: MAX_PAGE_SIZE,
      },
    );

    const allDataSources = (data.results || []) as NotionPage[];
    const newDataSources: NotionPage[] = [];
    const updatedDataSources: NotionPage[] = [];

    for (const dataSource of allDataSources) {
      const createdTime = new Date(dataSource.created_time);
      const editedTime = new Date(dataSource.last_edited_time);
      const lastPolledDate = new Date(lastPolledAt);

      const isNew = createdTime >= lastPolledDate;
      const isUpdated = editedTime >= lastPolledDate;

      if (isNew) {
        newDataSources.push(dataSource);
      } else if (isUpdated) {
        updatedDataSources.push(dataSource);
      }
    }

    const polledNoChanges =
      newDataSources.length === 0 && updatedDataSources.length === 0;

    context.polling.setState({ lastPolledAt: now });

    return Promise.resolve({
      payload: {
        ...payload,
        body: {
          data: {
            newDataSources,
            updatedDataSources,
          },
        },
      },
      polledNoChanges,
    });
  },
});
