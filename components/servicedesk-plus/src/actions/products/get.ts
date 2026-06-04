import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getProductResponse } from "../../examplePayloads";
import { connectionInput, id } from "../../inputs";

export const getProduct = action({
  display: {
    label: "Get Product",
    description: "Retrieve a single product",
  },
  inputs: {
    id: {
      ...id,
      required: true,
    },
    connectionInput,
  },
  perform: async (context, { connectionInput, id }) => {
    const client = createClient(connectionInput, context.debug.enabled);
    const { data } = await client.get(`/products/${id}`);
    return { data };
  },
  examplePayload: {
    data: getProductResponse,
  },
});
