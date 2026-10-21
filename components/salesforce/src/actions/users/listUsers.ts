import { action } from "@prismatic-io/spectral";
import { createSalesforceClient } from "../../client";
import { listUsersInputs } from "../../inputs";
import { listUsersExamplePayload } from "../../examplePayloads";
import { executeSFAction, getFindQuery } from "../../util";
export const listUsers = action({
  display: {
    label: "List Users",
    description: "List all user records.",
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
      recordType: "User",
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
  }> => listUsersExamplePayload,
  inputs: listUsersInputs,
  examplePayload: listUsersExamplePayload as unknown,
});
