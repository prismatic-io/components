import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { deleteResponse as deleteProductResponse } from "../../examplePayloads";
import { connectionInput, id } from "../../inputs";

export const deleteProduct = action({
  display: {
    label: "Delete Product",
    description: "Delete a single product",
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
    const { data } = await client.delete(`/products/${id}`);
    return { data };
  },
  examplePayload: {
    data: deleteProductResponse,
  },
});
