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
  perform: async (
    context,
    {
      version,
      recordType,
      dynamicValues,
      fieldValues,
      fieldValueTypes,
      pageSize,
      pageNumber,
      connection,
      sort,
      fetchAll,
      maxRecordsToFetch,
    },
  ) => {
    if (context.debug.enabled) {
      context.logger.debug("Payload", {
        version,
        recordType,
        dynamicValues,
        fieldValues,
        fieldValueTypes,
        pageSize,
        pageNumber,
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
      pageNumber,
      pageSize,
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
  examplePayload: findRecordsExamplePayload,
});
