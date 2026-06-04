import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getProductResponse as updateProductResponse } from "../../examplePayloads";
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

export const updateProduct = action({
  display: {
    label: "Update Product",
    description: "Updates an existing product",
  },
  inputs: {
    id: {
      ...id,
      required: true,
    },
    productType,
    name,
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
        name,
        product_type: productType,
        is_laptop: isLaptop,
        manufacturer,
        parto_no: partNo,
        ...attributes,
      },
    });
    const { data } = await client.put(`/products/${id}`, payload);
    return { data };
  },
  examplePayload: {
    data: updateProductResponse,
  },
});
