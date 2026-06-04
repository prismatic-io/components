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
  perform: async (
    context,
    {
      version,
      connection,
      fetchAll,
      maxRecordsToFetch,
      pageNumber,
      pageSize,
      sort,
      dynamicValues,
      fieldValueTypes,
      fieldValues,
    },
  ) => {
    if (context.debug.enabled) {
      context.logger.debug({
        version,
        fetchAll,
        maxRecordsToFetch,
        pageNumber,
        pageSize,
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
      pageNumber,
      pageSize,
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
  inputs: listOpportunitiesInputs,
  examplePayload: listOpportunitiesExamplePayload as unknown,
});
