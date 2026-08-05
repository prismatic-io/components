import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { createCustomerExamplePayload as updateCustomerExamplePayload } from "../../examplePayloads";
import { updateCustomerInputs } from "../../inputs";
export const updateCustomer = action({
  display: {
    label: "Update Customer",
    description: "Update a customer",
  },
  inputs: updateCustomerInputs,
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
  examplePayload: updateCustomerExamplePayload,
});
