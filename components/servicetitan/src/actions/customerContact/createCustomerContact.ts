import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { createCustomerContactExamplePayload } from "../../examplePayloads";
import { createCustomerContactInputs } from "../../inputs";
import { createCustomerContactOutputSchema } from "../../outputSchemas";
export const createCustomerContact = action({
  display: {
    label: "Create Customer Contact",
    description: "Create a contact for a customer.",
  },
  inputs: createCustomerContactInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: createCustomerContactOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (context, { connection, customerId, memo, type, value }) => {
    const client = createClient(connection, "crm", context.debug.enabled);
    const { data } = await client.post(`/customers/${customerId}/contacts`, {
      memo,
      type,
      value,
    });
    return {
      data,
    };
  },
  examplePerform: async () => createCustomerContactExamplePayload,
  examplePayload: createCustomerContactExamplePayload,
});
