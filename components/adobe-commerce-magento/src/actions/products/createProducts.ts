import { action } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { ENDPOINTS } from "../../constants";
import { createProductsExamplePayload } from "../../examplePayloads";
import { createProductsInputs } from "../../inputs";
import { asJsonObject } from "../../utils";
export const createProducts = action({
  display: {
    label: "Create Products",
    description: "Create a new Product",
  },
  performSafety: "notAllowed",
  examplePerform: async () => createProductsExamplePayload,
  perform: async (context, { connection, product }) => {
    const client = await getClient(connection, context.debug.enabled);
    const body = asJsonObject(product, "Product");
    const { data } = await client.post(ENDPOINTS.products, body);
    return { data };
  },
  inputs: createProductsInputs,
  examplePayload: createProductsExamplePayload,
});
