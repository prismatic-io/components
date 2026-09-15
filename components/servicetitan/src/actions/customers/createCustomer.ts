import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { createCustomerExamplePayload } from "../../examplePayloads";
import { createCustomerInputs } from "../../inputs";
import { createCustomerOutputSchema } from "../../outputSchemas";
export const createCustomer = action({
  display: {
    label: "Create Customer",
    description: "Create a new customer.",
  },
  inputs: createCustomerInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: createCustomerOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      connection,
      address,
      contacts,
      customFields,
      doNotMail,
      doNotService,
      externalData,
      locations,
      name,
      tagTypeIds,
      type,
    },
  ) => {
    const client = createClient(connection, "crm", context.debug.enabled);
    const { data } = await client.post(`/customers`, {
      address,
      contacts,
      customFields,
      doNotMail,
      doNotService,
      externalData,
      locations,
      name,
      tagTypeIds,
      type,
    });
    return {
      data,
    };
  },
  examplePerform: async () => createCustomerExamplePayload,
  examplePayload: createCustomerExamplePayload,
});
