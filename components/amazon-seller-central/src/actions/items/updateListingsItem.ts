import { action, outputSchema, PerformSafety } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { updateListingsItemExamplePayload } from "../../examplePayloads/catalog";
import { updateListingsItemInputs } from "../../inputs";
import { updateListingsItemOutputSchema } from "../../outputSchemas";

export const updateListingsItem = action({
  display: {
    label: "Update Listings Item",
    description:
      "Partially updates (patches) a listings item for a selling partner.",
  },
  examplePayload: updateListingsItemExamplePayload,
  inputs: updateListingsItemInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: updateListingsItemOutputSchema,
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
      issueLocale,
      patches,
    },
  ) => {
    const client = createClient(connectionInput, context.debug.enabled);
    const { data } = await client.patch(
      `/listings/2021-08-01/items/${sellerId}/${sku}`,
      {
        productType: productType || undefined,
        patches: patches || undefined,
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
  examplePerform: async () => updateListingsItemExamplePayload,
});
