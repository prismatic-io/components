import { action } from "@prismatic-io/spectral";
import { getShopifyClient } from "../../client";
import { deleteCollectInputs } from "../../inputs";
import { deleteCollectExamplePayload } from "../../payloadExamples";

export const deleteCollect = action({
  display: {
    label: "Delete Collect (Deprecated)",
    description: "Delete the information and metadata of a collect.",
  },
  perform: async (context, params) => {
    const client = getShopifyClient(params.shopifyConnection, undefined, context.debug.enabled);
    const { headers, data } = await client.delete(`/collects/${params.collectId}.json`);
    return { data: { data, headers } };
  },
  inputs: deleteCollectInputs,
  examplePayload: { data: deleteCollectExamplePayload },
});
