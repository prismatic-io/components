import { action } from "@prismatic-io/spectral";
import { createSalesforceClient } from "../../client";
import { deleteCustomerInputs } from "../../inputs";
import { genericCreateUpdateFullNameExamplePayload } from "../../examplePayloads";
import { executeSFAction } from "../../util";

export const deleteCustomer = action({
  display: {
    label: "Delete Customer",
    description: "Delete an existing customer record.",
  },
  perform: async (context, { version, recordId, connection }) => {
    const salesforceClient = await createSalesforceClient(connection, version);
    const command = salesforceClient.sobject("Customer").retrieve(recordId);
    const response = await executeSFAction(context, command);

    return {
      data: response,
    };
  },
  inputs: deleteCustomerInputs,
  examplePayload: genericCreateUpdateFullNameExamplePayload,
});
