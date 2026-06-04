import { pollingTrigger } from "@prismatic-io/spectral";
import { pagesPollingTriggerInputs } from "../inputs";
import { createClient } from "../client";
import { getPaginatedData } from "../util";
import { HttpMethod, MAX_PAGE_SIZE } from "../constants";
import type { NotionPage, PollingState } from "../types";

export const pagesPollingTrigger = pollingTrigger({
  display: {
    label: "New and Updated Pages",
    description:
      "Checks for new and updated pages in Notion on a configured schedule.",
  },
  inputs: pagesPollingTriggerInputs,
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
          value: "page",
          property: "object",
        },
        page_size: MAX_PAGE_SIZE,
      },
    );

    const allPages = (data.results || []) as NotionPage[];
    const newPages: NotionPage[] = [];
    const updatedPages: NotionPage[] = [];

    for (const page of allPages) {
      const createdTime = new Date(page.created_time);
      const editedTime = new Date(page.last_edited_time);
      const lastPolledDate = new Date(lastPolledAt);

      const isNew = createdTime >= lastPolledDate;
      const isUpdated = editedTime >= lastPolledDate;

      if (isNew) {
        newPages.push(page);
      } else if (isUpdated) {
        updatedPages.push(page);
      }
    }

    const polledNoChanges = newPages.length === 0 && updatedPages.length === 0;

    context.polling.setState({ lastPolledAt: now });

    return Promise.resolve({
      payload: {
        ...payload,
        body: {
          data: {
            newPages,
            updatedPages,
          },
        },
      },
      polledNoChanges,
    });
  },
});
