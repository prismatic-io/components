import { pollingTrigger } from "@prismatic-io/spectral";
import booksGetRecords from "../../actions/booksGetRecords";
import { DEFAULT_PER_PAGE, TRIGGER_BATCH_SIZE } from "../../constants";
import { leadsPollingTriggerInputs } from "../../inputs";
import type {
  BookContactsRecords,
  BooksChangesObject,
  BooksRecordChange,
  PollingState,
} from "../../types";
import {
  getBooksModifiedOrCreatedRecords,
  polledChanges,
  resolveBooksRecordChanges,
  resolvePollingStart,
} from "../../util";
import { toZohoTimestamp } from "../../util/general";
export const bookContactsPollingTrigger = pollingTrigger({
  display: {
    label: "New and Updated Books Contacts",
    description:
      "Retrieves existing and ongoing contacts from Zoho Books. Load history once, check for changes on a schedule, or both.",
  },
  inputs: leadsPollingTriggerInputs,
  triggerResolverSupport: "valid",
  batchConfig: { batchSize: TRIGGER_BATCH_SIZE },
  triggerResolver: {
    resolveItems: (_context, { payload }): BooksRecordChange[] =>
      resolveBooksRecordChanges(payload.body.data as BooksChangesObject),
  },
  perform: async (context, payload, { connection, lookBackDate }) => {
    const now = new Date();
    const state = (context.polling.getState() ?? {}) as PollingState;
    const { sinceDate } = resolvePollingStart(state, lookBackDate, now);
    const { data: records } = await booksGetRecords.perform(context, {
      connection,
      recordType: "contacts",
      per_page: DEFAULT_PER_PAGE,
      fetchAll: true,
      page: 1,
      parentRecordId: "",
      parentRecordType: "",
      searchFields: {
        sort_column: "last_modified_time",
      },
      ...{ ifModifiedSince: toZohoTimestamp(sinceDate.toISOString()) },
    });
    const filteredRecords = getBooksModifiedOrCreatedRecords(
      (records as unknown as BookContactsRecords).contacts,
      sinceDate.toISOString(),
    );
    context.polling.setState({ lastPolledAt: now.toISOString() });
    return Promise.resolve({
      payload: { ...payload, body: { data: filteredRecords } },
      polledNoChanges: polledChanges(filteredRecords),
    });
  },
});
