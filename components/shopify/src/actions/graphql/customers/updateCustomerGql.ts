import { action, outputSchema } from "@prismatic-io/spectral";
import { getShopifyGraphQlClient } from "../../../client";
import { updateCustomerGqlExamplePayload as examplePayload } from "../../../examplePayloads";
import { updateCustomerInputs as inputs } from "../../../inputsGql";
import { updateCustomerGqlOutputSchema } from "../../../outputSchemas";

import updateCustomerQuery from "../queries/customers/UpdateCustomer.gql";

export const updateCustomerGql = action({
  display: {
    label: "Update Customer",
    description: "Updates an existing customer by ID.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      customerIdGql,
      shopifyConnection,
      contactInfo = {},
      addressListGql,
      notes,
      additionalFields,
      tags,
      taxExempt,
      metafields,
    },
  ) => {
    const client = getShopifyGraphQlClient(
      shopifyConnection,
      undefined,
      context.debug.enabled,
      context.logger,
    );

    const data: { customerUpdate: Record<string, unknown> } = await client.request(
      updateCustomerQuery,
      {
        input: {
          id: customerIdGql,
          email: contactInfo.email,
          phone: contactInfo.phone,
          firstName: contactInfo.firstName,
          lastName: contactInfo.lastName,
          note: notes,
          addresses: addressListGql,
          tags,
          taxExempt,
          metafields,
          ...additionalFields,
        },
      },
    );

    return {
      data: data.customerUpdate,
    };
  },
  inputs,
  outputSchema: outputSchema({ type: "actionOutput", schema: updateCustomerGqlOutputSchema }),
  examplePerform: async () => examplePayload,
  examplePayload,
});
