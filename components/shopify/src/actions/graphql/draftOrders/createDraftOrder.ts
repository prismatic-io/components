import { action } from "@prismatic-io/spectral";
import { getShopifyGraphQlClient } from "../../../client";
import { createDraftOrderExamplePayload as examplePayload } from "../../../examplePayloads";
import { createDraftOrderInputs as inputs } from "../../../inputsGql";
import createDraftOrderQuery from "../queries/draftOrders/CreateDraftOrder.gql";

export const createDraftOrderGql = action({
  display: {
    label: "Create Draft Order",
    description: "Creates a new draft order.",
  },
  perform: async (
    context,
    {
      shopifyConnection,
      customerIdGql,
      lineItems,
      useCustomerAddress,
      note,
      taxExempt,
      tags,
      additionalFields,
    },
  ) => {
    const client = getShopifyGraphQlClient(shopifyConnection, undefined, context.debug.enabled);

    const data: { draftOrderCreate: Record<string, unknown> } = await client.request(
      createDraftOrderQuery,
      {
        input: {
          customerId: customerIdGql,
          lineItems,
          useCustomerDefaultAddress: useCustomerAddress,
          note,
          taxExempt,
          tags,
          ...additionalFields,
        },
      },
    );

    return {
      data: data.draftOrderCreate,
    };
  },
  inputs,
  examplePayload,
});
