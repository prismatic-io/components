import { action, util } from "@prismatic-io/spectral";
import { getShopifyClient } from "../../client";
import { updateMetafieldInputs } from "../../inputs";
import { updateMetafieldExamplePayload } from "../../payloadExamples";
import { validateMetafieldType } from "../../util";

export const updateMetafield = action({
  display: {
    label: "Update Metafield",
    description: "Updates an existing metafield.",
  },
  perform: async (context, params) => {
    const client = getShopifyClient(params.shopifyConnection, undefined, context.debug.enabled);

    const { headers, data } = await client.put(`/metafields/${params.metaFieldId}`, {
      metafield: {
        value: validateMetafieldType(params.value, util.types.toString(params.type)) || undefined,
        description: util.types.toString(params.description) || undefined,
        type: util.types.toString(params.type) || undefined,
      },
    });

    return {
      data: { data, headers },
    };
  },
  examplePayload: {
    data: updateMetafieldExamplePayload,
  },
  inputs: updateMetafieldInputs,
});
