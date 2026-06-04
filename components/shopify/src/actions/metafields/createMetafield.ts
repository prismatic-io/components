import { action, util } from "@prismatic-io/spectral";
import { getShopifyClient } from "../../client";
import { createMetafieldInputs } from "../../inputs";
import { createMetafieldExamplePayload } from "../../payloadExamples";
import { validateMetafieldType } from "../../util";

export const createMetafield = action({
  display: { label: "Create Metafield", description: "Creates a new metafield." },
  perform: async (context, params) => {
    const client = getShopifyClient(params.shopifyConnection, undefined, context.debug.enabled);
    const { headers, data } = await client.post("/metafields", {
      metafield: {
        namespace: util.types.toString(params.namespace),
        key: util.types.toString(params.key),
        value: validateMetafieldType(params.value, util.types.toString(params.type)),
        description: util.types.toString(params.description) || undefined,
        type: util.types.toString(params.type),
      },
    });
    return { data: { data, headers } };
  },
  examplePayload: { data: createMetafieldExamplePayload },
  inputs: createMetafieldInputs,
});
