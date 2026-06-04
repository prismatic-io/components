import { action } from "@prismatic-io/spectral";
import { getShopifyClient } from "../../client";
import { deleteMetafieldInputs } from "../../inputs";
import { deleteMetafieldExamplePayload } from "../../payloadExamples";

export const deleteMetafield = action({
  display: {
    label: "Delete Metafield",
    description: "Deletes an existing metafield.",
  },
  perform: async (context, params) => {
    const client = getShopifyClient(params.shopifyConnection, undefined, context.debug.enabled);
    const { headers, data } = await client.delete(`/metafields/${params.metaFieldId}`);
    return { data: { data, headers } };
  },
  examplePayload: { data: deleteMetafieldExamplePayload },
  inputs: deleteMetafieldInputs,
});
