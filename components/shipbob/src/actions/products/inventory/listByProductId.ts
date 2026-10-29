import { action } from "@prismatic-io/spectral";
import { createClient } from "../../../client";
import { listByProductIdExamplePayload } from "../../../examplePayloads";
import {
  connectionInput,
  productId,
  shipbob_channel_id,
  version,
} from "../../../inputs";
import { generatePayload } from "../../util";

export const listByProductId = action({
  display: {
    label: "Get a list of Inventory Items by Product ID",
    description: "Retrieve a list of Inventory Items by their Product ID",
  },
  perform: async (
    context,
    { connection, version, shipbob_channel_id, productId },
  ) => {
    const client = createClient(connection, version, context.debug.enabled);
    const headers = generatePayload({ shipbob_channel_id });
    const { data } = await client.get(`/product/${productId}/inventory`, {
      headers,
    });
    return { data };
  },
  inputs: {
    connection: connectionInput,
    version,
    shipbob_channel_id,
    productId,
  },
  examplePayload: listByProductIdExamplePayload,
});
