import { pollingTrigger } from "@prismatic-io/spectral";
import crmGetRecords from "../../actions/crmGetRecords";
import {
  DEFAULT_PER_PAGE,
  DEFAULT_POLLING_CRM_FIELDS,
  DEFAULT_POLLING_SORT_FIELD,
  DEFAULT_POLLING_SORT_ORDER,
} from "../../constants";
import { leadsPollingTriggerInputs } from "../../inputs";
import type { CRMRecords } from "../../types";
import { getCRMModifiedOrCreatedRecords, polledChanges } from "../../util/triggers";

export const contactsPollingTrigger = pollingTrigger({
  display: {
    label: "New and Updated CRM Contacts",
    description: "Checks for new and updated contacts in Zoho CRM on a configured schedule.",
  },
  inputs: leadsPollingTriggerInputs,
  perform: async (context, payload, { connection }) => {
    const now = new Date().toISOString();
    const lastState = context.polling.getState() as { lastUpdated: string };

    context.logger.debug(`Polling contacts from ${lastState.lastUpdated} to ${now}`);
    if (context.debug.enabled) {
      context.logger.debug(`Polling state: ${JSON.stringify(lastState)}`);
    }

    const { data: records } = await crmGetRecords.perform(context, {
      connection,
      recordType: "Contacts",
      fields: DEFAULT_POLLING_CRM_FIELDS,
      sort_by: DEFAULT_POLLING_SORT_FIELD,
      sort_order: DEFAULT_POLLING_SORT_ORDER,
      per_page: DEFAULT_PER_PAGE,
      fetchAll: true,
      page_token: "",
      page: 1,
    });
    const filteredRecords = getCRMModifiedOrCreatedRecords(
      (records as unknown as CRMRecords).data,
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
