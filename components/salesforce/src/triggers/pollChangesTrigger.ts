import { pollingTrigger, util } from "@prismatic-io/spectral";

import { pollChangesTriggerInputs } from "../inputs";
import { DEFAULT_MAX_RECORDS, DEFAULT_SF_VERSION } from "../constants";
import type { DeletedRecord, PollingTriggerObject, SearchRecordsPollingState } from "../types";
import { buildSOQLQuery, coerceObjectValues, executeSOQLQuery, getPollingChanges } from "../util";
import { findRecords } from "../actions/records/findRecords";
import { createSalesforceClient } from "../client";

export const pollChangesTrigger = pollingTrigger({
  display: {
    label: "New and Updated Records",
    description:
      "Checks for new, updated, and optionally deleted records in Salesforce on a recurring schedule.",
  },
  inputs: pollChangesTriggerInputs,
  perform: async (context, payload, params) => {
    const sfVersion = params.version || DEFAULT_SF_VERSION;
    const pollingExecutionTime = new Date().toISOString();
    const pollState: SearchRecordsPollingState =
      context.polling.getState() as SearchRecordsPollingState;

    let sortValue = "";
    if (params.showNewRecords) {
      sortValue = "-CreatedDate";
    }
    if (params.showUpdatedRecords) {
      sortValue += " -LastModifiedDate";
    }

    const maxRecords = params.maxRecordsToFetch || DEFAULT_MAX_RECORDS;
    const useFieldSelection = params.returnIdsOnly || params.selectedFields.length > 0;
    let searchRecords: Record<string, unknown>[];

    if (useFieldSelection) {
      const filters = {
        ...params.dynamicValues,
        ...coerceObjectValues(
          params.fieldValues,
          util.types.keyValPairListToObject(params.fieldValueTypes),
        ),
      };

      const soql = buildSOQLQuery({
        recordType: params.recordType,
        fields: params.selectedFields,
        filters,
        sortValue,
        maxRecords,
      });

      const sfClient = await createSalesforceClient(params.connection, sfVersion);
      searchRecords = await executeSOQLQuery(sfClient, soql);
    } else {
      const actionParams = {
        connection: params.connection,
        dynamicValues: params.dynamicValues,
        fetchAll: true,
        fieldValues: params.fieldValues,
        fieldValueTypes: params.fieldValueTypes,
        maxRecordsToFetch: maxRecords,
        pageNumber: undefined,
        pageSize: undefined,
        recordType: params.recordType,
        sort: sortValue,
        version: sfVersion,
        debug: true,
      };

      const { data } = await findRecords.perform(context, actionParams);
      searchRecords = data || [];
    }

    const lastPolledAt = new Date(pollState.lastPolledAt || pollingExecutionTime);

    let deletedRecords: DeletedRecord[] = [];
    if (params.showDeletedRecords && pollState.lastPolledAt) {
      const sfClient = await createSalesforceClient(params.connection, params.version || "62.0");
      const start = new Date(pollState.lastPolledAt).toISOString();
      const end = new Date(pollingExecutionTime).toISOString();

      const deletedResult = await sfClient.sobject(params.recordType).deleted(start, end);
      deletedRecords = (deletedResult.deletedRecords || []).map((record) => ({
        id: record.id,
        deletedDate: record.deletedDate,
        IsDeleted: true as const,
      }));
    }

    const { changes, changesObject } = getPollingChanges(
      params.showNewRecords,
      params.showUpdatedRecords,
      searchRecords as PollingTriggerObject[],
      lastPolledAt,
      deletedRecords,
    );

    context.polling.setState({ lastPolledAt: pollingExecutionTime });

    return {
      payload: { ...payload, body: { data: changesObject } },
      polledNoChanges: changes === 0,
    };
  },
});
