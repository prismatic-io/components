import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getProductTypeResponse } from "../../examplePayloads";
import { connectionInput, id } from "../../inputs";

export const getProductType = action({
  display: {
    label: "Get Product Type",
    description: "Retrieve a single product type",
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
    const { data } = await client.get(`/product_types/${id}`);
    return { data };
  },
  examplePayload: {
    data: getProductTypeResponse,
  },
});
