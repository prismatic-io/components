import { pollingTrigger } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { PAGES_URL_REGEX, UPDATED_PAGES_URL } from "../constants";
import { connectionInput } from "../inputs";
import type { Page } from "../interfaces";
import { paginateResults } from "../util";
import type { PollingState } from "./interfaces";
import {
  categorizeByChangeType,
  filterByDate,
  getLastPolled,
  getVersionCreatedAt,
} from "./utils";

export const pagesPollingTrigger = pollingTrigger({
  display: {
    label: "New and Updated Pages",
    description: "Checks for new and updated pages on a configured schedule.",
  },
  inputs: {
    connectionInput,
  },
  perform: async (context, payload, { connectionInput }) => {
    const now = new Date().toISOString();
    const lastState = context.polling.getState() as PollingState;
    const client = await createClient(connectionInput, context.debug.enabled);

    const allPages = await paginateResults<Page>(
      client,
      UPDATED_PAGES_URL,
      PAGES_URL_REGEX,
    );

    const pages = filterByDate<Page>(
      allPages,
      getLastPolled(lastState, now),
      getVersionCreatedAt,
    );

    const data = categorizeByChangeType(pages, lastState?.lastPolled);

    context.polling.setState({ lastPolled: now });
    return {
      payload: { ...payload, body: { data } },
      polledNoChanges: data.created.length === 0 && data.updated.length === 0,
    };
  },
});
