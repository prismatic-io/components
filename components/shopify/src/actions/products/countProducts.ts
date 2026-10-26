import { action, outputSchema } from "@prismatic-io/spectral";
import { countProductsPayload } from "../../examplePayloads";
import { countProductsInputs } from "../../inputs";
import { countProductsOutputSchema } from "../../outputSchemas";
import { countProductsGql } from "../graphql/products/countProductsGql";
export const countProducts = action({
  display: {
    label: "Count Products",
    description: "Returns a count of all products.",
  },
  performSafety: "safe",
  perform: async (context, params) => {
    const { data } = await countProductsGql.perform(context, params);
    return {
      data,
    };
  },
  inputs: countProductsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: countProductsOutputSchema,
  }),
  examplePayload: countProductsPayload,
});
