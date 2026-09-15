import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { updateCustomerContactExamplePayload } from "../../examplePayloads";
import { updateCustomerContactInputs } from "../../inputs";
import { updateCustomerContactOutputSchema } from "../../outputSchemas";
export const updateCustomerContact = action({
  display: {
    label: "Update Customer Contact",
    description: "Updates a contact on a customer.",
  },
  inputs: updateCustomerContactInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: updateCustomerContactOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, customerId, memo, type, value, customerContactId },
  ) => {
    const client = createClient(connection, "crm", context.debug.enabled);
    const { data } = await client.patch(
      `/customers/${customerId}/contacts/${customerContactId}`,
      {
        memo,
        type,
        value,
      },
    );
    return {
      data,
    };
  },
  examplePerform: async () => updateCustomerContactExamplePayload,
  examplePayload: updateCustomerContactExamplePayload,
});
