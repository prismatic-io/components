import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { createCustomerExamplePayload } from "../../examplePayloads";
import { createCustomerInputs } from "../../inputs";
export const createCustomer = action({
  display: {
    label: "Create Customer",
    description: "Create a New Customer",
  },
  inputs: createCustomerInputs,
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
  examplePayload: createCustomerExamplePayload,
});
