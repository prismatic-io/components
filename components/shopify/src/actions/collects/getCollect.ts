import { action } from "@prismatic-io/spectral";
import { getShopifyClient } from "../../client";
import { getCollectInputs } from "../../inputs";
import { getCollectExamplePayload } from "../../payloadExamples";

export const getCollect = action({
  display: {
    label: "Get Collect (Deprecated)",
    description: "Get the information and metadata of a collect.",
  },
  perform: async (context, params) => {
    const client = getShopifyClient(params.shopifyConnection, undefined, context.debug.enabled);
    const { headers, data } = await client.get(`/collects/${params.collectId}`);
    return { data: { data, headers } };
  },
  inputs: getCollectInputs,
  examplePayload: { data: getCollectExamplePayload },
});
