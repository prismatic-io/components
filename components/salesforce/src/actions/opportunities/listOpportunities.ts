import { action } from "@prismatic-io/spectral";
import { createSalesforceClient } from "../../client";
import { listOpportunitiesInputs } from "../../inputs";
import { listOpportunitiesExamplePayload } from "../../examplePayloads";
import { executeSFAction, getFindQuery } from "../../util";

export const listOpportunities = action({
  display: {
    label: "List Opportunities",
    description: "List all opportunity records.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      version,
      connection,
      fetchAll,
      pagination = {},
      sort,
      dynamicValues,
      fieldValueTypes,
      fieldValues,
    },
  ) => {
    const maxRecordsToFetch = pagination.maxRecordsToFetch;

    if (context.debug.enabled) {
      context.logger.debug({
        version,
        fetchAll,
        maxRecordsToFetch,
        pageNumber: pagination.pageNumber,
        pageSize: pagination.pageSize,
        sort,
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
      recordType: "Opportunity",
      salesforceClient,
      sortValue,
    });
    const command = query.execute();
    const response = await executeSFAction(context, command);
    return {
      data: response,
    };
  },
  examplePerform: async (): Promise<{ data: unknown }> =>
    listOpportunitiesExamplePayload,
  inputs: listOpportunitiesInputs,
  examplePayload: listOpportunitiesExamplePayload as unknown,
});
