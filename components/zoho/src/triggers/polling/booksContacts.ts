import { pollingTrigger } from "@prismatic-io/spectral";
import booksGetRecords from "../../actions/booksGetRecords";
import { DEFAULT_PER_PAGE } from "../../constants";
import { leadsPollingTriggerInputs } from "../../inputs";
import type { BookContactsRecords } from "../../types";
import { getBooksModifiedOrCreatedRecords, polledChanges } from "../../util/triggers";

export const bookContactsPollingTrigger = pollingTrigger({
  display: {
    label: "New and Updated Books Contacts",
    description: "Checks for new and updated contacts in Zoho Books on a configured schedule.",
  },
  inputs: leadsPollingTriggerInputs,
  perform: async (context, payload, { connection }) => {
    const now = new Date().toISOString();
    const lastState = context.polling.getState() as { lastUpdated: string };

    context.logger.debug(`Polling contacts from ${lastState.lastUpdated || now} to ${now}`);
    if (context.debug.enabled) {
      context.logger.debug(`Polling state: ${JSON.stringify(lastState)}`);
    }

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
    });
    const filteredRecords = getBooksModifiedOrCreatedRecords(
      (records as unknown as BookContactsRecords).contacts,
      lastState.lastUpdated,
    );

    const polledNoChanges = polledChanges(filteredRecords);
    context.polling.setState({ lastUpdated: now });

    return Promise.resolve({
      payload: { ...payload, body: { data: filteredRecords } },
      polledNoChanges,
    });
  },
});
