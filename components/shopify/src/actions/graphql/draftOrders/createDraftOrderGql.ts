import { action, outputSchema } from "@prismatic-io/spectral";
import { getShopifyGraphQlClient } from "../../../client";
import { createDraftOrderExamplePayload as examplePayload } from "../../../examplePayloads";
import { createDraftOrderInputs as inputs } from "../../../inputsGql";
import { createDraftOrderGqlOutputSchema } from "../../../outputSchemas";
import createDraftOrderQuery from "../queries/draftOrders/CreateDraftOrder.gql";
export const createDraftOrderGql = action({
  display: {
    label: "Create Draft Order",
    description: "Creates a new draft order.",
  },
  performSafety: "notAllowed",
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
    const client = getShopifyGraphQlClient(
      shopifyConnection,
      undefined,
      context.debug.enabled,
      context.logger,
    );
    const data: {
      draftOrderCreate: Record<string, unknown>;
    } = await client.request(createDraftOrderQuery, {
      input: {
        customerId: customerIdGql,
        lineItems,
        useCustomerDefaultAddress: useCustomerAddress,
        note,
        taxExempt,
        tags,
        ...additionalFields,
      },
    });
    return {
      data: data.draftOrderCreate,
    };
  },
  inputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: createDraftOrderGqlOutputSchema,
  }),
  examplePerform: async () => examplePayload,
  examplePayload,
});
