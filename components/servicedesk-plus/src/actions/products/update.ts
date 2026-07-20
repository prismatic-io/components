import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getProductResponse as updateProductResponse } from "../../examplePayloads";
import {
  attributes,
  connectionInput,
  id,
  name,
  productDetails,
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
    productDetails,
    attributes,
    connectionInput,
  },
  perform: async (
    context,
    { connectionInput, id, attributes, name, productType, productDetails },
  ) => {
    const client = createClient(connectionInput, context.debug.enabled);
    const payload = createPayload({
      product: {
        name,
        product_type: productType,
        is_laptop: productDetails.isLaptop,
        manufacturer: productDetails.manufacturer,
        parto_no: productDetails.partNo,
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
