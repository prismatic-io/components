import { action } from "@prismatic-io/spectral";
import { getShopifyClient } from "../../client";
import { getMetafieldInputs } from "../../inputs";
import { getMetafieldsExamplePayload } from "../../payloadExamples";

export const getMetafield = action({
  display: {
    label: "Get Metafield",
    description: "Retrieves a metafield by ID.",
  },
  perform: async (context, params) => {
    const client = getShopifyClient(params.shopifyConnection, undefined, context.debug.enabled);
    const { headers, data } = await client.get(`/metafields/${params.metaFieldId}`);
    return { data: { data, headers } };
  },
  examplePayload: { data: getMetafieldsExamplePayload },
  inputs: getMetafieldInputs,
});
