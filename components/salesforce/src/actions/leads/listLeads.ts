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
  examplePerform: async (): Promise<{
    data: unknown;
  }> => listLeadsExamplePayload,
  inputs: listLeadsInputs,
  examplePayload: listLeadsExamplePayload as unknown,
});
