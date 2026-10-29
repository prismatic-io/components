import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getProductTypeResponse as createProductTypeResponse } from "../../examplePayloads";
import {
  assetType,
  attributes,
  category,
  connectionInput,
  id,
  name,
} from "../../inputs";
import { createPayload } from "../../util";

export const createProductType = action({
  display: {
    label: "Create Product Type",
    description: "Create a new product type",
  },
  inputs: {
    name: {
      ...name,
      required: true,
    },
    category: {
      ...category,
      required: true,
    },
    assetType: {
      ...assetType,
      required: true,
    },
    id,
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
        id,
        name,
        type: assetType,
        category,
        ...attributes,
      },
    });
    const { data } = await client.post(`/product_types`, payload);
    return { data };
  },
  examplePayload: {
    data: createProductTypeResponse,
  },
});
