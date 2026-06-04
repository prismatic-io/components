import { action } from "@prismatic-io/spectral";
import { connectionInput } from "../../inputs";
import { getShopConfigExamplePayload } from "../../payloadExamples";
import { getShopConfigGql } from "../graphql/shops/getShopConfig";

export const getShopConfig = action({
  display: {
    label: "Get Shop Configuration",
    description: "Retrieves the shop configuration.",
  },
  perform: async (context, params) => {
    const { data } = await getShopConfigGql.perform(context, params);
    return { data };
  },
  examplePayload: {
    data: getShopConfigExamplePayload,
  },
  inputs: { shopifyConnection: connectionInput },
});
