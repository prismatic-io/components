import { pollingTrigger } from "@prismatic-io/spectral";
import { createClient } from "../client";
import {
  DEFAULT_BATCH_SIZE,
  DEFAULT_PAGE_LIMIT,
  PAGES_URL_REGEX,
  UPDATED_PAGES_URL,
} from "../constants";
import { pagesPollingTriggerExamplePayload } from "../examplePayloads";
import { pagesPollingTriggerInputs } from "../inputs";
import type { PageRecordChange, PagesChangesObject, Page } from "../types";
import { paginateResults, resolvePageRecordChanges } from "../util";
import type { PollingState } from "./interfaces";
import {
  categorizeByChangeType,
  filterByDate,
  getVersionCreatedAt,
} from "./utils";
export const pagesPollingTrigger = pollingTrigger({
  display: {
    label: "New and Updated Pages",
    description:
      "Retrieves existing and ongoing pages from Confluence. Load history once, check for changes on a schedule, or both.",
  },
  inputs: pagesPollingTriggerInputs,
  examplePayload: pagesPollingTriggerExamplePayload,
  triggerResolverSupport: "valid",
  batchConfig: { batchSize: DEFAULT_BATCH_SIZE },
  triggerResolver: {
    resolveItems: (_context, { payload }): PageRecordChange[] =>
      resolvePageRecordChanges(payload.body.data as PagesChangesObject),
  },
  perform: async (context, payload, { connectionInput, lookBackDate }) => {
    const now = new Date().toISOString();
    const lastState = context.polling.getState() as PollingState;
    if (!lastState?.lastPolled) {
      const seedDate = lookBackDate || now;
      context.polling.setState({ lastPolled: seedDate });
      if (!lookBackDate) {
        return {
          payload: {
            ...payload,
            body: { data: { createdRecords: [], updatedRecords: [] } },
          },
          polledNoChanges: true,
        };
      }
    }
    const lastPolled = lastState?.lastPolled ?? lookBackDate ?? now;
    const client = await createClient(connectionInput, context.debug.enabled);
    const pageLimit = context.batch?.enabled
      ? DEFAULT_BATCH_SIZE
      : DEFAULT_PAGE_LIMIT;
    const allPages = await paginateResults<Page>(
      client,
      UPDATED_PAGES_URL,
      PAGES_URL_REGEX,
      pageLimit,
    );
    const pages = filterByDate<Page>(allPages, lastPolled, getVersionCreatedAt);
    const data = categorizeByChangeType(pages, lastPolled);
    context.polling.setState({ lastPolled: now });
    return {
      payload: { ...payload, body: { data } },
      polledNoChanges:
        data.createdRecords.length === 0 && data.updatedRecords.length === 0,
    };
  },
});
