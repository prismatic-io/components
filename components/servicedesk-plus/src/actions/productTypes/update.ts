import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getProductTypeResponse as updateProductTypeResponse } from "../../examplePayloads";
import {
  assetType,
  attributes,
  category,
  connectionInput,
  id,
  name,
} from "../../inputs";
import { createPayload } from "../../util";

export const updateProductType = action({
  display: {
    label: "Update Product Type",
    description: "Updates an existing product type",
  },
  inputs: {
    id: {
      ...id,
      required: true,
    },
    name,
    category,
    assetType,
    attributes,
    connectionInput,
  },
  perform: async (
    context,
    { connectionInput, id, attributes, name, assetType, category },
  ) => {
    const client = createClient(connectionInput, context.debug.enabled);
    const payload = createPayload({
      product_type: {
        name,
        type: assetType,
        category,
        ...attributes,
      },
    });
    const { data } = await client.put(`/product_types/${id}`, payload);
    return { data };
  },
  examplePayload: {
    data: updateProductTypeResponse,
  },
});
