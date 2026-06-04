import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { updateProductExamplePayload } from "../../examplePayloads";
import {
  barcode,
  connectionInput,
  gtin,
  name,
  productId,
  shipbob_channel_id,
  sku,
  unit_price,
  upc,
  version,
} from "../../inputs";
import { generatePayload } from "../util";

export const updateProduct = action({
  display: {
    label: "Update Product",
    description: "Update information on a single Product",
  },
  perform: async (
    context,
    { connection, version, productId, shipbob_channel_id, ...inputs },
  ) => {
    const client = createClient(connection, version, context.debug.enabled);
    const headers = generatePayload({ shipbob_channel_id });
    const body = generatePayload(inputs);
    const { data } = await client.put(`/product/${productId}`, body, {
      headers,
    });
    return { data };
  },
  inputs: {
    connection: connectionInput,
    version,
    productId,
    shipbob_channel_id: { ...shipbob_channel_id, required: true },
    name,
    sku,
    barcode,
    gtin,
    upc,
    unit_price,
  },
  examplePayload: updateProductExamplePayload,
});
