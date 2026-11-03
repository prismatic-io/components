import { action, outputSchema, PerformSafety } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { createListingsItemExamplePayload } from "../../examplePayloads/catalog";
import { createListingsItemInputs } from "../../inputs";
import { createListingsItemOutputSchema } from "../../outputSchemas";

export const createListingsItem = action({
  display: {
    label: "Create Listings Item",
    description:
      "Creates a new or fully-updates an existing listings item for a selling partner.",
  },
  examplePayload: createListingsItemExamplePayload,
  inputs: createListingsItemInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: createListingsItemOutputSchema,
  }),
  performSafety: PerformSafety.NOT_ALLOWED,
  perform: async (
    context,
    {
      connectionInput,
      sellerId,
      sku,
      marketplaceIds,
      productType,
      requirements,
      attributes,
      issueLocale,
    },
  ) => {
    const client = createClient(connectionInput, context.debug.enabled);
    const { data } = await client.put(
      `/listings/2021-08-01/items/${sellerId}/${sku}`,
      {
        productType: productType || undefined,
        requirements: requirements || undefined,
        attributes: attributes || undefined,
      },
      {
        params: {
          marketplaceIds: marketplaceIds || undefined,
          issueLocale: issueLocale || undefined,
        },
      },
    );
    return {
      data,
    };
  },
  examplePerform: async () => createListingsItemExamplePayload,
});
