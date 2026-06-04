import { action } from "@prismatic-io/spectral";
import { countProductsInputs } from "../../inputs";
import { countProductsExamplePayload } from "../../payloadExamples";
import { countProductsGql } from "../graphql/products/countProducts";

export const countProducts = action({
  display: {
    label: "Count Products",
    description: "Returns a count of all products.",
  },
  perform: async (context, params) => {
    const { data } = await countProductsGql.perform(context, params);

    return {
      data,
    };
  },
  inputs: countProductsInputs,
  examplePayload: {
    data: countProductsExamplePayload,
  },
});
