import { action } from "@prismatic-io/spectral";
import { createSalesforceClient } from "../../client";
import { getCustomerInputs } from "../../inputs";
import { getCustomerExamplePayload } from "../../examplePayloads";

export const getCustomer = action({
  display: {
    label: "Get Customer",
    description: "Retrieve a customer record by ID.",
  },
  perform: async (_context, { version, recordId, connection }) => {
    const salesforceClient = await createSalesforceClient(connection, version);
    const response = await salesforceClient.sobject("Customer").retrieve(recordId);

    return {
      data: response,
    };
  },
  inputs: getCustomerInputs,
  examplePayload: getCustomerExamplePayload as unknown,
});
