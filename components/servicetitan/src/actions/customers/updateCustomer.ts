import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { updateCustomerExamplePayload } from "../../examplePayloads";
import { updateCustomerInputs } from "../../inputs";
import { updateCustomerOutputSchema } from "../../outputSchemas";
export const updateCustomer = action({
  display: {
    label: "Update Customer",
    description: "Update a customer.",
  },
  inputs: updateCustomerInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: updateCustomerOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      connection,
      active,
      address,
      customFields,
      customerId,
      doNotMail,
      doNotService,
      externalData,
      name,
      tagTypeIds,
      type,
    },
  ) => {
    const client = createClient(connection, "crm", context.debug.enabled);
    const { data } = await client.patch(`/customers/${customerId}`, {
      active,
      address,
      customFields,
      doNotMail,
      doNotService,
      externalData,
      name,
      tagTypeIds,
      type,
    });
    return {
      data,
    };
  },
  examplePerform: async () => updateCustomerExamplePayload,
  examplePayload: updateCustomerExamplePayload,
});
