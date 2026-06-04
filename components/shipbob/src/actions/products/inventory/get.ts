import { action } from "@prismatic-io/spectral";
import { createClient } from "../../../client";
import { getInventoryItemExamplePayload } from "../../../examplePayloads";
import {
  connectionInput,
  inventoryId,
  shipbob_channel_id,
  version,
} from "../../../inputs";
import { generatePayload } from "../../util";

export const getInventoryItem = action({
  display: {
    label: "Get Inventory Item",
    description: "Get single inventory item by Inventory ID",
  },
  perform: async (
    context,
    { connection, version, inventoryId, shipbob_channel_id },
  ) => {
    const client = createClient(connection, version, context.debug.enabled);
    const headers = generatePayload({ shipbob_channel_id });
    const { data } = await client.get(`/inventory/${inventoryId}`, {
      headers,
    });
    return { data };
  },
  inputs: {
    connection: connectionInput,
    version,
    inventoryId,
    shipbob_channel_id,
  },
  examplePayload: getInventoryItemExamplePayload,
});
