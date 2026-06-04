import { action } from "@prismatic-io/spectral";
import { createSalesforceClient } from "../../client";
import { listCustomersInputs } from "../../inputs";
import { listCustomersExamplePayload } from "../../examplePayloads";
import { executeSFAction, getFindQuery } from "../../util";

export const listCustomers = action({
  display: {
    label: "List Customers",
    description: "List all customer records.",
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
      recordType: "Customer",
      salesforceClient,
      sortValue,
    });
    const command = query.execute();
    const response = await executeSFAction(context, command);
    return {
      data: response,
    };
  },
  inputs: listCustomersInputs,
  examplePayload: listCustomersExamplePayload as unknown,
});
