import { action, outputSchema } from "@prismatic-io/spectral";
import { getShopConfigExamplePayload } from "../../examplePayloads";
import { getShopConfigInputs as inputs } from "../../inputs";
import { getShopConfigOutputSchema } from "../../outputSchemas";
import { getShopConfigGql } from "../graphql/shops/getShopConfigGql";

export const getShopConfig = action({
  display: {
    label: "Get Shop Configuration",
    description: "Retrieves the shop configuration.",
  },
  performSafety: "safe",
  perform: async (context, params) => {
    const { data } = await getShopConfigGql.perform(context, params);
    return { data };
  },
  examplePayload: getShopConfigExamplePayload.restMap,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getShopConfigOutputSchema,
  }),
  inputs,
});
