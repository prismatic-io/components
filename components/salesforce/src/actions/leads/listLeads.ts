import { action } from "@prismatic-io/spectral";
import { createSalesforceClient } from "../../client";
import { listLeadsInputs } from "../../inputs";
import { executeSFAction, getFindQuery } from "../../util";
import { listLeadsExamplePayload } from "../../examplePayloads";

export const listLeads = action({
  display: {
    label: "List Leads",
    description: "List all lead records.",
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
      recordType: "Lead",
      salesforceClient,
      sortValue,
    });
    const command = query.execute();
    const response = await executeSFAction(context, command);
    return {
      data: response,
    };
  },
  inputs: listLeadsInputs,
  examplePayload: listLeadsExamplePayload as unknown,
});
