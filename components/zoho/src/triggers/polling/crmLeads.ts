import { pollingTrigger } from "@prismatic-io/spectral";
import crmGetRecords from "../../actions/crmGetRecords";
import {
  DEFAULT_PER_PAGE,
  DEFAULT_POLLING_SORT_FIELD,
  DEFAULT_POLLING_SORT_ORDER,
} from "../../constants";
import { crmPollingTriggerInputs } from "../../inputs";
import type { CRMRecords } from "../../types";
import {
  getCRMModifiedOrCreatedRecords,
  mergeCRMPollingFields,
  polledChanges,
} from "../../util/triggers";
export const leadsPollingTrigger = pollingTrigger({
  display: {
    label: "New and Updated CRM Leads",
    description:
      "Checks for new and updated leads in Zoho CRM on a configured schedule.",
  },
  inputs: crmPollingTriggerInputs,
  perform: async (context, payload, { connection, fields }) => {
    const now = new Date().toISOString();
    const lastState = context.polling.getState() as {
      lastUpdated: string;
    };
    if (context.debug.enabled) {
      context.logger.debug(
        `Polling leads from ${lastState.lastUpdated} to ${now}`,
      );
      context.logger.debug(`Polling state: ${JSON.stringify(lastState)}`);
    }
    const { data: records } = await crmGetRecords.perform(context, {
      connection,
      recordType: "Leads",
      fields: mergeCRMPollingFields(fields),
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
