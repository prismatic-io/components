import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getProductExamplePayload } from "../../examplePayloads";
import {
  connectionInput,
  productId,
  shipbob_channel_id,
  version,
} from "../../inputs";
import { generatePayload } from "../util";

export const getProduct = action({
  display: {
    label: "Get Single Product",
    description: "Retrieve a single product by Product ID",
  },
  perform: async (
    context,
    { connection, version, productId, shipbob_channel_id },
  ) => {
    const client = createClient(connection, version, context.debug.enabled);
    const headers = generatePayload({ shipbob_channel_id });
    const { data } = await client.get(`/product/${productId}`, {
      headers,
    });
    return { data };
  },
  inputs: {
    connection: connectionInput,
    version,
    productId,
    shipbob_channel_id,
  },
  examplePayload: getProductExamplePayload,
});
