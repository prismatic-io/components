import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { deleteResponse as deleteProductTypeResponse } from "../../examplePayloads";
import { connectionInput, id } from "../../inputs";

export const deleteProductType = action({
  display: {
    label: "Delete Product Type",
    description: "Delete a single product type",
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
    const { data } = await client.delete(`/product_types/${id}`);
    return { data };
  },
  examplePayload: {
    data: deleteProductTypeResponse,
  },
});
