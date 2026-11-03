import { action, outputSchema, PerformSafety } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { deleteListingsItemExamplePayload } from "../../examplePayloads/catalog";
import { deleteListingsItemInputs } from "../../inputs";
import { deleteListingsItemOutputSchema } from "../../outputSchemas";

export const deleteListingsItem = action({
  display: {
    label: "Delete Listings Item",
    description: "Deletes a listings item for a selling partner.",
  },
  examplePayload: deleteListingsItemExamplePayload,
  inputs: deleteListingsItemInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: deleteListingsItemOutputSchema,
  }),
  performSafety: PerformSafety.NOT_ALLOWED,
  perform: async (
    context,
    { connectionInput, sellerId, sku, marketplaceIds, issueLocale },
  ) => {
    const client = createClient(connectionInput, context.debug.enabled);
    const { data } = await client.delete(
      `/listings/2021-08-01/items/${sellerId}/${sku}`,
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
  examplePerform: async () => deleteListingsItemExamplePayload,
});
