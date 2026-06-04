import { action, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { getClient } from "../client";
import { createProductsExamplePayload } from "../examplePayloads";
import { validateJSON } from "../helpers";
import { connectionInput, product } from "../inputs";

export const createProducts = action({
  display: {
    label: "Create Products",
    description: "Create a new Product",
  },
  perform: async (context, { connection, product }) => {
    const client = await getClient(connection, context.debug.enabled);

    if (!validateJSON(product)) {
      throw new Error("Product must be valid JSON.");
    }

    try {
      const { data } = await client.post("/products", product);
      return { data };
    } catch (error) {
      const handled = handleErrors(error);
      const serialized = util.types.toJSON(handled);
      throw new Error(serialized);
    }
  },
  inputs: {
    connection: connectionInput,
    product,
  },
  examplePayload: createProductsExamplePayload,
});

export default { createProducts };
