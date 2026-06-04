import { action } from "@prismatic-io/spectral";
import { getShopifyClient } from "../../client";
import { connectionInput } from "../../inputs";
import { listCurrenciesExamplePayload } from "../../payloadExamples";

export const listCurrencies = action({
  display: {
    label: "List Currencies (Deprecated)",
    description:
      "List all currencies enabled on your platform. This version of the action is being deprecated. Please replace action with List Currencies.",
  },
  perform: async (context, params) => {
    const client = getShopifyClient(params.shopifyConnection, undefined, context.debug.enabled);
    const { data } = await client.get("/currencies");

    return {
      data: { data },
    };
  },
  inputs: {
    shopifyConnection: connectionInput,
  },
  examplePayload: {
    data: listCurrenciesExamplePayload,
  },
});
