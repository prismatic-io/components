import { action } from "@prismatic-io/spectral";
import { getShopifyGraphQlClient } from "../../../client";
import { updateCustomerExamplePayload as examplePayload } from "../../../examplePayloads";
import { updateCustomerInputs as inputs } from "../../../inputsGql";

import updateCustomerQuery from "../queries/customers/UpdateCustomer.gql";

export const updateCustomerGql = action({
  display: {
    label: "Update Customer",
    description: "Updates an existing customer by ID.",
  },
  perform: async (
    context,
    {
      customerIdGql,
      shopifyConnection,
      firstName,
      lastName,
      email,
      addressListGql,
      phone,
      notes,
      additionalFields,
      tags,
      taxExempt,
      metafields,
    },
  ) => {
    const client = getShopifyGraphQlClient(shopifyConnection, undefined, context.debug.enabled);

    const data: { customerUpdate: Record<string, unknown> } = await client.request(
      updateCustomerQuery,
      {
        input: {
          id: customerIdGql,
          email,
          phone,
          firstName,
          lastName,
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
  examplePayload,
});
