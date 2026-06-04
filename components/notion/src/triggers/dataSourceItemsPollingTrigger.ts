import { pollingTrigger } from "@prismatic-io/spectral";
import { dataSourceItemsPollingTriggerInputs } from "../inputs";
import { createClient } from "../client";
import { getPaginatedData } from "../util";
import { HttpMethod, MAX_PAGE_SIZE } from "../constants";
import type { NotionPage, PollingState } from "../types";

export const dataSourceItemsPollingTrigger = pollingTrigger({
  display: {
    label: "New and Updated Database Items",
    description:
      "Checks for new and updated items in a Notion database on a configured schedule.",
  },
  inputs: dataSourceItemsPollingTriggerInputs,
  perform: async (context, payload, { connection, dataSourceId }) => {
    const now = new Date().toISOString();
    const state = context.polling.getState() as unknown as PollingState;
    const lastPolledAt = state.lastPolledAt || now;
    const client = createClient(connection, context.debug.enabled);

    const createdFilter = {
      timestamp: "created_time",
      created_time: {
        on_or_after: lastPolledAt,
      },
    };

    const editedFilter = {
      timestamp: "last_edited_time",
      last_edited_time: {
        on_or_after: lastPolledAt,
      },
    };

    const [newItemsResponse, updatedItemsResponse] = await Promise.all([
      getPaginatedData(
        client,
        HttpMethod.POST,
        `/data_sources/${dataSourceId}/query`,
        true,
        {
          filter: createdFilter,
          sorts: [{ timestamp: "created_time", direction: "ascending" }],
          page_size: MAX_PAGE_SIZE,
        },
      ),
      getPaginatedData(
        client,
        HttpMethod.POST,
        `/data_sources/${dataSourceId}/query`,
        true,
        {
          filter: editedFilter,
          sorts: [{ timestamp: "last_edited_time", direction: "ascending" }],
          page_size: MAX_PAGE_SIZE,
        },
      ),
    ]);

    const newItems = (newItemsResponse.data.results || []) as NotionPage[];
    const updatedItems = (updatedItemsResponse.data.results ||
      []) as NotionPage[];

    const polledNoChanges = newItems.length === 0 && updatedItems.length === 0;

    context.polling.setState({ lastPolledAt: now });

    return Promise.resolve({
      payload: {
        ...payload,
        body: {
          data: {
            newItems,
            updatedItems,
          },
        },
      },
      polledNoChanges,
    });
  },
});
