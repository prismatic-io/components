import { action, outputSchema } from "@prismatic-io/spectral";
import { deleteRecordOutputSchema } from "../../outputSchemas";
import { createSalesforceClient } from "../../client";
import { deleteCustomerInputs } from "../../inputs";
import { deleteCustomerExamplePayload } from "../../examplePayloads";
import { executeSFAction } from "../../util";

export const deleteCustomer = action({
  display: {
    label: "Delete Customer",
    description: "Delete an existing customer record.",
  },
  performSafety: "notAllowed",
  perform: async (context, { version, recordId, connection }) => {
    const salesforceClient = await createSalesforceClient(connection, version);
    const command = salesforceClient.sobject("Customer").delete(recordId);
    const response = await executeSFAction(context, command);

    return {
      data: response,
    };
  },
  examplePerform: async (): Promise<{ data: unknown }> =>
    deleteCustomerExamplePayload,
  inputs: deleteCustomerInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: deleteRecordOutputSchema,
  }),
  examplePayload: deleteCustomerExamplePayload,
});
