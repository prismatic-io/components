import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getWarehouseReceivingOrdersExamplePayload } from "../../examplePayloads";
import { connectionInput, receivingId, version } from "../../inputs";

export const getWarehouseReceivingOrders = action({
  display: {
    label: "Get Warehouse Receiving Orders",
    description: "Receive a Warehouse Receiving Order by ID",
  },
  perform: async (context, { connectionInput, version, receivingId }) => {
    const client = createClient(
      connectionInput,
      version,
      context.debug.enabled,
    );
    const { data } = await client.get(`/receiving/${receivingId}`);
    return { data };
  },
  inputs: {
    connectionInput,
    version: { ...version, default: "2.0" },
    receivingId,
  },
  examplePayload: getWarehouseReceivingOrdersExamplePayload,
});
