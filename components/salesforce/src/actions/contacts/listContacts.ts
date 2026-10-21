import { action } from "@prismatic-io/spectral";
import { createSalesforceClient } from "../../client";
import { listContactsInputs } from "../../inputs";
import { executeSFAction, getFindQuery } from "../../util";
import { listContactsExamplePayload } from "../../examplePayloads";
export const listContacts = action({
  display: {
    label: "List Contacts",
    description: "List all contact records.",
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
      recordType: "Contact",
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
  }> => listContactsExamplePayload,
  inputs: listContactsInputs,
  examplePayload: listContactsExamplePayload as unknown,
});
