import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getProductResponse as createProductResponse } from "../../examplePayloads";
import {
  attributes,
  connectionInput,
  id,
  isLaptop,
  manufacturer,
  name,
  partNo,
  productType,
} from "../../inputs";
import { createPayload } from "../../util";

export const createProduct = action({
  display: {
    label: "Create Product",
    description: "Create a new product",
  },
  inputs: {
    productType: {
      ...productType,
      required: true,
    },
    name: {
      ...name,
      required: true,
    },
    id,
    manufacturer,
    isLaptop,
    partNo,
    attributes,
    connectionInput,
  },
  perform: async (
    context,
    {
      connectionInput,
      id,
      attributes,
      name,
      productType,
      isLaptop,
      manufacturer,
      partNo,
    },
  ) => {
    const client = createClient(connectionInput, context.debug.enabled);
    const payload = createPayload({
      product: {
        id,
        name,
        product_type: productType,
        is_laptop: isLaptop,
        manufacturer,
        parto_no: partNo,
        ...attributes,
      },
    });
    const { data } = await client.post(`/products`, payload);
    return { data };
  },
  examplePayload: {
    data: createProductResponse,
  },
});
