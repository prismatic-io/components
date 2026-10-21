import { action } from "@prismatic-io/spectral";
import { createSalesforceClient } from "../../client";
import { findRecordsInputs } from "../../inputs";
import { findRecordsExamplePayload } from "../../examplePayloads";
import { executeSFAction, getFindQuery } from "../../util";
export const findRecords = action({
  display: {
    label: "Find Records",
    description: "Find and fetch Salesforce records.",
  },
  inputs: findRecordsInputs,
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      version,
      recordType,
      dynamicValues,
      fieldValues,
      fieldValueTypes,
      pagination = {},
      connection,
      sort,
      fetchAll,
    },
  ) => {
    const maxRecordsToFetch = pagination.maxRecordsToFetch;
    if (context.debug.enabled) {
      context.logger.debug("Payload", {
        version,
        recordType,
        dynamicValues,
        fieldValues,
        fieldValueTypes,
        pageSize: pagination.pageSize,
        pageNumber: pagination.pageNumber,
        sort,
        fetchAll,
        maxRecordsToFetch,
      });
    }
    const salesforceClient = await createSalesforceClient(connection, version);
    const sortValue = sort || "-CreatedDate Name";
    const query = getFindQuery({
      dynamicValues,
      fetchAll,
      fieldValues,
      fieldValueTypes,
      maxRecordsToFetch,
      pageNumber: pagination.pageNumber,
      pageSize: pagination.pageSize,
      recordType,
      salesforceClient,
      sortValue,
    });
    const command = query.execute();
    const response = await executeSFAction(context, command);
    return {
      data: response,
    };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => findRecordsExamplePayload,
  examplePayload: findRecordsExamplePayload,
});
